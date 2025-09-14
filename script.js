// عناصر DOM
const modal = document.getElementById('modal');
const regBtn = document.getElementById('registerBtn');
const heroReg = document.getElementById('heroRegister');
const closeBtn = document.getElementById('modalClose');
const cancelBtn = document.getElementById('cancelBtn');
const form = document.getElementById('regForm');
const formMsg = document.getElementById('formMsg');

// ضع هنا رابط Google Apps Script الذي ستنشره لاحقًا
const GAS_URL = 'https://script.google.com/macros/s/AKfycbwlEktczurewTQu5gBrb_sO2_5aVmMuMs-grflEj-VZVs7zkmywAUBsCuLKRHaidtc/exec';

// فتح/اغلاق المودال
function openModal(){ modal.classList.remove('hidden'); modal.setAttribute('aria-hidden', 'false'); }
function closeModal(){ modal.classList.add('hidden'); modal.setAttribute('aria-hidden', 'true'); form.reset(); formMsg.textContent=''; }

regBtn.addEventListener('click', openModal);
heroReg.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);

// إرسال الفورم
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  formMsg.textContent = 'جاري الإرسال...';
  const data = Object.fromEntries(new FormData(form).entries());
  try {
    // الإرسال إلى Google Apps Script (POST JSON)
    const res = await fetch(GAS_URL, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (result && result.status === 'success') {
      formMsg.textContent = 'تم التسجيل بنجاح، شكراً!';
      form.reset();
      setTimeout(closeModal, 1500);
    } else {
      formMsg.textContent = 'حدث خطأ أثناء الإرسال. جرب مرة أخرى.';
      console.error('Server response:', result);
    }
  } catch (err) {
    console.error(err);
    formMsg.textContent = 'فشل الاتصال بالخادم. تأكد من إعداد Google Apps Script.';
  }
});
