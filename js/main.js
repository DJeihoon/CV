/* ================================================================
   RESUME WEBSITE — MAIN JAVASCRIPT
   i18n + Nav + Reveal + Skills + Form + Flatpickr
================================================================ */

/* ─── TRANSLATIONS (fallback when lang/*.json unavailable) ─── */
const TRANSLATIONS_FALLBACK = {
  fa: {
    meta: { title: "داود جیحون | کارشناس فناوری اطلاعات و فرآیندهای سازمانی", description: "رزومه حرفه‌ای داود جیحون — کارشناس فناوری اطلاعات و فرآیندهای سازمانی. مشهد، ایران." },
    nav: { experience: "سوابق", skills: "مهارت‌ها", projects: "پروژه‌ها", education: "تحصیلات", contact: "تماس" },
    hero: { tag: "رزومه حرفه‌ای", name: "داود<br><em>جیحون</em>", role: "کارشناس فناوری اطلاعات و فرآیندهای سازمانی", bio: "دارای تجربه گسترده در طراحی، توسعه و پشتیبانی سامانه‌ها و وب‌سایت‌های سازمانی هستم، با مهارت در مدیریت سیستم‌های CMS، بهینه‌سازی عملکرد و امنیت وب، اتصال درگاه‌های پرداخت و مستندسازی فرآیندها.<br><br>سابقه عملی من شامل توسعه و پشتیبانی وب‌سایت‌ها و فروشگاه‌های اینترنتی، مدیریت داخلی سازمان، منابع انسانی و امور مالی پرسنل مانند تنخواه‌گردانی، مغایرت‌گیری و محاسبه حقوق و دستمزد است.<br><br>دقیق، مسئول و نتیجه‌گرا هستم و قادر به همکاری موثر با تیم‌های فنی و اجرایی برای پیاده‌سازی راهکارهای جامع و کارآمد سازمانی می‌باشم.", printBtn: "دانلود / چاپ PDF", contactBtn: "تماس با من" },
    profile: { name: "داود جیحون", role: "کارشناس فناوری اطلاعات و فرآیندهای سازمانی", location: "موقعیت", locationVal: "مشهد، ایران", birth: "سال تولد", birthVal: "۱۳۶۹", military: "نظام وظیفه", militaryVal: "پایان خدمت", exp: "سابقه", expVal: "+۱۸ سال", spec: "تخصص", fullLocation: "خراسان رضوی — مشهد مقدس" },
    exp: {
      title: "سوابق کاری", sub: "تجربه حرفه‌ای و مسیر شغلی",
      job1: { role: "تضمین کیفیت، پشتیبان IT | مدیر داخلی و منابع انسانی", date: "اسفند ۱۳۸۵ — تاکنون", company: "شرکت‌های صنعتی و خدماتی", items: ["مشارکت در استقرار و نگهداری استانداردهای ISO 9001 و ISO 45001","مستندسازی فرآیندهای سازمانی و تدوین آیین‌نامه‌های داخلی","طراحی ساختار منابع انسانی شامل فرآیند جذب، ارزیابی عملکرد و مستندسازی سوابق پرسنلی","راه‌اندازی و توسعه اتوماسیون‌های داخلی به منظور کاهش خطای انسانی","پشتیبانی و نگهداری زیرساخت‌های IT سازمان","تعامل با سامانه‌های بیمه، مالیات و سایر سامانه‌های دولتی","تنظیم و مدیریت قراردادهای پرسنلی و پیمانکاری","مدیریت تنخواه، مغایرت‌گیری مالی و محاسبه حقوق و دستمزد مطابق قوانین جاری"] },
      job2: { role: "طراح و توسعه‌دهنده وب | مدیر عملیات و مشاور فنی", date: "تیر ۱۳۸۵ — مهر ۱۴۰۳", company: "پروژه‌های فریلنسری و استارتاپی", items: ["طراحی و توسعه وب‌سایت‌های شرکتی، فروشگاهی، آموزشی و خدماتی (استاتیک و داینامیک)","پیاده‌سازی سامانه‌های اختصاصی شامل پیام‌رسان خودکار، سامانه آزمون آنلاین و ماژول‌های سفارشی","بهینه‌سازی امنیت، سرعت و عملکرد وب‌سایت‌ها","اتصال درگاه‌های پرداخت داخلی و بین‌المللی","مشاوره فنی در انتخاب زیرساخت‌ها، سرور، هاست، دامنه، پایگاه داده و معماری سامانه","همکاری در توسعه سامانه HIS پزشکی","تحلیل و طراحی سامانه‌های HRM و CMMS","پشتیبانی فنی و بهبود تجربه کاربری بر اساس بازخورد کاربران"] }
    },
    skills: {
      title: "مهارت‌ها", sub: "دانش فنی و تخصص‌های کاربردی",
      levels: { advanced: "پیشرفته", intermediate: "متوسط", basic: "پایه" },
      cats: { web: "توسعه وب و نرم‌افزار", infra: "زیرساخت و امنیت", org: "مدیریت و سازمان" },
      legend: { adv: "پیشرفته", mid: "متوسط", bas: "پایه" },
      items: [
        { name: "طراحی و توسعه وب (استاتیک و داینامیک)", level: "advanced", cat: "web" },
        { name: "مدیریت سیستم‌های CMS و WHMCS", level: "advanced", cat: "web" },
        { name: "توسعه ماژول‌های سفارشی و زبان‌های برنامه‌نویسی", level: "advanced", cat: "web" },
        { name: "توسعه سرویس‌های پیامکی و سامانه‌های اختصاصی", level: "advanced", cat: "web" },
        { name: "مدیریت پایگاه داده، سرور و هاست", level: "advanced", cat: "infra" },
        { name: "بهینه‌سازی وب، امنیت و عملکرد", level: "advanced", cat: "infra" },
        { name: "اتصال API و درگاه‌های پرداخت", level: "advanced", cat: "infra" },
        { name: "کار با سامانه‌های دولتی و سازمانی", level: "advanced", cat: "org" },
        { name: "تولید محتوا و تحلیل داده", level: "advanced", cat: "org" },
        { name: "نرم‌افزارهای عمومی، کاربردی و اداری", level: "advanced", cat: "org" },
        { name: "تنظیم قراردادهای پیمانکاری و پرسنلی", level: "intermediate", cat: "org" },
        { name: "مدیریت تنخواه، مغایرت‌گیری مالی و محاسبه حقوق و دستمزد پرسنل", level: "intermediate", cat: "org" },
        { name: "مستندسازی فرآیندها و الزامات ISO", level: "basic", cat: "org" }
      ]
    },
    projects: {
      title: "پروژه‌های برجسته", sub: "نمونه‌کارها و دستاوردهای کلیدی", viewPortfolio: "مشاهده نمونه‌کارها ←",
      items: [
        { icon: "web", title: "طراحی و پیاده‌سازی وب‌سایت‌ها و سامانه‌های آنلاین", items: ["وب‌سایت‌های استاتیک و داینامیک با رابط کاربری واکنش‌گرا (Responsive / Mobile-Friendly)","وب‌سایت‌های فروشگاهی، شرکتی، آموزشی و خدماتی","بهینه‌سازی سرعت، سئو، عملکرد وب و اتصال درگاه‌های پرداخت","مشاوره دیجیتال مارکتینگ و زیرساخت سازمانی","توسعه سامانه‌های اختصاصی (پیام‌رسان خودکار و سامانه آزمون آنلاین)"], link: "https://djeihoon.ir" },
        { icon: "hospital", title: "همکاری در توسعه سامانه HIS پزشکی", items: ["طراحی و پیاده‌سازی ماژول مدیریت پرونده‌های پزشکی","بهبود سرعت پردازش داده‌ها و دقت سیستم","هماهنگی با تیم فنی و کاربران نهایی"] },
        { icon: "people", title: "تحلیل و طراحی سامانه HRM", items: ["ساختاردهی اطلاعات پرسنلی","ماژول محاسبه حقوق و مزایا","انطباق با فرآیندهای بیمه و مالیات","تعریف سطوح دسترسی و کنترل داخلی"] },
        { icon: "wrench", title: "تحلیل و طراحی سامانه CMMS", items: ["ثبت تجهیزات و شناسنامه فنی","ثبت خرابی‌ها و سوابق تعمیرات","تعریف شاخص‌های عملکردی و گزارش‌های مدیریتی"] }
      ]
    },
    education: { title: "تحصیلات و گواهینامه‌ها", sub: "مدارک علمی و تخصصی", degree: "کارشناسی مهندسی تکنولوژی نرم‌افزار", uni: "دانشگاه آزاد اسلامی", date: "مهر ۱۳۹۳ — بهمن ۱۳۹۵" },
    languages: { title: "زبان‌های خارجی", items: [{ name: "فارسی", level: "مادری", flag: "ir", pct: 100 },{ name: "عربی", level: "پیشرفته", flag: "ae", pct: 80 },{ name: "انگلیسی", level: "متوسط", flag: "us", pct: 60 }] },
    certs: { title: "دوره‌ها و گواهینامه‌ها", items: [{ name: "IMS — Integrated Management System", sub: "پروژه محور" },{ name: "MCSE — Microsoft Certified Systems Engineer", sub: "پروژه محور" },{ name: "Security+ — CompTIA Security", sub: "پروژه محور" },{ name: "RT — Industrial Radiography", sub: "گواهینامه صنعتی" }] },
    contact: { title: "ارتباط با من", sub: "ثبت درخواست حرفه‌ای", infoTitle: "همکاری حرفه‌ای", infoDesc: "برای پیشنهاد همکاری، مشاوره تخصصی یا ارسال پروپوزال پروژه، فرم را تکمیل نمایید. در اسرع وقت پاسخگو خواهم بود." },
    form: { reqType: "نوع درخواست", rt1: "پیشنهاد شغلی", rt2: "مشاوره تخصصی", rt3: "مشارکت / سرمایه‌گذاری", personalInfo: "اطلاعات فردی", name: "نام و نام خانوادگی", nameHolder: "نام کامل را وارد کنید", org: "سازمان / شرکت", orgHolder: "نام سازمان یا شرکت", email: "ایمیل", emailHolder: "example@domain.com", phone: "شماره تماس", phoneHolder: "9123456789", projectDetails: "جزئیات درخواست", subject: "موضوع", subjectHolder: "موضوع درخواست را وارد کنید", message: "شرح درخواست", messageHolder: "توضیحات کامل درخواست خود را اینجا بنویسید...", dates: "بازه زمانی پروژه (اختیاری)", datesHolder: "انتخاب بازه زمانی", duration: "مدت زمان اجرا:", budgetTitle: "بودجه پیشنهادی", budgetAmount: "مبلغ", budgetAmountHolder: "مقدار بودجه", currency: "واحد پول", currencySelect: "— انتخاب —", attachTitle: "فایل پیوست", attachHint: "فایل را اینجا بکشید یا کلیک کنید", attachFormats: "PDF، Word، Excel، ZIP — حداکثر 10MB", reset: "پاک کردن فرم", resetConfirmTitle: "پاک کردن فرم؟", resetConfirmText: "همه اطلاعات واردشده حذف خواهند شد.", cancel: "انصراف", send: "ارسال درخواست", sending: "در حال ارسال...", required: "الزامی", fileTypeErr: "نوع فایل مجاز نیست.", fileSizeErr: "حجم هر فایل حداکثر ۱۰ مگابایت." },
    errors: { name: "نام الزامی است", nameMin: "حداقل ۲ حرف وارد نمایید", email: "ایمیل معتبر وارد نمایید", phoneInvalid: "۸ تا ۱۵ رقم وارد کنید", subject: "موضوع الزامی است", message: "شرح درخواست الزامی است", messageMin: "حداقل ۱۰ کاراکتر وارد نمایید", budgetUsdMin: "حداقل ۲۰ دلار", budgetUsdMax: "حداکثر ۱٬۰۰۰٬۰۰۰ دلار", budgetIrtMin: "حداقل ۱٬۰۰۰٬۰۰۰ تومان", budgetIrtMax: "حداکثر ۲۰٬۰۰۰٬۰۰۰٬۰۰۰ تومان" },
    alerts: { successTitle: "درخواست ارسال شد ✓", successText: "متشکرم. پیام شما دریافت شد و در اسرع وقت با شما تماس خواهم گرفت.", errorTitle: "خطا در ارسال", errorText: "متأسفانه ارسال ناموفق بود. لطفاً مستقیماً با ایمیل تماس بگیرید.", networkErr: "اتصال برقرار نشد. اینترنت و آدرس سرور را بررسی کنید.", retry: "تلاش مجدد", rateLimit: "لطفاً چند لحظه صبر کنید.", ok: "متوجه شدم" },
    footer: { copy: "داود جیحون — کارشناس فناوری اطلاعات و فرآیندهای سازمانی | مشهد، ایران" },
    a11y: { skipLink: "پرش به محتوا" },
    duration: { day: "روز", days: "روز", month: "ماه", months: "ماه", year: "سال", years: "سال", and: "و" }
  },
  en: {
    meta: { title: "Davood Jeihoon | Information Technology & Organizational Processes Expert", description: "Professional resume of Davood Jeihoon — Information Technology & Organizational Processes Expert. Mashhad, Iran." },
    nav: { experience: "Experience", skills: "Skills", projects: "Projects", education: "Education", contact: "Contact" },
    hero: { tag: "Professional Resume", name: "Davood<br><em>Jeihoon</em>", role: "Information Technology & Organizational Processes Expert", bio: "I have extensive experience in designing, developing, and supporting enterprise systems and websites, with expertise in CMS management, web performance and security optimization, payment gateway integration, and process documentation.<br><br>My practical background includes web and e‑commerce development and support, internal organizational management, human resources, and personnel finance (petty cash, reconciliation, payroll).<br><br>I am precise, responsible, and results-oriented, and capable of effective collaboration with technical and executive teams to implement comprehensive organizational solutions.", printBtn: "Download / Print PDF", contactBtn: "Contact Me" },
    profile: { name: "Davood Jeihoon", role: "Information Technology & Organizational Processes Expert", location: "Location", locationVal: "Mashhad, Iran", birth: "Birth Year", birthVal: "1990", military: "Military", militaryVal: "Completed", exp: "Experience", expVal: "+18 Years", spec: "Specialty", fullLocation: "Khorasan Razavi — Mashhad" },
    exp: {
      title: "Work Experience", sub: "Professional experience and career path",
      job1: { role: "Quality Assurance, IT Support | Internal & HR Manager", date: "Feb 2007 — Present", company: "Industrial & Service Companies", items: ["Implementing and maintaining ISO 9001 and ISO 45001 quality standards","Documenting organizational processes and drafting internal regulations","Designing HR structure including recruitment, performance evaluation and personnel records","Developing internal automation to reduce human error","Supporting and maintaining organizational IT infrastructure","Interfacing with insurance, tax and other government systems","Drafting and managing personnel and contractor agreements","Petty cash management, financial reconciliation and payroll calculation per current regulations"] },
      job2: { role: "Web Designer & Developer | Operations Manager & Technical Consultant", date: "Jun 2006 — Oct 2024", company: "Freelance Projects & Startups", items: ["Designing and developing corporate, e-commerce, educational and service websites (static & dynamic)","Building custom systems including auto-messenger, online exam platform and custom modules","Optimizing security, speed and website performance","Integrating domestic and international payment gateways","Technical consulting for infrastructure, server, hosting, domain, database and system architecture","Collaborating on medical HIS system development","Analysis and design of HRM and CMMS systems","Technical support and UX improvement based on user feedback"] }
    },
    skills: {
      title: "Skills", sub: "Technical knowledge and practical expertise",
      levels: { advanced: "Advanced", intermediate: "Intermediate", basic: "Basic" },
      cats: { web: "Web & Software Development", infra: "Infrastructure & Security", org: "Management & Organization" },
      legend: { adv: "Advanced", mid: "Intermediate", bas: "Basic" },
      items: [
        { name: "Web Design & Development (Static & Dynamic)", level: "advanced", cat: "web" },
        { name: "CMS & WHMCS System Management", level: "advanced", cat: "web" },
        { name: "Custom Module Development & Programming", level: "advanced", cat: "web" },
        { name: "SMS Services & Custom Systems Development", level: "advanced", cat: "web" },
        { name: "Database, Server & Hosting Management", level: "advanced", cat: "infra" },
        { name: "Web Optimization, Security & Performance", level: "advanced", cat: "infra" },
        { name: "API Integration & Payment Gateways", level: "advanced", cat: "infra" },
        { name: "Government & Organizational Systems", level: "advanced", cat: "org" },
        { name: "Content Production & Data Analysis", level: "advanced", cat: "org" },
        { name: "General, Applied & Administrative Software", level: "advanced", cat: "org" },
        { name: "Contractor & Personnel Agreements", level: "intermediate", cat: "org" },
        { name: "Petty cash management, financial reconciliation and payroll calculation", level: "intermediate", cat: "org" },
        { name: "Process Documentation & ISO Requirements", level: "basic", cat: "org" }
      ]
    },
    projects: {
      title: "Notable Projects", sub: "Portfolio and key achievements", viewPortfolio: "View Portfolio →",
      items: [
        { icon: "web", title: "Website & Online System Design and Implementation", items: ["Static and dynamic websites with Responsive / Mobile-Friendly UI","E-commerce, corporate, educational and service websites","Speed optimization, SEO, web performance and payment gateway integration","Digital marketing consulting and organizational infrastructure","Custom systems development (auto-messenger and online exam platform)"], link: "https://djeihoon.ir" },
        { icon: "hospital", title: "Collaboration on Medical HIS System Development", items: ["Design and implementation of medical records management module","Improving data processing speed and system accuracy","Coordination with technical team and end users"] },
        { icon: "people", title: "HRM System Analysis & Design", items: ["Structuring personnel information","Salary and benefits calculation module","Compliance with insurance and tax processes","Access level definition and internal controls"] },
        { icon: "wrench", title: "CMMS System Analysis & Design", items: ["Equipment registration and technical documentation","Recording failures and maintenance history","Performance indicators and management reports"] }
      ]
    },
    education: { title: "Education & Certifications", sub: "Academic and professional credentials", degree: "B.S. Software Technology Engineering", uni: "Islamic Azad University", date: "Sep 2014 — Feb 2017" },
    languages: { title: "Languages", items: [{ name: "Persian", level: "Native", flag: "ir", pct: 100 },{ name: "Arabic", level: "Advanced", flag: "ae", pct: 80 },{ name: "English", level: "Intermediate", flag: "us", pct: 60 }] },
    certs: { title: "Courses & Certifications", items: [{ name: "IMS — Integrated Management System", sub: "Project-based" },{ name: "MCSE — Microsoft Certified Systems Engineer", sub: "Project-based" },{ name: "Security+ — CompTIA Security", sub: "Project-based" },{ name: "RT — Industrial Radiography", sub: "Industrial Certificate" }] },
    contact: { title: "Contact Me", sub: "Professional inquiry submission", infoTitle: "Professional Collaboration", infoDesc: "For job proposals, expert consulting, or partnership inquiries, please complete the form. I will respond as soon as possible." },
    form: { reqType: "Request Type", rt1: "Job Offer", rt2: "Expert Consulting", rt3: "Partnership / Investment", personalInfo: "Personal Information", name: "Full Name", nameHolder: "Enter your full name", org: "Organization / Company", orgHolder: "Company or organization name", email: "Email Address", emailHolder: "example@domain.com", phone: "Phone Number", phoneHolder: "1234567890", projectDetails: "Request Details", subject: "Subject", subjectHolder: "Enter the subject of your request", message: "Message", messageHolder: "Please describe your request in detail...", dates: "Project Timeline (optional)", datesHolder: "Select date range", duration: "Duration:", budgetTitle: "Proposed Budget", budgetAmount: "Amount", budgetAmountHolder: "Budget amount", currency: "Currency", currencySelect: "— Select —", attachTitle: "Attachment", attachHint: "Drag file here or click to select", attachFormats: "PDF, Word, Excel, ZIP — Max 10MB", reset: "Clear Form", resetConfirmTitle: "Clear form?", resetConfirmText: "All entered data will be removed.", cancel: "Cancel", send: "Send Request", sending: "Sending...", required: "Required", fileTypeErr: "File type not allowed.", fileSizeErr: "Each file must be under 10MB." },
    errors: { name: "Full name is required", nameMin: "Minimum 2 characters", email: "Please enter a valid email", phoneInvalid: "Enter 8 to 15 digits", subject: "Subject is required", message: "Message is required", messageMin: "Minimum 10 characters required", budgetUsdMin: "Minimum $20", budgetUsdMax: "Maximum $1,000,000", budgetIrtMin: "Minimum 1,000,000 Tomans", budgetIrtMax: "Maximum 20,000,000,000 Tomans" },
    alerts: { successTitle: "Request Sent ✓", successText: "Thank you. Your message has been received and I will respond as soon as possible.", errorTitle: "Sending Failed", errorText: "Unfortunately the submission failed. Please contact via email directly.", networkErr: "Connection failed. Check your internet and server.", retry: "Retry", rateLimit: "Please wait a moment before resubmitting.", ok: "Got it" },
    footer: { copy: "Davood Jeihoon — Information Technology & Organizational Processes Expert | Mashhad, Iran" },
    a11y: { skipLink: "Skip to content" },
    duration: { day: "day", days: "days", month: "month", months: "months", year: "year", years: "years", and: "and" }
  },
  ar: {
    meta: { title: "داوود جیحون | خبير تقنية المعلومات والعمليات التنظيمية", description: "السيرة الذاتية المهنية لداوود جیحون — خبير تقنية المعلومات والعمليات التنظيمية. مشهد، إيران." },
    nav: { experience: "الخبرات", skills: "المهارات", projects: "المشاريع", education: "التعليم", contact: "تواصل" },
    hero: { tag: "السيرة الذاتية المهنية", name: "داوود<br><em>جیحون</em>", role: "خبير تقنية المعلومات والعمليات التنظيمية", bio: "لدي خبرة واسعة في تصميم وتطوير ودعم الأنظمة والمواقع المؤسسية، مع كفاءة في إدارة أنظمة CMS، وتحسين الأداء والأمان على الويب، وربط بوابات الدفع، وتوثيق العمليات.<br><br>تشمل خبرتي العملية تطوير ودعم المواقع ومتاجر الإنترنت، والإدارة الداخلية للمؤسسات، والموارد البشرية، والشؤون المالية للموظفين كالصندوق والمطابقة وحساب الرواتب والأجور.<br><br>أنا دقيق ومسؤول ومرتكز على النتائج، وقادر على التعاون الفعال مع الفرق التقنية والتنفيذية لتنفيذ حلول تنظيمية شاملة وفعالة.", printBtn: "تنزيل / طباعة PDF", contactBtn: "تواصل معي" },
    profile: { name: "داوود جیحون", role: "خبير تقنية المعلومات والعمليات التنظيمية", location: "الموقع", locationVal: "مشهد، إيران", birth: "سنة الميلاد", birthVal: "١٩٩٠", military: "الخدمة العسكرية", militaryVal: "مكتملة", exp: "الخبرة", expVal: "+١٨ سنة", spec: "التخصص", fullLocation: "خراسان رضوي — مشهد" },
    exp: {
      title: "الخبرة المهنية", sub: "المسيرة المهنية والخبرات العملية",
      job1: { role: "ضمان الجودة، دعم IT | مدير الشؤون الداخلية والموارد البشرية", date: "فبراير ٢٠٠٧ — الحاضر", company: "شركات صناعية وخدمية", items: ["تطبيق وصيانة معايير ISO 9001 و ISO 45001","توثيق العمليات التنظيمية وإعداد اللوائح الداخلية","تصميم هيكل الموارد البشرية شاملاً التوظيف وتقييم الأداء وتوثيق السجلات","تطوير أنظمة الأتمتة الداخلية لتقليل الخطأ البشري","دعم وصيانة البنية التحتية لتقنية المعلومات","التعامل مع أنظمة التأمين والضرائب والأنظمة الحكومية","إعداد وإدارة عقود الموظفين والمقاولين","إدارة الصندوق والمطابقة المالية وحساب الرواتب والأجور وفق القوانين السارية"] },
      job2: { role: "مصمم ومطور ويب | مدير العمليات والمستشار التقني", date: "يونيو ٢٠٠٦ — أكتوبر ٢٠٢٤", company: "مشاريع مستقلة وشركات ناشئة", items: ["تصميم وتطوير مواقع الشركات والتجارة الإلكترونية والتعليم والخدمات (ثابتة وديناميكية)","بناء أنظمة مخصصة: مرسل تلقائي، منصة اختبار إلكتروني ووحدات مخصصة","تحسين الأمان والسرعة وأداء المواقع","ربط بوابات الدفع المحلية والدولية","الاستشارة التقنية في البنية التحتية والخادم والاستضافة والنطاق وهندسة النظام","المشاركة في تطوير نظام HIS الطبي","تحليل وتصميم أنظمة HRM و CMMS","الدعم التقني وتحسين تجربة المستخدم بناءً على الملاحظات"] }
    },
    skills: {
      title: "المهارات", sub: "المعرفة التقنية والخبرات التطبيقية",
      levels: { advanced: "متقدم", intermediate: "متوسط", basic: "أساسي" },
      cats: { web: "تطوير الويب والبرمجيات", infra: "البنية التحتية والأمان", org: "الإدارة والتنظيم" },
      legend: { adv: "متقدم", mid: "متوسط", bas: "أساسي" },
      items: [
        { name: "تصميم وتطوير الويب (ثابت وديناميكي)", level: "advanced", cat: "web" },
        { name: "إدارة أنظمة CMS و WHMCS", level: "advanced", cat: "web" },
        { name: "تطوير وحدات مخصصة ولغات البرمجة", level: "advanced", cat: "web" },
        { name: "تطوير خدمات الرسائل والأنظمة المخصصة", level: "advanced", cat: "web" },
        { name: "إدارة قواعد البيانات والخوادم والاستضافة", level: "advanced", cat: "infra" },
        { name: "تحسين الويب والأمان والأداء", level: "advanced", cat: "infra" },
        { name: "ربط API وبوابات الدفع", level: "advanced", cat: "infra" },
        { name: "الأنظمة الحكومية والمؤسسية", level: "advanced", cat: "org" },
        { name: "إنتاج المحتوى وتحليل البيانات", level: "advanced", cat: "org" },
        { name: "البرمجيات العامة والتطبيقية والإدارية", level: "advanced", cat: "org" },
        { name: "عقود المقاولين والموظفين", level: "intermediate", cat: "org" },
        { name: "إدارة الصندوق والمطابقة المالية وحساب الرواتب والأجور", level: "intermediate", cat: "org" },
        { name: "توثيق العمليات ومتطلبات ISO", level: "basic", cat: "org" }
      ]
    },
    projects: {
      title: "المشاريع البارزة", sub: "نماذج الأعمال والإنجازات الرئيسية", viewPortfolio: "عرض الأعمال ←",
      items: [
        { icon: "web", title: "تصميم وتنفيذ المواقع والأنظمة الإلكترونية", items: ["مواقع ثابتة وديناميكية بواجهة متجاوبة (Responsive / Mobile-Friendly)","مواقع تجارة إلكترونية وشركات وتعليم وخدمات","تحسين السرعة والسيو وأداء الويب وربط بوابات الدفع","استشارات التسويق الرقمي والبنية التحتية المؤسسية","تطوير أنظمة مخصصة (مرسل تلقائي ومنصة اختبار إلكتروني)"], link: "https://djeihoon.ir" },
        { icon: "hospital", title: "المشاركة في تطوير نظام HIS الطبي", items: ["تصميم وتنفيذ وحدة إدارة الملفات الطبية","تحسين سرعة معالجة البيانات ودقة النظام","التنسيق مع الفريق التقني والمستخدمين النهائيين"] },
        { icon: "people", title: "تحليل وتصميم نظام HRM", items: ["هيكلة بيانات الموظفين","وحدة حساب الرواتب والمزايا","الامتثال لعمليات التأمين والضرائب","تعريف مستويات الوصول والرقابة الداخلية"] },
        { icon: "wrench", title: "تحليل وتصميم نظام CMMS", items: ["تسجيل المعدات والوثائق التقنية","تسجيل الأعطال وسجلات الصيانة","تحديد مؤشرات الأداء والتقارير الإدارية"] }
      ]
    },
    education: { title: "التعليم والشهادات", sub: "المؤهلات الأكاديمية والمهنية", degree: "بكالوريوس هندسة تكنولوجيا البرمجيات", uni: "جامعة أزاد الإسلامية", date: "سبتمبر ٢٠١٤ — فبراير ٢٠١٧" },
    languages: { title: "اللغات", items: [{ name: "الفارسية", level: "اللغة الأم", flag: "ir", pct: 100 },{ name: "العربية", level: "متقدم", flag: "ae", pct: 80 },{ name: "الإنجليزية", level: "متوسط", flag: "us", pct: 60 }] },
    certs: { title: "الدورات والشهادات", items: [{ name: "IMS — Integrated Management System", sub: "مبني على مشاريع" },{ name: "MCSE — Microsoft Certified Systems Engineer", sub: "مبني على مشاريع" },{ name: "Security+ — CompTIA Security", sub: "مبني على مشاريع" },{ name: "RT — Industrial Radiography", sub: "شهادة صناعية" }] },
    contact: { title: "تواصل معي", sub: "تقديم طلب مهني", infoTitle: "التعاون المهني", infoDesc: "لعروض العمل والاستشارات المتخصصة أو طلبات الشراكة، يرجى ملء النموذج. سأرد في أقرب وقت ممكن." },
    form: { reqType: "نوع الطلب", rt1: "عرض وظيفة", rt2: "استشارة متخصصة", rt3: "شراكة / استثمار", personalInfo: "المعلومات الشخصية", name: "الاسم الكامل", nameHolder: "أدخل اسمك الكامل", org: "المؤسسة / الشركة", orgHolder: "اسم الشركة أو المؤسسة", email: "البريد الإلكتروني", emailHolder: "example@domain.com", phone: "رقم الهاتف", phoneHolder: "501234567", projectDetails: "تفاصيل الطلب", subject: "الموضوع", subjectHolder: "أدخل موضوع طلبك", message: "الرسالة", messageHolder: "يرجى وصف طلبك بالتفصيل...", dates: "الجدول الزمني للمشروع (اختياري)", datesHolder: "اختر النطاق الزمني", duration: "المدة:", budgetTitle: "الميزانية المقترحة", budgetAmount: "المبلغ", budgetAmountHolder: "مبلغ الميزانية", currency: "العملة", currencySelect: "— اختر —", attachTitle: "المرفق", attachHint: "اسحب الملف هنا أو انقر للاختيار", attachFormats: "PDF، Word، Excel، ZIP — الحد الأقصى 10MB", reset: "مسح النموذج", resetConfirmTitle: "مسح النموذج؟", resetConfirmText: "سيتم حذف جميع البيانات المدخلة.", cancel: "إلغاء", send: "إرسال الطلب", sending: "جارٍ الإرسال...", required: "مطلوب", fileTypeErr: "نوع الملف غير مسموح.", fileSizeErr: "يجب أن يكون كل ملف أقل من 10 ميجابايت." },
    errors: { name: "الاسم الكامل مطلوب", nameMin: "يجب إدخال حرفين على الأقل", email: "يرجى إدخال بريد إلكتروني صحيح", phoneInvalid: "أدخل 8 إلى 15 رقماً", subject: "الموضوع مطلوب", message: "الرسالة مطلوبة", messageMin: "يجب إدخال 10 أحرف على الأقل", budgetUsdMin: "الحد الأدنى 20 دولاراً", budgetUsdMax: "الحد الأقصى 1,000,000 دولار", budgetIrtMin: "الحد الأدنى 1,000,000 تومان", budgetIrtMax: "الحد الأقصى 20,000,000,000 تومان" },
    alerts: { successTitle: "تم إرسال الطلب ✓", successText: "شكراً لك. تم استلام رسالتك وسأتواصل معك في أقرب وقت ممكن.", errorTitle: "فشل الإرسال", errorText: "للأسف فشل الإرسال. يرجى التواصل مباشرة عبر البريد الإلكتروني.", networkErr: "فشل الاتصال. تحقق من الإنترنت والخادم.", retry: "إعادة المحاولة", rateLimit: "يرجى الانتظار لحظة قبل إعادة الإرسال.", ok: "حسناً" },
    footer: { copy: "داوود جیحون — خبير تقنية المعلومات والعمليات التنظيمية | مشهد، إيران" },
    a11y: { skipLink: "الانتقال إلى المحتوى" },
    duration: { day: "يوم", days: "أيام", month: "شهر", months: "أشهر", year: "سنة", years: "سنوات", and: "و" }
  }
};

let TRANSLATIONS = JSON.parse(JSON.stringify(TRANSLATIONS_FALLBACK));

/** Convert Western digits to locale numerals. Persian (۰–۹) ONLY when lang=fa; else Western 0–9 */
function toLocalNum(n, lang) {
  if (n == null || n === '') return String(n);
  if (lang !== 'fa') return String(n); // ar, en, and others: Western digits
  const s = String(n);
  const fa = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
  return s.replace(/\d/g, d => fa[parseInt(d, 10)]);
}

/** Format phone number: locale numerals (fa only) + LRE/PDF for RTL to prevent reversal */
function formatPhoneLocal(raw, lang) {
  const digits = raw.replace(/\D/g, '');
  if (digits.length < 10) return raw;
  let formatted = digits.replace(/^(\d{2})(\d{3})(\d{3})(\d+)/, '+$1 $2 $3 $4');
  formatted = toLocalNum(formatted, lang);
  if (lang === 'ar' || lang === 'fa') return '\u202A' + formatted + '\u202C';
  return formatted;
}

function isFileProtocol() {
  return location.protocol === 'file:';
}

function deepMerge(target, source) {
  for (const k of Object.keys(source)) {
    if (source[k] && typeof source[k] === 'object' && !Array.isArray(source[k])) {
      if (!target[k] || typeof target[k] !== 'object') target[k] = {};
      deepMerge(target[k], source[k]);
    } else {
      target[k] = source[k];
    }
  }
}

function getBasePath() {
  if (typeof window.BASE_PATH === 'string') return window.BASE_PATH.replace(/\/?$/, '/');
  const p = location.pathname || '/';
  // App at /cv/: always return /cv/ when path starts with /cv
  if (p.startsWith('/cv')) return '/cv/';
  // Root deployment
  return p.endsWith('/') ? p : (p.endsWith('.html') ? p.replace(/\/[^/]+$/, '/') : p + '/');
}

async function loadTranslationsFromJSON() {
  if (isFileProtocol()) return; // fetch blocked on file://, use TRANSLATIONS_FALLBACK
  const base = getBasePath();
  for (const l of ['fa','en','ar']) {
    try {
      const r = await fetch(base + 'lang/'+l+'.json');
      if (r.ok) {
        const loaded = await r.json();
        TRANSLATIONS[l] = JSON.parse(JSON.stringify(TRANSLATIONS_FALLBACK[l]));
        deepMerge(TRANSLATIONS[l], loaded);
      }
    } catch (_) {}
  }
}

/* ================================================================
   STATE
================================================================ */
let currentLang = 'fa';
let flatpickrInstance = null;
let lastSubmit = 0;
const RATE_LIMIT = 30000;
let csrfToken = '';

/* ================================================================
   i18n ENGINE — Dynamic DOM rendering
================================================================ */
function t(path) {
  const keys = path.split('.');
  let val = TRANSLATIONS[currentLang];
  for (const k of keys) { if (val && val[k] !== undefined) val = val[k]; else return path; }
  return val;
}

function renderSkills(lang) {
  const data = TRANSLATIONS[lang];
  const cats = { web: [], infra: [], org: [] };
  data.skills.items.forEach(item => cats[item.cat].push(item));
  const catOrder = ['web', 'infra', 'org'];
  return `
    <div class="skill-legend reveal">
      <div class="legend-item"><div class="legend-dot adv"></div><span>${data.skills.legend.adv}</span></div>
      <div class="legend-item"><div class="legend-dot mid"></div><span>${data.skills.legend.mid}</span></div>
      <div class="legend-item"><div class="legend-dot bas"></div><span>${data.skills.legend.bas}</span></div>
    </div>
    <div class="skills-wrapper">
    ${catOrder.map(cat => `
      <div class="skill-category reveal">
        <div class="skill-cat-label">${data.skills.cats[cat]}</div>
        <div class="skill-tags">
          ${cats[cat].map(skill => `
            <div class="skill-tag level-${skill.level}">
              <span class="skill-level-dot"></span>
              <span>${skill.name}</span>
              <span class="skill-level-badge">${data.skills.levels[skill.level]}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('')}
    </div>`;
}

function renderExperience(lang) {
  const data = TRANSLATIONS[lang];
  const jobs = [data.exp.job1, data.exp.job2];
  return jobs.map(job => `
    <div class="exp-card reveal">
      <div class="exp-top">
        <div class="exp-role">${job.role}</div>
        <div class="exp-badge">${job.date}</div>
      </div>
      <div class="exp-company">${job.company}</div>
      <ul class="exp-list">
        ${job.items.map(i => `<li>${i}</li>`).join('')}
      </ul>
    </div>`).join('');
}

const PROJECT_ICONS = {
  web: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>',
  hospital: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="2" width="18" height="20" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
  people: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
  wrench: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>'
};
function renderProjects(lang) {
  const data = TRANSLATIONS[lang];
  const iconMap = { 'web':'web', 'hospital':'hospital', 'people':'people', 'wrench':'wrench', '🌐':'web', '🏥':'hospital', '👥':'people', '🔧':'wrench' };
  return data.projects.items.map(p => {
    const iconKey = iconMap[p.icon] || p.icon || 'web';
    const iconSvg = PROJECT_ICONS[iconKey] || PROJECT_ICONS.web;
    return `
    <div class="project-card reveal">
      <div class="project-icon project-icon-svg">${iconSvg}</div>
      <div class="project-title">${p.title}</div>
      <ul class="project-list">
        ${p.items.map(i => `<li>${i}</li>`).join('')}
      </ul>
      ${p.link ? `<a href="${p.link}" class="project-link" target="_blank" rel="noopener">${(data.projects.viewPortfolio || 'View Portfolio →')}</a>` : ''}
    </div>`;
  }).join('');
}

function renderLanguages(lang) {
  const data = TRANSLATIONS[lang];
  const C = 2 * Math.PI * 28;
  const FLAG_CDN = 'https://flagcdn.com';
  return data.languages.items.map((l, i) => {
    const code = (l.flag || 'ir').toLowerCase();
    const display = `<img src="${FLAG_CDN}/w80/${code}.png" srcset="${FLAG_CDN}/w160/${code}.png 2x" alt="" class="lang-flag" width="32" height="24" loading="lazy">`;
    return `
    <div class="lang-card">
      <div class="lang-name">${escapeHtml(l.name)}</div>
      <div class="lang-arc">
        <svg width="68" height="68" viewBox="0 0 68 68" aria-hidden="true">
          <circle cx="34" cy="34" r="28" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="5"/>
          <circle cx="34" cy="34" r="28" fill="none" stroke="url(#lg_${i})" stroke-width="5"
            stroke-dasharray="${(l.pct/100)*C} ${C}" stroke-linecap="round"/>
          <defs>
            <linearGradient id="lg_${i}" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#b8963e"/><stop offset="100%" stop-color="#d4ac54"/>
            </linearGradient>
          </defs>
        </svg>
        <div class="lang-level-label">${display}</div>
      </div>
    </div>`;
  }).join('');
}

function escapeHtml(s) {
  if (s == null) return '';
  const d = document.createElement('div');
  d.textContent = String(s);
  return d.innerHTML;
}

function renderCerts(lang) {
  return TRANSLATIONS[lang].certs.items.map(c => `
    <div class="cert-item">
      <div class="cert-dot"></div>
      <div>
        <div class="cert-name">${escapeHtml(c.name)}</div>
        <div class="cert-sub">${escapeHtml(c.sub)}</div>
      </div>
    </div>`).join('');
}

function renderForm(lang) {
  const d = TRANSLATIONS[lang];
  const f = d.form;
  const isRtl = lang === 'fa' || lang === 'ar';
  const inputDir = isRtl ? 'rtl' : 'ltr';
  const inputClass = isRtl ? 'form-input' : 'form-input font-en';
  return `
    <input type="hidden" name="csrf_token" value="${csrfToken || ''}">
    <p class="form-section-label">${f.reqType}</p>
    <div class="req-type-row" id="reqTypeRow">
      ${[
        {val:'job', icon:'💼', label: f.rt1},
        {val:'consulting', icon:'🎯', label: f.rt2},
        {val:'partnership', icon:'🤝', label: f.rt3}
      ].map((rt, i) => `
        <label class="rt-chip ${i===0?'selected':''}">
          <input type="radio" name="request_type" value="${rt.val}" ${i===0?'checked':''}>
          <span class="chip-icon">${rt.icon}</span>
          <span class="chip-label">${rt.label}</span>
        </label>`).join('')}
    </div>

    <p class="form-section-label">${f.personalInfo}</p>
    <div class="form-grid-2">
      <div class="form-field">
        <label class="form-label" for="f_name"><span class="req">*</span> ${f.name}</label>
        <input type="text" id="f_name" name="name" class="form-input" placeholder="${f.nameHolder}" required autocomplete="name">
        <div class="field-error" id="e_name"></div>
      </div>
      <div class="form-field">
        <label class="form-label" for="f_org">${f.org}</label>
        <input type="text" id="f_org" name="organization" class="form-input" placeholder="${f.orgHolder}" autocomplete="organization">
      </div>
    </div>
    <div class="form-grid-2">
      <div class="form-field">
        <label class="form-label" for="f_email"><span class="req">*</span> ${f.email}</label>
        <input type="email" id="f_email" name="email" class="form-input font-en" dir="ltr" placeholder="${f.emailHolder}" required autocomplete="email">
        <div class="field-error" id="e_email"></div>
      </div>
      <div class="form-field">
        <label class="form-label" for="f_phone">${f.phone}</label>
        <input type="tel" id="f_phone" name="phone" class="form-input font-en" dir="ltr" placeholder="${f.phoneHolder}" autocomplete="tel" inputmode="numeric" pattern="[0-9]*" minlength="8" maxlength="15" title="">
        <div class="field-error" id="e_phone"></div>
      </div>
    </div>

    <p class="form-section-label">${f.projectDetails}</p>
    <div class="form-field">
      <label class="form-label" for="f_subject"><span class="req">*</span> ${f.subject}</label>
      <input type="text" id="f_subject" name="subject" class="form-input" placeholder="${f.subjectHolder}" required>
      <div class="field-error" id="e_subject"></div>
    </div>
    <div class="form-field">
      <label class="form-label" for="f_msg"><span class="req">*</span> ${f.message}</label>
      <textarea id="f_msg" name="message" class="form-textarea" placeholder="${f.messageHolder}" required></textarea>
      <div class="field-error" id="e_msg"></div>
    </div>

    <div class="form-field">
      <label class="form-label" for="f_dates">${f.dates}</label>
      <input type="text" id="f_dates" name="project_dates" class="${inputClass}" dir="${inputDir}" placeholder="${f.datesHolder}" readonly>
      <div class="duration-display" id="durationDisplay">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span id="durationText"></span>
      </div>
    </div>

    <p class="form-section-label">${f.budgetTitle}</p>
    <div class="budget-row">
      <div class="form-field" style="margin-bottom:0">
        <label class="form-label" for="f_budget">${f.budgetAmount}</label>
        <input type="number" id="f_budget" name="budget_amount" class="${inputClass}" dir="${inputDir}" placeholder="${f.budgetAmountHolder}" min="0">
        <div class="field-error" id="e_budget"></div>
      </div>
      <div class="form-field" style="margin-bottom:0">
        <label class="form-label" for="f_currency">${f.currency}</label>
        <select id="f_currency" name="budget_currency" class="form-select ${isRtl ? '' : 'font-en'}" dir="${inputDir}">
          <option value="">${f.currencySelect || '— Select —'}</option>
          <option value="IRT">IRT — تومان</option>
          <option value="USD">USD</option>
          <option value="BTC">BTC</option>
          <option value="USDT">USDT</option>
        </select>
      </div>
    </div>
    <div class="budget-preview" id="budgetPreview"></div>

    <p class="form-section-label" style="margin-top:24px">${f.attachTitle}</p>
    <div class="file-drop" id="fileDrop">
      <input type="file" id="f_files" name="attachments[]" accept=".pdf,.doc,.docx,.xls,.xlsx,.zip" multiple>
      <div class="file-drop-icon">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
      </div>
      <div class="file-drop-main">${f.attachHint}</div>
      <div class="file-drop-sub">${f.attachFormats}</div>
      <div class="file-tags" id="fileTags"></div>
    </div>

    <div class="form-footer">
      <button type="button" class="btn btn-ghost" id="formReset">${f.reset}</button>
      <button type="submit" class="btn btn-gold" id="formSubmit">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        <span id="submitLabel">${f.send}</span>
      </button>
    </div>`;
}

/* ================================================================
   APPLY LANGUAGE
================================================================ */
function applyLang(lang) {
  currentLang = lang;
  const d = TRANSLATIONS[lang];
  const html = document.documentElement;

  html.setAttribute('data-lang', lang);
  html.setAttribute('lang', lang);
  html.setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl');

  // Meta
  document.title = d.meta.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = d.meta.description;

  // Update URL (path-based: /cv/, /cv/en/, /cv/ar/)
  const base = getBasePath();
  const newPath = lang === 'fa' ? base : base + lang + '/';
  history.replaceState({}, '', newPath);

  // Update canonical
  const origin = location.origin || (location.protocol + '//' + location.host);
  const canon = document.querySelector('link[rel="canonical"]');
  if (canon) canon.href = origin + newPath;

  // Render dynamic sections
  const expGrid = document.getElementById('expGrid');
  if (expGrid) expGrid.innerHTML = renderExperience(lang);

  const skillsContainer = document.getElementById('skillsContainer');
  if (skillsContainer) skillsContainer.innerHTML = renderSkills(lang);

  const projGrid = document.getElementById('projGrid');
  if (projGrid) projGrid.innerHTML = renderProjects(lang);

  const langGrid = document.getElementById('langGrid');
  if (langGrid) langGrid.innerHTML = renderLanguages(lang);

  const certsContainer = document.getElementById('certsContainer');
  if (certsContainer) certsContainer.innerHTML = renderCerts(lang);

  const formContainer = document.getElementById('formContainer');
  const contactForm = document.getElementById('contactForm');
  if (formContainer) {
    const savedForm = getFormData();
    formContainer.innerHTML = renderForm(lang);
    if (contactForm) contactForm.setAttribute('dir', lang === 'fa' || lang === 'ar' ? 'rtl' : 'ltr');
    initForm();
    initDatePicker();
    initFileDrop();
    initBudgetPreview();
    initReqChips();
    setFormData(savedForm);
  }

  // Phone displays: locale numerals
  const phoneFormatted = formatPhoneLocal('+989383965611', lang);
  ['heroPhoneDisplay', 'contactPhoneDisplay'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = phoneFormatted;
  });

  // Section numbers (.sec-num): locale numerals
  document.querySelectorAll('.sec-num[data-sec]').forEach(el => {
    el.textContent = toLocalNum(el.getAttribute('data-sec'), lang);
  });

  // Static text nodes with data-i18n (convert digits to Persian when lang=fa)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    let val = getNestedVal(d, key);
    if (val !== undefined) {
      val = lang === 'fa' ? toLocalNum(String(val), 'fa') : val;
      el.textContent = val;
    }
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    let val = getNestedVal(d, key);
    if (val !== undefined) {
      val = lang === 'fa' ? toLocalNum(String(val), 'fa') : val;
      el.innerHTML = val;
    }
  });

  // Lang buttons
  document.querySelectorAll('[data-lang-select]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang-select') === lang);
  });

  // Re-observe reveals
  observeReveals();
}

function getNestedVal(obj, path) {
  return path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);
}

function getFormData() {
  const form = document.getElementById('contactForm');
  if (!form) return {};
  return {
    name: document.getElementById('f_name')?.value || '',
    organization: document.getElementById('f_org')?.value || '',
    email: document.getElementById('f_email')?.value || '',
    phone: document.getElementById('f_phone')?.value || '',
    subject: document.getElementById('f_subject')?.value || '',
    message: document.getElementById('f_msg')?.value || '',
    dates: document.getElementById('f_dates')?.value || '',
    budget: document.getElementById('f_budget')?.value || '',
    currency: document.getElementById('f_currency')?.value || '',
    requestType: (form.querySelector('input[name="request_type"]:checked') || {}).value || 'job'
  };
}

function setFormData(data) {
  if (!data || !data.name) return;
  const set = (id, v) => { const el = document.getElementById(id); if (el && v) el.value = v; };
  set('f_name', data.name);
  set('f_org', data.organization);
  set('f_email', data.email);
  set('f_phone', (data.phone || '').replace(/\D/g, '').slice(0, 15));
  set('f_subject', data.subject);
  set('f_msg', data.message);
  set('f_dates', data.dates);
  set('f_budget', data.budget);
  set('f_currency', data.currency);
  const rt = document.querySelector(`input[name="request_type"][value="${data.requestType}"]`);
  if (rt) {
    rt.checked = true;
    document.querySelectorAll('.rt-chip').forEach(c => c.classList.remove('selected'));
    rt.closest('.rt-chip')?.classList.add('selected');
  }
  if (data.dates && flatpickrInstance) {
    try {
      const [d1, d2] = data.dates.split(' to ');
      if (d1 && d2) flatpickrInstance.setDate([d1, d2], true);
      else flatpickrInstance.setDate(data.dates, true);
    } catch (_) {}
  }
}

/* ================================================================
   NAV
================================================================ */
function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const drawer = document.getElementById('navDrawer');
  const overlay = document.getElementById('navOverlay');
  const closeBtn = document.getElementById('drawerClose');

  const openNav = () => {
    drawer.classList.add('open');
    overlay.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };
  const closeNav = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => drawer.classList.contains('open') ? closeNav() : openNav());
  overlay.addEventListener('click', closeNav);
  closeBtn.addEventListener('click', closeNav);
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
}

/* ================================================================
   SCROLL REVEAL
================================================================ */
let revealObserver;
function observeReveals() {
  if (revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 55);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07 });
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
}

/* ================================================================
   FLATPICKR DATE RANGE
================================================================ */
function initDatePicker() {
  if (typeof flatpickr === 'undefined') return;
  const input = document.getElementById('f_dates');
  if (!input) return;
  if (flatpickrInstance) flatpickrInstance.destroy();
  const localeMap = { fa: (window.flatpickr && window.flatpickr.l10ns && window.flatpickr.l10ns.fa) || { firstDayOfWeek: 6 }, ar: (window.flatpickr && window.flatpickr.l10ns && window.flatpickr.l10ns.ar) || { firstDayOfWeek: 6 }, en: { firstDayOfWeek: 0 } };
  const useFaNum = currentLang === 'fa';
  const faDigits = '۰۱۲۳۴۵۶۷۸۹';
  flatpickrInstance = flatpickr(input, {
    mode: 'range',
    dateFormat: 'Y-m-d',
    minDate: 'today',
    disableMobile: false,
    locale: localeMap[currentLang] || localeMap.fa,
    formatDate: useFaNum ? (d) => {
      const s = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      return s.replace(/\d/g, (c) => faDigits[parseInt(c, 10)]);
    } : undefined,
    onClose(selectedDates) {
      if (selectedDates.length === 2) {
        showDuration(selectedDates[0], selectedDates[1]);
      }
    }
  });
}

function showDuration(d1, d2) {
  const ms = d2 - d1;
  const days = Math.round(ms / 86400000);
  const dd = TRANSLATIONS[currentLang].duration;
  const ln = currentLang;
  let text = '';
  if (days < 30) {
    text = `${toLocalNum(days, ln)} ${days === 1 ? dd.day : dd.days}`;
  } else if (days < 365) {
    const m = Math.round(days / 30);
    text = `${toLocalNum(m, ln)} ${m === 1 ? dd.month : dd.months}`;
  } else {
    const y = Math.floor(days / 365);
    const rem = Math.round((days % 365) / 30);
    text = `${toLocalNum(y, ln)} ${y === 1 ? dd.year : dd.years}`;
    if (rem > 0) text += ` ${dd.and} ${toLocalNum(rem, ln)} ${rem === 1 ? dd.month : dd.months}`;
  }
  const disp = document.getElementById('durationDisplay');
  const txt = document.getElementById('durationText');
  if (disp && txt) {
    const label = TRANSLATIONS[currentLang].form.duration;
    txt.textContent = `${label} ${text}`;
    disp.setAttribute('dir', currentLang === 'fa' || currentLang === 'ar' ? 'rtl' : 'ltr');
    disp.classList.add('show');
  }
}

/* ================================================================
   BUDGET PREVIEW
================================================================ */
function initBudgetPreview() {
  const amt = document.getElementById('f_budget');
  const cur = document.getElementById('f_currency');
  const prev = document.getElementById('budgetPreview');
  if (!amt || !cur || !prev) return;

  function update() {
    const a = parseFloat(amt.value);
    const c = cur.value;
    if (a > 0 && c) {
      const fmt = new Intl.NumberFormat('en-US').format(a);
      prev.textContent = `${toLocalNum(fmt, currentLang)} ${c}`;
      prev.setAttribute('dir', currentLang === 'fa' || currentLang === 'ar' ? 'rtl' : 'ltr');
      prev.classList.add('show');
    } else {
      prev.classList.remove('show');
    }
  }
  amt.addEventListener('input', update);
  cur.addEventListener('change', update);
}

/* ================================================================
   FILE DROP
================================================================ */
function initFileDrop() {
  const drop = document.getElementById('fileDrop');
  const input = document.getElementById('f_files');
  const tags = document.getElementById('fileTags');
  if (!drop || !input || !tags) return;

  function escapeHtml(s) {
    const div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }
  function renderTags(files) {
    tags.innerHTML = '';
    Array.from(files).forEach(f => {
      const tag = document.createElement('div');
      tag.className = 'file-tag';
      const sz = (f.size / 1024 / 1024).toFixed(1);
      tag.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg><span>${escapeHtml(f.name)}</span><span class="file-size">${toLocalNum(sz, currentLang)}MB</span>`;
      tags.appendChild(tag);
    });
  }

  function syncInputFiles(files) {
    const dt = new DataTransfer();
    Array.from(files).forEach(f => dt.items.add(f));
    input.files = dt.files;
    renderTags(input.files);
  }

  input.addEventListener('change', () => renderTags(input.files));
  drop.addEventListener('dragover', e => { e.preventDefault(); drop.classList.add('over'); });
  drop.addEventListener('dragleave', () => drop.classList.remove('over'));
  drop.addEventListener('drop', e => {
    e.preventDefault(); drop.classList.remove('over');
    if (e.dataTransfer.files.length) syncInputFiles(e.dataTransfer.files);
  });
}

/* ================================================================
   REQUEST TYPE CHIPS
================================================================ */
function initReqChips() {
  document.querySelectorAll('.rt-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.rt-chip').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      chip.querySelector('input[type="radio"]').checked = true;
    });
  });
}

/* ─── HTTP STATUS CODES (100–599) for clearer error messages ─── */
const HTTP_STATUS_MSG = {
  100:'Continue', 101:'Switching Protocols', 102:'Processing', 103:'Early Hints',
  200:'OK', 201:'Created', 202:'Accepted', 203:'Non-Authoritative', 204:'No Content',
  205:'Reset Content', 206:'Partial Content', 207:'Multi-Status', 208:'Already Reported', 226:'IM Used',
  300:'Multiple Choices', 301:'Moved Permanently', 302:'Found', 303:'See Other', 304:'Not Modified',
  305:'Use Proxy', 307:'Temporary Redirect', 308:'Permanent Redirect',
  400:'Bad Request — Check your form data.', 401:'Unauthorized — Authentication required.',
  402:'Payment Required.', 403:'Forbidden — Access denied.', 404:'Not Found — Endpoint does not exist.',
  405:'Method Not Allowed.', 406:'Not Acceptable.', 407:'Proxy Auth Required.',
  408:'Request Timeout — Try again.', 409:'Conflict.', 410:'Gone.', 411:'Length Required.',
  412:'Precondition Failed.', 413:'Payload Too Large — File size limit exceeded.',
  414:'URI Too Long.', 415:'Unsupported Media Type.', 416:'Range Not Satisfiable.',
  417:'Expectation Failed.', 418:'I\'m a teapot.', 421:'Misdirected Request.',
  422:'Unprocessable Entity — Validation error.', 423:'Locked.', 424:'Failed Dependency.',
  425:'Too Early.', 426:'Upgrade Required.', 428:'Precondition Required.',
  429:'Too Many Requests — Rate limited. Wait and retry.',
  431:'Request Header Fields Too Large.', 451:'Unavailable For Legal Reasons.',
  500:'Internal Server Error — Check php/health.php or server logs.',
  501:'Not Implemented.', 502:'Bad Gateway — Upstream server error.',
  503:'Service Unavailable — Server overloaded or maintenance.',
  504:'Gateway Timeout — Upstream did not respond.', 505:'HTTP Version Not Supported.',
  506:'Variant Also Negotiates.', 507:'Insufficient Storage.', 508:'Loop Detected.',
  510:'Not Extended.', 511:'Network Authentication Required.'
};

function httpStatusMessage(code) {
  if (code >= 100 && code < 600) return HTTP_STATUS_MSG[code] || `HTTP ${code} — Unexpected response.`;
  return 'Unknown status code.';
}

/* ================================================================
   FORM VALIDATION & SUBMIT
================================================================ */
function initForm() {
  const form = document.getElementById('contactForm');
  const resetBtn = document.getElementById('formReset');
  if (!form) return;

  function setError(id, errId, msg) {
    const el = document.getElementById(id);
    const err = document.getElementById(errId);
    if (el) el.classList.add('err');
    if (err) { err.textContent = msg; err.classList.add('show'); }
  }
  function clearError(id, errId) {
    const el = document.getElementById(id);
    const err = document.getElementById(errId);
    if (el) el.classList.remove('err');
    if (err) err.classList.remove('show');
  }

  function validate() {
    const errs = TRANSLATIONS[currentLang].errors;
    let valid = true;

    const name = document.getElementById('f_name')?.value.trim() || '';
    if (!name) { setError('f_name','e_name', errs.name); valid = false; }
    else if (name.length < 2) { setError('f_name','e_name', errs.nameMin); valid = false; }
    else clearError('f_name','e_name');

    const email = document.getElementById('f_email')?.value.trim() || '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('f_email','e_email', errs.email); valid = false; }
    else clearError('f_email','e_email');

    const subject = document.getElementById('f_subject')?.value.trim() || '';
    if (!subject) { setError('f_subject','e_subject', errs.subject); valid = false; }
    else clearError('f_subject','e_subject');

    const phone = (document.getElementById('f_phone')?.value || '').replace(/\D/g, '');
    if (phone) {
      if (!/^[0-9]{8,15}$/.test(phone)) { setError('f_phone','e_phone', errs.phoneInvalid || '8-15 digits'); valid = false; }
      else clearError('f_phone','e_phone');
    } else clearError('f_phone','e_phone');

    const budgetVal = parseFloat(document.getElementById('f_budget')?.value || 0);
    const currencyVal = document.getElementById('f_currency')?.value || '';
    if (budgetVal > 0 && currencyVal) {
      if (currencyVal === 'USD' && (budgetVal < 20 || budgetVal > 1000000)) { setError('f_budget','e_budget', budgetVal < 20 ? errs.budgetUsdMin : errs.budgetUsdMax); valid = false; }
      else if (currencyVal === 'IRT' && (budgetVal < 1000000 || budgetVal > 20000000000)) { setError('f_budget','e_budget', budgetVal < 1000000 ? errs.budgetIrtMin : errs.budgetIrtMax); valid = false; }
      else { clearError('f_budget','e_budget'); }
    } else { clearError('f_budget','e_budget'); }

    const msg = document.getElementById('f_msg')?.value.trim() || '';
    if (!msg) { setError('f_msg','e_msg', errs.message); valid = false; }
    else if (msg.length < 10) { setError('f_msg','e_msg', errs.messageMin); valid = false; }
    else clearError('f_msg','e_msg');

    return valid;
  }

  // Debounced validation (avoids excessive DOM updates while typing)
  let validateTimer = 0;
  function validateDebounced() {
    if (validateTimer) clearTimeout(validateTimer);
    validateTimer = setTimeout(validate, 180);
  }

  // Phone: digits only, 8-15
  const phoneInput = document.getElementById('f_phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 15);
      validateDebounced();
    });
  }

  // Inline validation (debounced)
  ['f_name','f_email','f_subject','f_msg','f_budget','f_currency'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', validateDebounced);
    document.getElementById(id)?.addEventListener('change', validate);
  });

  function validateFiles() {
    const input = document.getElementById('f_files');
    if (!input || !input.files || !input.files.length) return true;
    const allowed = ['pdf','doc','docx','xls','xlsx','zip'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    const errs = TRANSLATIONS[currentLang].form;
    for (const f of input.files) {
      const ext = (f.name.split('.').pop() || '').toLowerCase();
      if (!allowed.includes(ext)) {
        Swal.fire({ icon:'error', title: errs.fileTypeErr, confirmButtonColor:'#b8963e', background:'#101c2b', color:'#f4f0ea' });
        return false;
      }
      if (f.size > maxSize) {
        Swal.fire({ icon:'error', title: errs.fileSizeErr, confirmButtonColor:'#b8963e', background:'#101c2b', color:'#f4f0ea' });
        return false;
      }
    }
    return true;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (!validateFiles()) return;

    const now = Date.now();
    if (now - lastSubmit < RATE_LIMIT) {
      Swal.fire({ icon:'warning', title:'⏳', text: TRANSLATIONS[currentLang].alerts.rateLimit, confirmButtonColor:'#b8963e', background:'#101c2b', color:'#f4f0ea' });
      return;
    }
    lastSubmit = now;

    const submitBtn = document.getElementById('formSubmit');
    const submitLabel = document.getElementById('submitLabel');
    if (submitBtn) submitBtn.disabled = true;
    if (submitLabel) submitLabel.textContent = TRANSLATIONS[currentLang].form.sending;

    const phoneEl = document.getElementById('f_phone');
    if (phoneEl && phoneEl.value) phoneEl.value = phoneEl.value.replace(/\D/g, '').slice(0, 15);

    const fd = new FormData(form);
    fd.append('lang', currentLang);
    fd.append('_replyto', document.getElementById('f_email')?.value?.trim() || '');
    fd.append('_subject', `[djeihoon.ir] ${document.getElementById('f_subject')?.value?.trim() || 'Contact'}`);

    // Invisible CAPTCHA (reCAPTCHA v3)
    if (window.RECAPTCHA_SITE_KEY) {
      try {
        await new Promise((res, rej) => {
          if (window.grecaptcha && window.grecaptcha.execute) return res();
          const s = document.createElement('script');
          s.src = 'https://www.google.com/recaptcha/api.js?render=' + window.RECAPTCHA_SITE_KEY;
          s.onload = res;
          s.onerror = rej;
          document.head.appendChild(s);
        });
        const token = await window.grecaptcha.execute(window.RECAPTCHA_SITE_KEY, { action: 'contact' });
        fd.append('recaptcha_token', token);
      } catch (_) { /* continue without token if CAPTCHA fails */ }
    }

    const formspreeId = (window.FORMSPREE_ID || '').trim();
    const formsubmitEmail = (window.FORMSUBMIT_EMAIL || '').trim();
    const fallbackEmail = 'info@djeihoon.ir';
    const base = getBasePath();
    const skipFields = new Set(['csrf_token', 'recaptcha_token', 'attachments', 'attachments[]']);

    function buildFormSubmitPayload() {
      const obj = {};
      for (const [k, v] of fd.entries()) {
        if (skipFields.has(k) || k.startsWith('attachments')) continue;
        obj[k] = v;
      }
      return JSON.stringify(obj);
    }

    async function doSubmit(url, opts) {
      const r = await fetch(url, opts);
      const raw = await r.text();
      let json = {};
      try { json = raw ? JSON.parse(raw) : {}; } catch (_) {}
      return { res: r, json };
    }

    let submitUrl = base + 'php/submit.php';
    let useFormsubmit = false;
    let body = fd;
    if (formspreeId) {
      submitUrl = `https://formspree.io/f/${formspreeId}`;
    } else if (formsubmitEmail) {
      submitUrl = `https://formsubmit.co/ajax/${formsubmitEmail}`;
      useFormsubmit = true;
      body = buildFormSubmitPayload();
    }

    try {
      let res, json;
      ({ res, json } = await doSubmit(submitUrl, {
        method: 'POST',
        body,
        headers: useFormsubmit ? { 'Content-Type': 'application/json', 'Accept': 'application/json' } : {},
        credentials: (formspreeId || useFormsubmit) ? 'omit' : 'include'
      }));

      const al = TRANSLATIONS[currentLang].alerts;
      let ok = json.success || (formspreeId && res.ok) || (useFormsubmit && (res.ok || json.success));

      if (!ok && res.status === 500 && !formspreeId && !formsubmitEmail && fallbackEmail) {
        submitUrl = `https://formsubmit.co/ajax/${fallbackEmail}`;
        body = buildFormSubmitPayload();
        const retry = await doSubmit(submitUrl, {
          method: 'POST',
          body,
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          credentials: 'omit'
        });
        res = retry.res;
        json = retry.json;
        ok = retry.res.ok || json.success;
      }

      if (ok) {
        Swal.fire({ icon:'success', title: al.successTitle, text: al.successText, confirmButtonText: al.ok, confirmButtonColor:'#b8963e', background:'#101c2b', color:'#f4f0ea' }).then(() => {
          document.getElementById('f_name')?.focus();
        });
        form.reset();
        const csrfInput = form.querySelector('input[name="csrf_token"]');
        if (csrfInput) csrfInput.value = csrfToken;
        document.getElementById('fileTags').innerHTML = '';
        document.getElementById('budgetPreview')?.classList.remove('show');
        document.getElementById('durationDisplay')?.classList.remove('show');
        document.querySelectorAll('.rt-chip').forEach((c,i) => { c.classList.toggle('selected', i===0); });
      } else {
        const serverMsg = json.error || json.message;
        const statusMsg = !res.ok ? `[${res.status}] ${httpStatusMessage(res.status)}` : '';
        const msg = serverMsg || statusMsg || 'Request failed.';
        throw new Error(msg);
      }
    } catch(err) {
      const al = TRANSLATIONS[currentLang].alerts;
      const isNetwork = err.name === 'TypeError' || err.message?.includes('fetch');
      const usedPhp = !formspreeId && !formsubmitEmail;
      let fallbackOk = false;
      if (isNetwork && usedPhp && fallbackEmail) {
        try {
          const payload = buildFormSubmitPayload();
          const ret = await fetch(`https://formsubmit.co/ajax/${fallbackEmail}`, {
            method: 'POST',
            body: payload,
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            credentials: 'omit'
          });
          const retJson = ret.ok ? (await ret.json().catch(() => ({}))) : {};
          if (ret.ok || retJson.success) {
            fallbackOk = true;
            Swal.fire({ icon:'success', title: al.successTitle, text: al.successText, confirmButtonText: al.ok, confirmButtonColor:'#b8963e', background:'#101c2b', color:'#f4f0ea' });
            form.reset();
            const csrfInput = form.querySelector('input[name="csrf_token"]');
            if (csrfInput) csrfInput.value = csrfToken;
            document.getElementById('fileTags').innerHTML = '';
            document.getElementById('budgetPreview')?.classList.remove('show');
            document.getElementById('durationDisplay')?.classList.remove('show');
            document.querySelectorAll('.rt-chip').forEach((c,i) => { c.classList.toggle('selected', i===0); });
          }
        } catch (_) {}
      }
      if (!fallbackOk) {
        const errText = isNetwork ? (al.networkErr || al.errorText) : (err.message || al.errorText);
        Swal.fire({
          icon: 'error',
          title: al.errorTitle,
          text: errText,
          confirmButtonText: al.ok,
          showCancelButton: true,
          cancelButtonText: al.retry || 'تلاش مجدد',
          confirmButtonColor: '#b8963e',
          background: '#101c2b',
          color: '#f4f0ea'
        }).then((result) => {
          if (result.dismiss === 'cancel') form.requestSubmit();
        });
      }
    } finally {
      if (submitBtn) submitBtn.disabled = false;
      if (submitLabel) submitLabel.textContent = TRANSLATIONS[currentLang].form.send;
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      Swal.fire({
        icon: 'question',
        title: TRANSLATIONS[currentLang].form.resetConfirmTitle || 'پاک کردن فرم؟',
        text: TRANSLATIONS[currentLang].form.resetConfirmText || 'همه اطلاعات واردشده حذف خواهند شد.',
        showCancelButton: true,
        confirmButtonText: TRANSLATIONS[currentLang].alerts.ok,
        cancelButtonText: TRANSLATIONS[currentLang].form.cancel || 'انصراف',
        confirmButtonColor: '#b8963e',
        background: '#101c2b',
        color: '#f4f0ea'
      }).then((result) => {
        if (result.isConfirmed) {
          form.reset();
          const csrfInput = form.querySelector('input[name="csrf_token"]');
          if (csrfInput) csrfInput.value = csrfToken;
          document.querySelectorAll('.field-error').forEach(e => e.classList.remove('show'));
          document.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(i => i.classList.remove('err'));
          document.getElementById('fileTags').innerHTML = '';
          document.getElementById('budgetPreview')?.classList.remove('show');
          document.getElementById('durationDisplay')?.classList.remove('show');
          document.querySelectorAll('.rt-chip').forEach((c,i) => c.classList.toggle('selected', i===0));
        }
      });
    });
  }
}

/* ================================================================
   CSRF TOKEN
================================================================ */
async function fetchCsrfToken() {
  try {
    const r = await fetch(getBasePath() + 'php/csrf.php', { credentials: 'include' });
    const j = await r.json();
    if (j.token) csrfToken = j.token;
  } catch (e) { /* ignore */ }
}

/* ================================================================
   INIT
================================================================ */
document.addEventListener('DOMContentLoaded', async () => {
  await loadTranslationsFromJSON();
  if (!isFileProtocol() && 'serviceWorker' in navigator) {
    const swPath = new URL('sw.js', document.baseURI || window.location.href).pathname;
    navigator.serviceWorker.register(swPath).catch(() => {});
  }
  await fetchCsrfToken();

  const pathMatch = location.pathname.match(/\/(fa|en|ar)(?:\/|$)/i);
  const urlLang = new URLSearchParams(location.search).get('lang');
  const initLang = (pathMatch && TRANSLATIONS[pathMatch[1].toLowerCase()])
    ? pathMatch[1].toLowerCase()
    : (urlLang && TRANSLATIONS[urlLang])
      ? urlLang
      : 'fa';

  if (location.search && location.search.includes('lang=')) {
    const base = getBasePath();
    const cleanPath = initLang === 'fa' ? base : base + initLang + '/';
    history.replaceState({}, '', cleanPath);
  }

  document.querySelectorAll('[data-lang-select]').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.getAttribute('data-lang-select')));
  });

  initNav();
  applyLang(initLang);
  initScrollProgress();
  const cy = document.getElementById('copy-year');
  if (cy) cy.textContent = '\u00A9 ' + new Date().getFullYear();
  initSectionDots();
  initPrintBtn();
});

function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  let raf = null;
  const update = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h > 0 ? Math.round((window.scrollY / h) * 100) : 0;
    bar.style.width = pct + '%';
    bar.setAttribute('aria-valuenow', pct);
  };
  window.addEventListener('scroll', () => {
    if (raf) return;
    raf = requestAnimationFrame(() => { update(); raf = null; });
  }, { passive: true });
  update();
}

function initPrintBtn() {
  const btn = document.getElementById('printBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const base = getBasePath();
    const path = currentLang === 'fa' ? 'print/' : 'print/' + currentLang + '/';
    window.open(base + path, '_blank', 'width=660,height=920,scrollbars=yes');
  });
}

function initSectionDots() {
  const dots = document.getElementById('sectionDots');
  if (!dots) return;
  const sections = ['hero','experience','skills','projects','education','contact'];
  const updateActive = () => {
    const y = window.scrollY + 150;
    let active = 'hero';
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= y) active = id;
    }
    dots.querySelectorAll('.dot').forEach(a => {
      a.classList.toggle('active', a.getAttribute('data-section') === active);
    });
  };
  let raf = null;
  window.addEventListener('scroll', () => {
    if (raf) return;
    raf = requestAnimationFrame(() => { updateActive(); raf = null; });
  }, { passive: true });
  updateActive();
}
