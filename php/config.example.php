<?php
/**
 * SMTP configuration — copy to config.php after upload
 * 1. Copy this file to config.php:  cp config.example.php config.php
 * 2. Copy config.secret.example.php to config.secret.php
 * 3. Edit config.secret.php and set SMTP_PASS_SECRET
 * Or use environment variables (recommended on server)
 */
if (file_exists(__DIR__ . '/config.secret.php')) {
    require_once __DIR__ . '/config.secret.php';
}

define('SMTP_HOST', getenv('SMTP_HOST') ?: 'mail.djeihoon.ir');
define('SMTP_PORT', (int)(getenv('SMTP_PORT') ?: 587));
define('SMTP_USER', getenv('SMTP_USER') ?: 'info@djeihoon.ir');
define('SMTP_PASS', getenv('SMTP_PASS') ?: (defined('SMTP_PASS_SECRET') ? SMTP_PASS_SECRET : ''));
define('SMTP_SECURE', getenv('SMTP_SECURE') ?: 'tls');

define('MAIL_TO', getenv('MAIL_TO') ?: 'info@djeihoon.ir');

// Optional: reCAPTCHA v3 secret (when RECAPTCHA_SITE_KEY is set in index.html)
if (getenv('RECAPTCHA_SECRET_KEY')) {
    define('RECAPTCHA_SECRET_KEY', getenv('RECAPTCHA_SECRET_KEY'));
} elseif (defined('RECAPTCHA_SECRET_KEY_SECRET') && RECAPTCHA_SECRET_KEY_SECRET !== '') {
    define('RECAPTCHA_SECRET_KEY', RECAPTCHA_SECRET_KEY_SECRET);
} elseif (defined('RECAPTCHA_SECRET_KEY_SECRET') && RECAPTCHA_SECRET_KEY_SECRET !== '') {
    define('RECAPTCHA_SECRET_KEY', RECAPTCHA_SECRET_KEY_SECRET);
}
