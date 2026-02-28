<?php
/**
 * Health check for form backend - diagnose 500 errors
 * Access: https://djeihoon.ir/cv/php/health.php (or {BASE_PATH}php/health.php)
 */
header('Content-Type: application/json; charset=utf-8');
$autoload = __DIR__ . '/../vendor/autoload.php';
$vendorOk = file_exists($autoload);
$phpmailerOk = false;
$configOk = false;
if ($vendorOk) {
    @require_once $autoload;
    $phpmailerOk = class_exists('PHPMailer\PHPMailer\PHPMailer');
}
@include_once __DIR__ . '/config.php';
$configOk = defined('SMTP_HOST') && defined('SMTP_USER');

$out = [
    'ok' => $vendorOk && $phpmailerOk && $configOk,
    'php' => PHP_VERSION,
    'vendor' => $vendorOk,
    'phpmailer' => $phpmailerOk,
    'config' => $configOk,
    'smtp_host' => defined('SMTP_HOST') ? SMTP_HOST : null,
];
echo json_encode($out, JSON_PRETTY_PRINT);
