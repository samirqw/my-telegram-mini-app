document.addEventListener("DOMContentLoaded", () => {
  // 1. Telegram WebApp API – بس لو موجود
  const tg = window.Telegram && window.Telegram.WebApp;
  if (tg && typeof tg.ready === "function") {
    tg.ready();
    console.log("Telegram WebApp ready()");
  } else {
    console.warn("Not running inside Telegram WebApp – skipping tg.ready()");
  }

  // 2. رابط API لو حتربط الباكبند لاحقاً
  const apiBase = "https://your-app-name.up.railway.app/api";

  // 3. العناصر
  const startBtn    = document.getElementById("startButton");
  const reportBtn   = document.getElementById("reportBtn");
  const closeBtn    = document.getElementById("closeButton");
  const sendTicket  = document.getElementById("sendTicket");
  const reportForm  = document.getElementById("reportForm");
  const lessonsContainer = document.getElementById("lessonsContainer");

  // 4. بيانات الدروس بروابط Raw صحيحة
  const lessons = [
    {
      title:      "الدرس الأول: الحركة",
      pdfLesson:  "https://raw.githubusercontent.com/samirqw/my-telegram-mini-app/main/pdfs/lesson1.pdf",
      pdfExercise:"https://raw.githubusercontent.com/samirqw/my-telegram-mini-app/main/pdfs/exercice1.pdf",
      pdfSolution:"https://raw.githubusercontent.com/samirqw/my-telegram-mini-app/main/pdfs/solution.pdf"
    }
  ];

  // 5. دالة عرض الدروس
  function loadLessons() {
    console.log("loadLessons() called");
    lessonsContainer.innerHTML = lessons.map(lesson => `
      <div class="lesson-card">
        <h2>${lesson.title}</h2>

        <div class="pdf-section">
          <p>📘 الدرس:</p>
          <a href="${lesson.pdfLesson}"  target="_blank">عرض الملف</a> |
          <a href="${lesson.pdfLesson}"  download>تحميل الملف</a>
        </div>

        <div class="pdf-section">
          <p>📝 التمارين:</p>
          <a href="${lesson.pdfExercise}" target="_blank">عرض الملف</a> |
          <a href="${lesson.pdfExercise}" download>تحميل الملف</a>
        </div>

        <div class="pdf-section">
          <p>✅ التصحيح:</p>
          <a href="${lesson.pdfSolution}" target="_blank">عرض الملف</a> |
          <a href="${lesson.pdfSolution}" download>تحميل الملف</a>
        </div>
      </div>
    `).join("");
  }

  // 6. ربط الأزرار
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      console.log("startButton clicked");
      loadLessons();
    });
  } else console.error("#startButton not found");

  if (reportBtn) {
    reportBtn.addEventListener("click", () => {
      console.log("reportBtn clicked");
      reportForm.classList.toggle("hidden");
    });
  } else console.error("#reportBtn not found");

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      console.log("closeButton clicked");
      if (tg && typeof tg.close === "function") tg.close();
      else alert("اغلاق التطبيق");
    });
  } else console.error("#closeButton not found");

  if (sendTicket) {
    sendTicket.addEventListener("click", async () => {
      console.log("sendTicket clicked");
      const ticket = {
        name:    document.getElementById("name").value,
        email:   document.getElementById("email").value,
        message: document.getElementById("message").value
      };
      try {
        const res = await fetch(`${apiBase}/tickets`, {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify(ticket)
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
  } else console.error("#sendTicket not found");
});
