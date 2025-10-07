// login-Torres.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const togglePw = document.getElementById('togglePw');
  const themeBtn = document.getElementById('themeBtn');
  const loginBtn = document.getElementById('loginBtn');
  const message = document.getElementById('message');

  const colors = ['#f5f7fb','#fff7ed','#f0fff4','#fff0f6','#eef2ff'];
  let idx = 0;

  // Toggle password visibility
  togglePw.addEventListener('click', () => {
    if (password.type === 'password') {
      password.type = 'text';
      togglePw.textContent = 'Hide';
    } else {
      password.type = 'password';
      togglePw.textContent = 'Show';
    }
  });

  // Theme changer + alert
  themeBtn.addEventListener('click', () => {
    idx = (idx + 1) % colors.length;
    document.body.style.background = colors[idx];
    alert('Theme changed!');
  });

  // Helpers
  const isEmail = v => /\S+@\S+\.\S+/.test(v);
  const setValid = (el, ok) => {
    el.classList.toggle('valid', ok);
    el.classList.toggle('invalid', !ok);
  };

  // Live validation
  [email, password].forEach(el => el.addEventListener('input', () => {
    if (el === email) setValid(el, isEmail(el.value));
    else setValid(el, password.value.length >= 6);
  }));

  // Submit handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    message.textContent = '';
    let ok = true;
    if (!isEmail(email.value)) { setValid(email, false); ok = false; }
    if (password.value.length < 6) { setValid(password, false); ok = false; }

    if (!ok) {
      alert('Please fix the highlighted fields.');
      message.textContent = 'Please fix the highlighted fields.';
      message.style.color = '#b91c1c';
      return;
    }

    // Success
    alert(`Login successful — welcome back!`);
    loginBtn.textContent = 'Welcome';
    loginBtn.disabled = true;
    document.body.style.background = '#e6fffb';
    message.textContent = `Welcome back!`;
    message.style.color = '#059669';
  });
});
