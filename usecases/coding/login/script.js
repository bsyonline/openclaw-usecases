(() => {
  const form = document.getElementById('loginForm');
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  const toggle = document.getElementById('togglePwd');
  const toggleText = document.getElementById('togglePwdText');
  const showIcon = document.getElementById('togglePwdShowIcon');
  const hideIcon = document.getElementById('togglePwdHideIcon');
  const status = document.getElementById('status');
  const submitBtn = document.getElementById('submitBtn');

  function setStatus(text, type) {
    status.textContent = text || '';
    status.classList.remove('status--ok', 'status--err');
    if (type === 'ok') status.classList.add('status--ok');
    if (type === 'err') status.classList.add('status--err');
  }

  function setFieldError(el, hintText) {
    const field = el.closest('.field');
    if (!field) return;
    field.classList.add('field--error');
    const hint = field.querySelector('.field__hint');
    if (hintText && hint) hint.textContent = hintText;
  }

  function clearFieldError(el, defaultHint) {
    const field = el.closest('.field');
    if (!field) return;
    field.classList.remove('field--error');
    const hint = field.querySelector('.field__hint');
    if (defaultHint && hint) hint.textContent = defaultHint;
  }

  function validate() {
    let ok = true;

    const u = username.value.trim();
    const p = password.value;

    clearFieldError(username, '请输入用户名或邮箱');
    clearFieldError(password, '密码至少 6 位');

    if (!u) {
      setFieldError(username, '用户名不能为空');
      ok = false;
    }

    if (!p) {
      setFieldError(password, '密码不能为空');
      ok = false;
    } else if (p.length < 6) {
      setFieldError(password, '密码至少 6 位');
      ok = false;
    }

    return ok;
  }

  function setHidden(el, shouldHide) {
    if (!el) return;
    if (shouldHide) {
      el.setAttribute('hidden', '');
    } else {
      el.removeAttribute('hidden');
    }
  }

  toggle.addEventListener('click', () => {
    const isPwd = password.type === 'password';
    password.type = isPwd ? 'text' : 'password';
    setHidden(showIcon, isPwd);
    setHidden(hideIcon, !isPwd);
    if (toggleText) toggleText.textContent = isPwd ? '隐藏密码' : '显示密码';
    toggle.setAttribute('aria-label', isPwd ? '隐藏密码' : '显示密码');
    toggle.setAttribute('aria-pressed', String(isPwd));
    password.focus();
  });

  [username, password].forEach((el) => {
    el.addEventListener('input', () => {
      setStatus('', '');
      const field = el.closest('.field');
      if (field) field.classList.remove('field--error');
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validate()) {
      setStatus('请检查输入项', 'err');
      return;
    }

    // Demo-only: no real auth. Simulate a network request.
    submitBtn.disabled = true;
    setStatus('正在登录…', '');

    try {
      await new Promise((r) => setTimeout(r, 700));
      setStatus('登录成功（示例页面未接后端）', 'ok');
    } catch (err) {
      setStatus('登录失败，请稍后重试', 'err');
    } finally {
      submitBtn.disabled = false;
    }
  });
})();
