# رزومه داود جیحون | djeihoon.ir/cv

وب‌سایت رزومه حرفه‌ای با فرم تماس، صفحه چاپ PDF و پشتیبانی چندزبانه (فارسی، انگلیسی، عربی).

## راه‌اندازی سریع

```bash
# ویندوز
setup.bat

# لینوکس/مک
chmod +x setup.sh && ./setup.sh
```

پس از اجرا:
1. `php/config.secret.php` را ویرایش کنید و رمز SMTP را قرار دهید.
2. پروژه را در **djeihoon.ir/cv/** آپلود کنید.
3. در سرور `composer install` اجرا کنید.

## راهنمای استقرار کامل

→ **[DEPLOYMENT.md](DEPLOYMENT.md)**

## نیازمندی‌ها

- PHP 7.4+
- Composer
- دسترسی SMTP برای ارسال ایمیل
