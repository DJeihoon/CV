<?php
/**
 * CSRF Token Generator
 * Returns a session-based token for form validation
 */
session_start();
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

$allowed_hosts = ['djeihoon.ir', 'www.djeihoon.ir', 'localhost', '127.0.0.1'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$parsed = $origin ? parse_url($origin) : [];
$host = $parsed['host'] ?? '';
if (in_array($host, $allowed_hosts)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}
header('Access-Control-Allow-Credentials: true');

if (empty($_SESSION['csrf_token']) || !isset($_SESSION['csrf_time']) || (time() - $_SESSION['csrf_time']) > 3600) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    $_SESSION['csrf_time'] = time();
}

echo json_encode(['token' => $_SESSION['csrf_token']]);
