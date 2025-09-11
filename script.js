document.addEventListener("DOMContentLoaded", () => {
  const tg = window.Telegram.WebApp;
  tg.ready();

  // زر الإغلاق
  const closeBtn = document.getElementById('closeButton');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => tg.close());
  }

  // زر البداية
  const startBtn = document.getElementById('startButton');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      loadLessons();
    });
  }

  // زر التبليغ
  const reportBtn = document.getElementById('reportBtn');
  if (reportBtn) {
    reportBtn.addEventListener('click', () => {
      document.getElementById('reportForm').classList.toggle('hidden');
    });
  }

  // زر إرسال البلاغ
  const sendBtn = document.getElementById('sendTicket');
  if (sendBtn) {
    sendBtn.addEventListener('click', async () => {
      const ticket = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
      };

      const res = await fetch(`${apiBase}/tickets`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(ticket)
      });

      const data = await res.json();
      if (data.success) {
        alert('✅ تم إرسال البلاغ بنجاح');
        document.getElementById('reportForm').classList.add('hidden');
      }
    });
  }

  // روابط ملفات PDF (استخدم روابط Raw من GitHub)
  const lessons = [
    {
      title: "الدرس الأول: الحركة",
      pdfLesson: "https://raw.githubusercontent.com/samirqw/my-telegram-mini-app/main/pdfs/lesson1.pdf",
      pdfExercise: "https://raw.githubusercontent.com/samirqw/my-telegram-mini-app/main/pdfs/exercice1.pdf",
      pdfSolution: "https://raw.githubusercontent.com/samirqw/my-telegram-mini-app/main/pdfs/solution.pdf"
    }
  ];

  function loadLessons() {
    const container = document.getElementById('lessonsContainer');

    container.innerHTML = lessons.map(lesson => `
      <div class="lesson-card">
        <h2>${lesson.title}</h2>

        <div class="pdf-section">
          <p>📘 الدرس:</p>
          <a href="${lesson.pdfLesson}" target="_blank">عرض الملف</a> |
          <a href="${lesson.pdfLesson}" download>تحميل الملف</a>
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

        <div class="social-links">
          تابعني عبر <a href="https://wa.me/212645270025" target="_blank">WhatsApp</a> و
          <a href="https://www.instagram.com/y7y_s12" target="_blank">Instagram</a>
        </div>
      </div>
    `).join('');
  }
});
