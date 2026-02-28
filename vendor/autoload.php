<?php
/**
 * Manual autoload for PHPMailer (when Composer is not available)
 */
$base = __DIR__ . '/phpmailer/phpmailer/';
require_once $base . 'Exception.php';
require_once $base . 'PHPMailer.php';
require_once $base . 'SMTP.php';
