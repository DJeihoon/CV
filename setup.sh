#!/bin/bash
# راه‌اندازی رزومه djeihoon.ir/cv

cd "$(dirname "$0")"

echo "========================================"
echo "  راه‌اندازی رزومه djeihoon.ir/cv"
echo "========================================"
echo

if [ ! -f "php/config.php" ]; then
    echo "ایجاد php/config.php از config.example.php..."
    cp php/config.example.php php/config.php
    echo "✓ config.php ایجاد شد"
else
    echo "php/config.php وجود دارد — بدون تغییر"
fi

if [ ! -f "php/config.secret.php" ]; then
    echo "ایجاد php/config.secret.php از config.secret.example.php..."
    cp php/config.secret.example.php php/config.secret.php
    echo "✓ config.secret.php ایجاد شد"
    echo
    echo "⚠ مهم: php/config.secret.php را ویرایش کنید و رمز SMTP را قرار دهید."
else
    echo "php/config.secret.php وجود دارد — بدون تغییر"
fi

echo
echo "نصب PHPMailer با Composer..."
if [ -f "composer.json" ]; then
    composer install
    if [ $? -eq 0 ]; then
        echo
        echo "✓ همه‌چیز آماده است."
        echo
        echo "مراحل باقی‌مانده:"
        echo "  1. php/config.secret.php را ویرایش کنید و SMTP_PASS_SECRET را تنظیم کنید"
        echo "  2. پروژه را در djeihoon.ir/cv/ آپلود کنید"
        echo "  3. در سرور هم composer install اجرا کنید (یا vendor را آپلود کنید)"
    else
        echo
        echo "خطا: Composer نصب نشد. از https://getcomposer.org دانلود کنید."
        exit 1
    fi
else
    echo "composer.json یافت نشد."
    exit 1
fi
echo
