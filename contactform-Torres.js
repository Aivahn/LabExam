// contactform-Torres.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const nameEl = document.getElementById('name');
  const emailEl = document.getElementById('email');
  const subjectEl = document.getElementById('subject');
  const messageEl = document.getElementById('message');
  const statusEl = document.getElementById('status');
  const themeBtn = document.getElementById('themeBtn');
  const sendBtn = document.getElementById('sendBtn');

  // theme/colors for themeBtn
  const themes = ['#f3f6fb','#fff7ed','#f0fff4','#fff0f6','#eef2ff'];
  let t = 0;
  themeBtn.addEventListener('click', () => {
    t = (t + 1) % themes.length;
    document.body.style.background = themes[t];
    alert('Theme changed!');
  });

  const isEmail = (v) => /\S+@\S+\.\S+/.test(v);

  const setValid = (el, ok) => {
    el.classList.toggle('valid', ok);
    el.classList.toggle('invalid', !ok);
  };

  // live validation
  [nameEl, emailEl, subjectEl, messageEl].forEach(el =>
    el.addEventListener('input', () => {
      if (el === emailEl) setValid(el, isEmail(el.value));
      else setValid(el, el.value.trim().length > 0);
    })
  );

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // clear status
    statusEl.textContent = '';
    let ok = true;

    // check fields
    if (!nameEl.value.trim()) { setValid(nameEl, false); ok = false; }
    if (!isEmail(emailEl.value)) { setValid(emailEl, false); ok = false; }
    if (!subjectEl.value.trim()) { setValid(subjectEl, false); ok = false; }
    if (!messageEl.value.trim()) { setValid(messageEl, false); ok = false; }

    if (!ok) {
      alert('Please fill all fields correctly.');
      statusEl.textContent = 'Please fill in required fields.';
      statusEl.style.color = '#b91c1c';
      return;
    }

    // success path
    alert('Message sent successfully! Thank you.');
    statusEl.textContent = `Thanks ${nameEl.value.trim()} — we received your message.`;
    statusEl.style.color = '#059669';
    sendBtn.textContent = 'Sent!';
    sendBtn.disabled = true;
    // small success background
    document.body.style.background = '#ecfdf5';
  });
});
