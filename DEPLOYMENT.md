# راهنمای استقرار — رزومه djeihoon.ir/cv

این پروژه برای استقرار روی **djeihoon.ir** در مسیر **/cv/** طراحی شده است.

---

## پیش‌نیازها

- **هاست/سرور** با PHP 7.4+ و پشتیبانی از MySQL (اختیاری)
- **Composer** برای نصب PHPMailer
- دسترسی به **SMTP** برای ارسال ایمیل (مثل mail.djeihoon.ir)

---

## مراحل استقرار

### ۱. آماده‌سازی محلی (قبل از آپلود)

```bash
# در پوشه پروژه اجرا کنید:
setup.bat        # ویندوز
# یا
./setup.sh       # لینوکس/مک (chmod +x setup.sh)
```

یا دستی:
```bash
# کپی فایل‌های تنظیمات
copy php\config.example.php php\config.php          # ویندوز
copy php\config.secret.example.php php\config.secret.php

# ویرایش config.secret.php و قرار دادن رمز SMTP
# define('SMTP_PASS_SECRET', 'رمز-واقعی-اینجا');

# نصب وابستگی‌ها
composer install
```

### ۲. آپلود به سرور

- کل پوشه پروژه را در مسیری آپلود کنید که به **djeihoon.ir/cv/** نگاشت شود.
- مثال cPanel: محتویات پوشه `resume` را در `public_html/cv/` آپلود کنید.
- **توجه:** اگر از Git استفاده می‌کنید، فایل‌های `config.php` و `config.secret.php` در مخزن نیستند — پس از `git pull` حتماً setup را روی سرور اجرا کنید یا این فایل‌ها را دستی بسازید.

### ۳. تنظیمات سرور

#### تصویر پروفایل (ضروری)

فایل `assets/profile.jpg` را در پوشه assets قرار دهید. بدون آن، حروف «DJ» به‌عنوان جایگزین نمایش داده می‌شود.

#### فایل‌های config (ضروری)

پس از آپلود، این فایل‌ها باید وجود داشته باشند:

| فایل | توضیح |
|------|-------|
| `php/config.php` | کپی از config.example.php |
| `php/config.secret.php` | کپی از config.secret.example.php با رمز SMTP |

⚠️ **این دو فایل در .gitignore هستند** — باید دستی ایجاد شوند یا از طریق setup.

#### Composer در سرور

در پوشه پروژه روی سرور اجرا کنید:

```bash
cd /path/to/cv
composer install --no-dev --optimize-autoloader
```

یا پوشه `vendor` را از محیط محلی آپلود کنید (اگر composer روی سرور نصب نیست).

### ۴. تنظیم .htaccess

فایل `.htaccess` شامل `RewriteBase /cv/` است. اگر مسیر سایت شما متفاوت است:

- سایت در **djeihoon.ir/cv/** → بدون تغییر
- سایت در **ریشه دامنه** (مثلاً subdomain) → خط `RewriteBase /cv/` را به `RewriteBase /` تغییر دهید یا حذف کنید.

### ۵. مجوزها

```bash
# پوشه‌ها و فایل‌ها معمولاً 755 و 644 کافی است
# در صورت نیاز به آپلود فایل از فرم: مجوز نوشتن برای پوشه‌ی مربوطه
```

---

## بررسی سلامت (Health Check)

بعد از استقرار، این آدرس را در مرورگر باز کنید:

```
https://djeihoon.ir/cv/php/health.php
```

خروجی JSON باید شبیه این باشد:

```json
{
  "ok": true,
  "php": "8.1.x",
  "vendor": true,
  "phpmailer": true,
  "config": true,
  "smtp_host": "mail.djeihoon.ir"
}
```

اگر `ok: false` بود، مقدار فیلدهای `vendor`، `phpmailer` و `config` را چک کنید.

---

## تنظیمات اختیاری

### reCAPTCHA v3

1. از [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin) کلید بگیرید.
2. در `index.html` مقدار `window.RECAPTCHA_SITE_KEY` را قرار دهید.
3. در `php/config.secret.php` اضافه کنید:

```php
define('RECAPTCHA_SECRET_KEY_SECRET', 'کلید-سری-اینجا');
```

### جایگزین PHP (Formspree / Formsubmit)

اگر نمی‌خواهید از PHP و SMTP استفاده کنید، در `index.html` یکی از این‌ها را تنظیم کنید:

```html
<script>window.FORMSPREE_ID = 'your-id';</script>
<!-- یا -->
<script>window.FORMSUBMIT_EMAIL = 'info@djeihoon.ir';</script>
```

در این حالت نیازی به config و composer نیست.

---

## ساختار URL

| مسیر | توضیح |
|------|-------|
| `djeihoon.ir/cv/` | صفحه اصلی |
| `djeihoon.ir/cv/?lang=en` | انگلیسی |
| `djeihoon.ir/cv/?lang=ar` | عربی |
| `djeihoon.ir/cv/print/` | صفحه چاپ (فارسی) |
| `djeihoon.ir/cv/print/?lang=en` | چاپ انگلیسی |
| `djeihoon.ir/cv/print/fa` | چاپ فارسی (URL فرندلی) |
| `djeihoon.ir/cv/print/en` | چاپ انگلیسی (URL فرندلی) |

---

## عیب‌یابی

| مشکل | راه‌حل |
|------|--------|
| 404 برای lang/*.json یا php/csrf.php | مسیر آپلود را چک کنید؛ پوشه‌های `lang/` و `php/` باید در کنار index.html باشند؛ اگر سایت در مسیر دیگری است، قبل از `</body>` در index.html اضافه کنید: `window.BASE_PATH = '/مسیر-شما/';` |
| صفحه چاپ 404 | پوشه `print/` و فایل `print/index.html` را آپلود کنید؛ مطمئن شوید RewriteBase در .htaccess با مسیر سایت همخوان است |
| فرم ارسال نمی‌شود | health.php را چک کنید؛ composer install؛ config.secret.php |
| خطای 403 / CORS | مجوز Origin در submit.php؛ هاست باید PHP و درخواست‌های POST را پشتیبانی کند |
| خطای 500 | لاگ PHP را ببینید؛ health.php؛ تنظیمات SMTP |
| چاپ باز نمی‌شود | mod_rewrite را در Apache فعال کنید |
| اعداد به انگلیسی | در زبان فارسی باید ۰–۹ نمایش داده شوند؛ اگر نه، cache مرورگر را پاک کنید |
