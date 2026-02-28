# چک‌لیست قبل از آپلود

این موارد را قبل از آپلود نهایی بررسی کنید:

## ✅ ضروری

- [ ] **profile.jpg** — فایل تصویر پروفایل (حداقل 400×400px، JPG/PNG) در `assets/profile.jpg` قرار گرفته است. بدون آن، حروف «DJ» نمایش داده می‌شود.
- [ ] **config.php** — از `php/config.example.php` کپی شده است
- [ ] **config.secret.php** — از `php/config.secret.example.php` کپی و رمز SMTP تنظیم شده است
- [ ] **composer install** — روی سرور یا قبل از آپلود اجرا شده (پوشه `vendor` موجود باشد)

## ✅ اختیاری

- [ ] **reCAPTCHA** — در صورت استفاده، `RECAPTCHA_SITE_KEY` در index.html و `RECAPTCHA_SECRET_KEY` در config.secret.php
- [ ] **مسیر سایت** — اگر در مسیری غیر از `/cv/` است، `RewriteBase` در .htaccess را تنظیم کنید

## ✅ بعد از آپلود

- [ ] باز کردن `https://djeihoon.ir/cv/php/health.php` و اطمینان از `"ok": true`
- [ ] باز کردن `https://djeihoon.ir/cv/lang/fa.json` — باید JSON معتبر برگردد (نه 404)
- [ ] باز کردن `https://djeihoon.ir/cv/print/index.html?lang=fa` — صفحه چاپ باید نمایش داده شود
- [ ] تست ارسال فرم تماس
- [ ] تست دکمه چاپ PDF و بررسی صفحه چاپ در هر سه زبان
- [ ] در زبان فارسی، اعداد باید به صورت ۰۱۲۳۴۵۶۷۸۹ نمایش داده شوند

## تست محلی

```bash
npx serve . -p 3000
# سپس: http://localhost:3000/ و http://localhost:3000/print/?lang=fa
```
