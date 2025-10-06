document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signupForm');
  const fullname = document.getElementById('fullname');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirm = document.getElementById('confirm');
  const message = document.getElementById('message');
  const colorBtn = document.getElementById('colorBtn');
  const submitBtn = document.getElementById('submitBtn');

  // color change behavior + alert
  const bgColors = ['#f5f7fb','#fff7ed','#f0fff4','#fef2f2','#eef2ff','#f0f9ff'];
  const textColors = ['#1e3a8a','#92400e','#166534','#991b1b','#4338ca','#0c4a6e'];
  let idx = 0;

  colorBtn.addEventListener('click', () => {
    idx = (idx + 1) % bgColors.length;
    document.body.style.background = bgColors[idx];
    document.body.style.color = textColors[idx];
    alert('Color theme changed!');
  });

  // helpers
  const isEmail = v => /\S+@\S+\.\S+/.test(v);
  const setValid = (el, ok) => {
    el.classList.toggle('valid', ok);
    el.classList.toggle('invalid', !ok);
  };

  // live validation
  form.addEventListener('input', (e) => {
    if (e.target === email) setValid(email, isEmail(email.value));
    if (e.target === password) setValid(password, password.value.length >= 6);
    if (e.target === confirm) setValid(confirm, password.value === confirm.value && confirm.value.length >= 6);
  });

  // submit handler -> alert + thank you message + color change
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // simple checks
    if (!fullname.value.trim()) {
      message.textContent = 'Please enter your full name.';
      fullname.focus();
      return;
    }
    if (!isEmail(email.value)) {
      message.textContent = 'Please enter a valid email.';
      email.focus();
      return;
    }
    if (password.value.length < 6) {
      message.textContent = 'Password should be at least 6 characters.';
      password.focus();
      return;
    }
    if (password.value !== confirm.value) {
      message.textContent = 'Passwords do not match.';
      confirm.focus();
      return;
    }

    // success
    message.textContent = '';
    alert(`Signup successful — thank you, ${fullname.value}!`);
    submitBtn.textContent = 'Thank you!';
    submitBtn.disabled = true;
    document.body.style.background = '#e6fffb'; // small celebration
    document.body.style.color = '#064e3b';
    message.textContent = `Thank you ${fullname.value}. A confirmation was sent to ${email.value}.`;
    message.style.color = '#059669';
  });
});
