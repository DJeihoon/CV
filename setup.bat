@echo off
chcp 65001 >nul
echo ========================================
echo   راه‌اندازی رزومه djeihoon.ir/cv
echo ========================================
echo.

cd /d "%~dp0"

if not exist "php\config.php" (
    echo ایجاد php\config.php از config.example.php...
    copy "php\config.example.php" "php\config.php"
    echo ✓ config.php ایجاد شد
) else (
    echo php\config.php وجود دارد — بدون تغییر
)

if not exist "php\config.secret.php" (
    echo ایجاد php\config.secret.php از config.secret.example.php...
    copy "php\config.secret.example.php" "php\config.secret.php"
    echo ✓ config.secret.php ایجاد شد
    echo.
    echo ⚠ مهم: php\config.secret.php را ویرایش کنید و رمز SMTP را قرار دهید.
) else (
    echo php\config.secret.php وجود دارد — بدون تغییر
)

echo.
echo نصب PHPMailer با Composer...
if exist "composer.json" (
    composer install
    if %ERRORLEVEL% equ 0 (
        echo.
        echo ✓ همه‌چیز آماده است.
        echo.
        echo مراحل باقی‌مانده:
        echo   1. php\config.secret.php را ویرایش کنید و SMTP_PASS_SECRET را تنظیم کنید
        echo   2. پروژه را در djeihoon.ir/cv/ آپلود کنید
        echo   3. در سرور هم composer install اجرا کنید (یا vendor را آپلود کنید)
    ) else (
        echo.
        echo خطا: Composer نصب نشد. از https://getcomposer.org دانلود کنید.
        exit /b 1
    )
) else (
    echo composer.json یافت نشد.
    exit /b 1
)
echo.
pause
