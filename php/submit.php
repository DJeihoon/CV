<?php
/**
 * Contact Form Submit Handler
 * Sends form data to info@djeihoon.ir via PHPMailer
 * File: php/submit.php
 */
error_reporting(0);
ini_set('display_errors', 0);
ob_start();

function jsonExit($ok, $msg, $code = 200) {
    if (ob_get_length()) ob_clean();
    if ($code >= 400) http_response_code($code);
    if (!headers_sent()) {
        header('Content-Type: application/json; charset=utf-8');
        header('X-Content-Type-Options: nosniff');
    }
    echo json_encode(['success' => $ok, 'message' => $msg]);
    exit;
}

@include_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

$allowed_origins = ['https://djeihoon.ir', 'https://www.djeihoon.ir', 'http://localhost', 'http://127.0.0.1'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$parsed = $origin ? parse_url($origin) : [];
$host = $parsed['host'] ?? '';
$origin_ok = in_array($origin, $allowed_origins)
    || in_array($host, ['localhost', '127.0.0.1'])
    || preg_match('/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/', $origin);
if ($origin_ok && $origin) {
    header('Access-Control-Allow-Origin: ' . $origin);
}
header('Access-Control-Allow-Credentials: true');

// ─── RATE LIMITING (session-based) ───
if (session_status() === PHP_SESSION_NONE) {
    @session_start();
}
$now = time();
$limit = 30; // seconds between submissions
if (isset($_SESSION['last_submit']) && ($now - $_SESSION['last_submit']) < $limit) {
    jsonExit(false, 'Rate limit exceeded. Please wait.', 429);
}

// ─── CSRF check ───
$csrf_token = trim($_POST['csrf_token'] ?? '');
if (empty($csrf_token) || empty($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $csrf_token)) {
    jsonExit(false, 'Invalid request. Please refresh and try again.', 403);
}

// ─── reCAPTCHA v3 (invisible) ───
if (defined('RECAPTCHA_SECRET_KEY') && RECAPTCHA_SECRET_KEY !== '') {
    $recaptcha_token = trim($_POST['recaptcha_token'] ?? '');
    if (empty($recaptcha_token)) {
        jsonExit(false, 'Security check failed. Please refresh.', 403);
    }
    $verify = @file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, stream_context_create([
        'http' => ['method' => 'POST', 'header' => 'Content-Type: application/x-www-form-urlencoded', 'content' => http_build_query(['secret' => RECAPTCHA_SECRET_KEY, 'response' => $recaptcha_token, 'remoteip' => $_SERVER['REMOTE_ADDR'] ?? ''])]
    ]));
    $v = $verify ? @json_decode($verify, true) : [];
    if (empty($v['success']) || ($v['score'] ?? 0) < 0.3) {
        jsonExit(false, 'Security check failed. Please try again.', 403);
    }
}

// ─── Origin check (strict) ───
$origin2 = $_SERVER['HTTP_ORIGIN'] ?? $_SERVER['HTTP_REFERER'] ?? '';
$parsed2 = $origin2 ? parse_url($origin2) : [];
$host2 = $parsed2['host'] ?? '';
$ok = $origin_ok || in_array($host2, ['localhost', '127.0.0.1']) || preg_match('/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/', $origin2);
if (!$ok && empty($origin2)) $ok = true;
if (!$ok) {
    jsonExit(false, 'Forbidden', 403);
}

// ─── METHOD CHECK ───
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonExit(false, 'Method not allowed', 405);
}

// ─── SANITIZE INPUT ───
function clean($v) { return htmlspecialchars(trim($v ?? ''), ENT_QUOTES, 'UTF-8'); }

$lang          = clean($_POST['lang'] ?? 'fa');
$request_type  = clean($_POST['request_type'] ?? '');
$name          = clean($_POST['name'] ?? '');
$organization  = clean($_POST['organization'] ?? '');
$email         = clean($_POST['email'] ?? '');
$phone         = clean($_POST['phone'] ?? '');
$subject       = clean($_POST['subject'] ?? '');
$message       = clean($_POST['message'] ?? '');
$project_dates = clean($_POST['project_dates'] ?? '');
$budget_amount = clean($_POST['budget_amount'] ?? '');
$budget_currency = clean($_POST['budget_currency'] ?? '');

// ─── VALIDATION ───
$errors = [];
if (strlen($name) < 2) $errors[] = 'Invalid name';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Invalid email';
$phone_clean = preg_replace('/\D/', '', $phone);
if ($phone !== '' && !preg_match('/^[0-9]{8,15}$/', $phone_clean)) $errors[] = 'Invalid phone (8-15 digits)';
if (strlen($subject) < 2) $errors[] = 'Invalid subject';
if (strlen($message) < 10) $errors[] = 'Message too short';

$budget_amount_num = (float) $budget_amount;
if ($budget_amount_num > 0 && $budget_currency !== '') {
    if ($budget_currency === 'USD' && ($budget_amount_num < 20 || $budget_amount_num > 1000000)) $errors[] = 'USD: min 20, max 1,000,000';
    if ($budget_currency === 'IRT' && ($budget_amount_num < 1000000 || $budget_amount_num > 20000000000)) $errors[] = 'Tomans: min 1,000,000, max 20,000,000,000';
}

if (!empty($errors)) {
    jsonExit(false, implode(', ', $errors), 422);
}

// ─── LABEL MAP ───
$type_labels = [
    'fa' => ['job' => 'پیشنهاد شغلی', 'consulting' => 'مشاوره تخصصی', 'partnership' => 'مشارکت / سرمایه‌گذاری'],
    'en' => ['job' => 'Job Offer', 'consulting' => 'Expert Consulting', 'partnership' => 'Partnership / Investment'],
    'ar' => ['job' => 'عرض وظيفة', 'consulting' => 'استشارة متخصصة', 'partnership' => 'شراكة / استثمار'],
];
$type_label = $type_labels[$lang][$request_type] ?? $request_type;

// ─── ATTACHMENT NAMES ───
$attachment_names = [];
if (!empty($_FILES['attachments']['name'])) {
    $fnames = $_FILES['attachments']['name'];
    $ferrs = $_FILES['attachments']['error'];
    $fsizes = $_FILES['attachments']['size'] ?? [];
    if (!is_array($fnames)) { $fnames = [$fnames]; $ferrs = [$ferrs]; $fsizes = [$fsizes]; }
    foreach ($fnames as $i => $n) {
        if (($ferrs[$i] ?? 0) === 0) {
            $ext = strtolower(pathinfo($n, PATHINFO_EXTENSION));
            if (in_array($ext, ['pdf','doc','docx','xls','xlsx','zip']) && ($fsizes[$i] ?? 0) <= 10485760) {
                $attachment_names[] = htmlspecialchars(basename($n), ENT_QUOTES, 'UTF-8');
            }
        }
    }
}

// ─── BUILD EMAIL BODY (Professional template) ───
$to = defined('MAIL_TO') ? MAIL_TO : 'info@djeihoon.ir';
$email_subject = "[$type_label] $subject — djeihoon.ir";
$date_fa = date('Y/m/d H:i');
$date_label = $lang === 'fa' ? 'تاریخ دریافت' : ($lang === 'ar' ? 'تاريخ الاستلام' : 'Received');

$email_dir = $lang === 'en' ? 'ltr' : 'rtl';
$body = "
<!DOCTYPE html>
<html dir=\"$email_dir\" lang=\"$lang\">
<head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><style>
  *{box-sizing:border-box}
  body{font-family:Tahoma,Arial,sans-serif;direction:rtl;background:#eef0f2;margin:0;padding:24px;font-size:14px;line-height:1.6;color:#222}
  .email-wrap{max-width:620px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,.08)}
  .email-header{background:linear-gradient(135deg,#0b1623 0%,#152535 100%);color:#fff;padding:24px 28px;border-bottom:4px solid #b8963e}
  .email-header h1{margin:0;font-size:18px;font-weight:600}
  .email-header .meta{font-size:12px;opacity:.9;margin-top:8px}
  .email-body{padding:28px}
  .section-title{font-size:13px;font-weight:600;color:#b8963e;margin:0 0 12px 0;padding-bottom:6px;border-bottom:1px solid rgba(184,150,62,.25)}
  .field-row{display:flex;padding:10px 0;border-bottom:1px solid #eee;font-size:14px}
  .field-row:last-child{border-bottom:none}
  .field-lbl{color:#666;min-width:140px;flex-shrink:0}
  .field-val{color:#222;font-weight:500;direction:ltr;text-align:right}
  .field-val.rtl{direction:rtl;text-align:right}
  .box{background:#f8f9fa;border-radius:8px;padding:16px;margin:16px 0;border-right:3px solid #b8963e}
  .box.msg{background:#fdfcf9;line-height:1.8;white-space:pre-wrap;word-wrap:break-word}
  .attachments{background:#fff8e8;border:1px solid rgba(184,150,62,.35);border-radius:8px;padding:14px;margin-top:16px}
  .attachments-list{margin:8px 0 0 0;padding-left:20px}
  .attachments-list li{margin:4px 0;direction:ltr;text-align:left}
  .badge{display:inline-block;background:rgba(184,150,62,.15);color:#8b6914;border:1px solid rgba(184,150,62,.4);border-radius:6px;padding:4px 12px;font-size:12px;font-weight:500}
  .email-footer{background:#f5f5f5;padding:14px 28px;font-size:11px;color:#888;text-align:center}
</style></head>
<body>
<div class=\"email-wrap\">
  <div class=\"email-header\">
    <h1>📬 درخواست جدید از فرم تماس djeihoon.ir</h1>
    <div class=\"meta\">$date_label: $date_fa &nbsp;|&nbsp; زبان: $lang</div>
  </div>
  <div class=\"email-body\">
    <h3 class=\"section-title\">اطلاعات تماس</h3>
    <table style=\"width:100%;border-collapse:collapse\">
      <tr><td style=\"padding:8px 0;color:#666;width:140px\">نوع درخواست</td><td style=\"padding:8px 0\"><span class=\"badge\">$type_label</span></td></tr>
      <tr><td style=\"padding:8px 0;color:#666\">نام و نام خانوادگی</td><td style=\"padding:8px 0;font-weight:500\">$name</td></tr>
      " . ($organization ? "<tr><td style=\"padding:8px 0;color:#666\">سازمان / شرکت</td><td style=\"padding:8px 0;font-weight:500\">$organization</td></tr>" : '') . "
      <tr><td style=\"padding:8px 0;color:#666\">ایمیل</td><td style=\"padding:8px 0;font-weight:500;direction:ltr;text-align:right\">$email</td></tr>
      " . ($phone ? "<tr><td style=\"padding:8px 0;color:#666\">شماره تماس</td><td style=\"padding:8px 0;font-weight:500;direction:ltr;text-align:right\">$phone</td></tr>" : '') . "
    </table>

    <h3 class=\"section-title\">جزئیات درخواست</h3>
    <table style=\"width:100%;border-collapse:collapse\">
      <tr><td style=\"padding:8px 0;color:#666;width:140px\">موضوع</td><td style=\"padding:8px 0;font-weight:500\">$subject</td></tr>
      " . ($project_dates ? "<tr><td style=\"padding:8px 0;color:#666\">بازه زمانی پروژه</td><td style=\"padding:8px 0;font-weight:500;direction:ltr;text-align:right\">$project_dates</td></tr>" : '') . "
      " . ($budget_amount && $budget_currency ? "<tr><td style=\"padding:8px 0;color:#666\">بودجه پیشنهادی</td><td style=\"padding:8px 0;font-weight:500;direction:ltr;text-align:right\">" . number_format((float)$budget_amount) . " $budget_currency</td></tr>" : '') . "
    </table>

    <h3 class=\"section-title\">شرح پیام</h3>
    <div class=\"box msg\">" . nl2br($message) . "</div>

    " . (!empty($attachment_names) ? "
    <h3 class=\"section-title\">📎 فایل‌های پیوست</h3>
    <div class=\"attachments\">
      <strong>تعداد " . count($attachment_names) . " فایل ضمیمه شده:</strong>
      <ul class=\"attachments-list\">" . implode('', array_map(function($f){ return "<li>" . $f . "</li>"; }, $attachment_names)) . "</ul>
    </div>
    " : '') . "
  </div>
  <div class=\"email-footer\">ارسال‌شده از فرم تماس djeihoon.ir</div>
</div>
</body></html>
";

// ─── TRY PHPMAILER, FALLBACK TO MAIL() ───
$sent = false;
$lastErr = '';

// Check if PHPMailer exists (run: composer install)
$autoload = __DIR__ . '/../vendor/autoload.php';
if (file_exists($autoload)) {
    @require_once $autoload;
}
if (class_exists('PHPMailer\PHPMailer\PHPMailer')) {
    try {
        $mail = new PHPMailer\PHPMailer\PHPMailer(true);
        $mail->isSMTP();
        $mail->Host       = defined('SMTP_HOST') ? SMTP_HOST : 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = defined('SMTP_USER') ? SMTP_USER : $to;
        $mail->Password   = defined('SMTP_PASS') ? SMTP_PASS : '';
        $mail->SMTPSecure = defined('SMTP_SECURE') ? SMTP_SECURE : 'tls';
        $mail->Port       = defined('SMTP_PORT') ? SMTP_PORT : 587;
        $mail->CharSet    = 'UTF-8';
        $mail->SMTPOptions = ['ssl' => ['verify_peer' => false, 'verify_peer_name' => false]];
        $mail->setFrom($to, 'djeihoon.ir Contact Form');
        $mail->addAddress($to, 'Davood Jeihoon');
        $mail->addReplyTo($email, $name);
        $mail->isHTML(true);
        $mail->Subject = $email_subject;
        $mail->Body    = $body;
        $mail->AltBody = strip_tags($message);

        // Attachments
        if (!empty($_FILES['attachments']['name'])) {
            $names = $_FILES['attachments']['name'];
            $tmpNames = $_FILES['attachments']['tmp_name'];
            $errors = $_FILES['attachments']['error'];
            $sizes = $_FILES['attachments']['size'] ?? [];
            if (!is_array($names)) { $names = [$names]; $tmpNames = [$tmpNames]; $errors = [$errors]; $sizes = [$sizes]; }
            foreach ($tmpNames as $i => $tmp) {
                if (!empty($tmp) && is_uploaded_file($tmp) && ($errors[$i] ?? 0) === 0) {
                    $orig = basename($names[$i] ?? '');
                    $ext = strtolower(pathinfo($orig, PATHINFO_EXTENSION));
                    $allowed_ext = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'zip'];
                    if (in_array($ext, $allowed_ext) && ($sizes[$i] ?? 0) <= 10485760) {
                        $mail->addAttachment($tmp, $orig);
                    }
                }
            }
        }

        $mail->send();
        $sent = true;
    } catch (Throwable $e) {
        $smtpErr = $e->getMessage();
        error_log('PHPMailer: ' . $smtpErr);
        if (strpos($smtpErr, 'SMTP connect() failed') !== false) {
            $lastErr = 'SMTP connection failed. Check host, port, firewall, or TLS.';
        } elseif (strpos($smtpErr, 'authenticate') !== false || strpos($smtpErr, 'Authentication') !== false || strpos($smtpErr, '535') !== false) {
            $lastErr = 'SMTP authentication failed. Check username/password in config.php.';
        } elseif (strpos($smtpErr, 'Could not connect') !== false) {
            $lastErr = 'Could not connect to SMTP server. Verify SMTP_HOST and SMTP_PORT.';
        } elseif (strpos($smtpErr, 'SSL') !== false || strpos($smtpErr, 'certificate') !== false) {
            $lastErr = 'SMTP SSL/TLS error. Try SMTP_SECURE=tls or ssl.';
        } else {
            $lastErr = 'SMTP: ' . preg_replace('/[^\p{L}\p{N}\s\.\,\:\-\_]/u', '', substr($smtpErr, 0, 120));
        }
    }
}

// Fallback: PHP mail()
if (!$sent) {
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "From: djeihoon.ir <noreply@djeihoon.ir>\r\n";
    $sent = mail($to, $email_subject, $body, $headers);
}

if ($sent) {
    $_SESSION['last_submit'] = $now;
    jsonExit(true, 'Sent successfully');
}
$phpmailerExists = class_exists('PHPMailer\PHPMailer\PHPMailer', false);
$errHint = !$phpmailerExists ? ' Run: composer install. See php/health.php' : (isset($lastErr) ? ' ' . $lastErr : ' SMTP failed. Check php/config.php');
jsonExit(false, 'Failed to send email.' . $errHint, 500);
