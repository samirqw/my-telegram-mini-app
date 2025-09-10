// استيراد مكتبة Telegram Web App
const tg = window.Telegram.WebApp;

// إعداد الزر لإغلاق التطبيق
document.getElementById('closeButton').addEventListener('click', () => {
    tg.close();
});

// إظهار زر الإغلاق إذا كان متوفراً
tg.ready();