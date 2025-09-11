document.addEventListener("DOMContentLoaded", () => {
  const apiBase = "https://your-app-name.up.railway.app/api";

  // حجز عناصر الـDOM
  const startBtn        = document.getElementById("startButton");
  const backBtn         = document.getElementById("backButton");
  const reportBtn       = document.getElementById("reportBtn");
  const closeBtn        = document.getElementById("closeButton");
  const sendTicketBtn   = document.getElementById("sendTicket");
  const reportForm      = document.getElementById("reportForm");
  const lessonsContainer= document.getElementById("lessonsContainer");

  // بيانات الدروس
  const lessons = [
    {
      title:       "الدرس الأول: الحركة",
      pdfLesson:   "https://raw.githubusercontent.com/samirqw/my-telegram-mini-app/main/pdfs/lesson1.pd",
      pdfExercise: "https://raw.githubusercontent.com/samirqw/my-telegram-mini-app/main/pdfs/exercice1.pdf",
      pdfSolution: "https://raw.githubusercontent.com/samirqw/my-telegram-mini-app/main/pdfs/solution.pdf"
    }
  ];
  document.addEventListener("DOMContentLoaded", () => {
  const tg = window.Telegram?.WebApp;
  if (tg?.BackButton) {
    // إظهار زر الرجوع في الشريط العلوي
    tg.BackButton.show();
    tg.BackButton.onClick(() => {
      // عند الضغط عليه: العودة للشاشة الرئيسية
      document.getElementById("lessonsContainer").style.display = "none";
      document.getElementById("backButton").classList.add("hidden");
      document.getElementById("startButton").classList.remove("hidden");
    });
  }
});

  // دالة لعرض الدروس
  function loadLessons() {
    console.log("loadLessons() called");
    // إخفاء شاشة البداية وإظهار زر “رجوع”
    startBtn.classList.add("hidden");
    backBtn.classList.remove("hidden");
    reportForm.classList.add("hidden");

    // حقن البطاقات في الحاوية
    lessonsContainer.innerHTML = lessons.map(lesson => `
      <div class="lesson-card">
        <h2>${lesson.title}</h2>
        <div class="pdf-section">
          <p>📘 الدرس:</p>
          <a href="${lesson.pdfLesson}"  target="_blank">عرض</a> |
          <a href="${lesson.pdfLesson}"  download>تحميل</a>
        </div>
        <div class="pdf-section">
          <p>📝 التمارين:</p>
          <a href="${lesson.pdfExercise}" target="_blank">عرض</a> |
          <a href="${lesson.pdfExercise}" download>تحميل</a>
        </div>
        <div class="pdf-section">
          <p>✅ التصحيح:</p>
          <a href="${lesson.pdfSolution}" target="_blank">عرض</a> |
          <a href="${lesson.pdfSolution}" download>تحميل</a>
        </div>
      </div>
    `).join("");

    lessonsContainer.style.display = "block";
  }

  // رابط تيليجرام (احمِ الاستدعاء)
  const tg = window.Telegram?.WebApp;
  if (tg?.ready) tg.ready();

  // ربط الأحداث

  // زر البداية
  startBtn.addEventListener("click", loadLessons);

  // زر الرجوع
  backBtn.addEventListener("click", () => {
    console.log("backButton clicked");
    lessonsContainer.style.display = "none";
    backBtn.classList.add("hidden");
    startBtn.classList.remove("hidden");
  });

  // زر التبليغ
  reportBtn.addEventListener("click", () => {
    reportForm.classList.toggle("hidden");
  });

  // زر إرسال البلاغ
  sendTicketBtn.addEventListener("click", async () => {
    const ticket = {
      name:    document.getElementById("name").value,
      email:   document.getElementById("email").value,
      message: document.getElementById("message").value
    };
    try {
      const res  = await fetch(`${apiBase}/tickets`, {
        method:  "POST",
        headers: {"Content-Type":"application/json"},
        body:    JSON.stringify(ticket)
      });
      const data = await res.json();
      if (data.success) {
        alert("✅ تم إرسال البلاغ بنجاح");
        reportForm.classList.add("hidden");
      }
    } catch (err) {
      console.error(err);
      alert("❌ فشل إرسال البلاغ");
    }
  });

  // زر الإغلاق
  closeBtn.addEventListener("click", () => {
    if (tg?.close) tg.close();
    else alert("اغلاق التطبيق");
  });
});


