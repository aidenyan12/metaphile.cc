(function () {
  var themeToggle = document.getElementById('theme-toggle');
  var themeIcon = document.getElementById('theme-icon');

  function applyTheme(theme) {
    var nextTheme = theme === 'light' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', nextTheme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', nextTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      themeToggle.setAttribute('title', nextTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
    if (themeIcon) {
      themeIcon.textContent = nextTheme === 'dark' ? '☀' : '☾';
    }
  }

  var storedTheme = null;
  try {
    storedTheme = window.localStorage.getItem('site-theme');
  } catch (_) {}
  applyTheme(storedTheme === 'light' ? 'light' : 'dark');

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = document.body.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      var next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try {
        window.localStorage.setItem('site-theme', next);
      } catch (_) {}
    });
  }
})();
