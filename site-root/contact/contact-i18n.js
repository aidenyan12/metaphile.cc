/**
 * contact-i18n.js
 * Bilingual EN/ZH toggle for metaphile.cc/contact/
 * Load this BEFORE any other script so translations apply on DOMContentLoaded.
 *
 * Architecture: same as homepage-i18n.js — data-i18n attributes on HTML,
 * JS swaps textContent and updates localStorage + <html lang>.
 */

(function () {
  var I18N = {
    en: {
      // Nav
      nav_home: 'Home',
      nav_gallery: 'Gallery',
      nav_contact: 'Contact',
      search_placeholder: 'Search projects',
      aria_lang_toggle: 'Switch to Chinese',
      aria_theme_toggle: 'Switch to light mode',
      aria_theme_toggle_light: 'Switch to dark mode',

      // Contact page
      enquiries_label: 'Enquiries',
      h2_main: "Let's talk about your next collaboration.",
      p_intro: 'Share a short outline of your project, the kind of support you need, and your preferred timeline. We can then move the conversation forward by email.',
      btn_email: 'Email Metaphile',
      btn_instagram: 'Instagram',

      email_label: 'Email',
      address_label: 'Address',
      instagram_label: 'Instagram',

      // Footer strip
      for_projects_label: 'For projects',
      for_projects_text: 'Commissions, cultural initiatives, learning design, digital platforms, archive storytelling.',
      base_label: 'Base',
      base_text: 'Hong Kong, with collaboration across local and international contexts.',
      response_label: 'Response',
      response_text: 'Email is the most reliable channel for detailed collaboration enquiries.',

      // Accessibility
      aria_instagram: 'Visit Metaphile on Instagram',
    },

    zh: {
      // Nav
      nav_home: '主頁',
      nav_gallery: '作品集',
      nav_contact: '聯絡',
      search_placeholder: '搜尋項目',
      aria_lang_toggle: '切換至英文',
      aria_theme_toggle: '切換至淺色模式',
      aria_theme_toggle_light: '切換至深色模式',

      // Contact page
      enquiries_label: '查詢',
      h2_main: '讓我們談談您的下一個合作項目。',
      p_intro: '分享您項目的簡短概述、所需支援類型及偏好的時間表。我們可以通過電子郵件繼續推進對話。',
      btn_email: '電郵 Metaphile',
      btn_instagram: 'Instagram',

      email_label: '電郵',
      address_label: '地址',
      instagram_label: 'Instagram',

      // Footer strip
      for_projects_label: '項目類型',
      for_projects_text: '委託項目、文化計劃、學習設計、數碼平台、檔案敘事。',
      base_label: '基地',
      base_text: '香港，同時與本地及國際團隊合作。',
      response_label: '回覆方式',
      response_text: '電子郵件是處理詳細合作查詢的最可靠渠道。',

      // Accessibility
      aria_instagram: '在 Instagram 上關注 Metaphile',
    },
  };

  var LANG_KEY = 'site-lang';
  var currentLang = null;

  function getLang() {
    try {
      var stored = localStorage.getItem(LANG_KEY);
      if (stored === 'en' || stored === 'zh') return stored;
    } catch (_) {}
    return 'en';
  }

  function applyLang(lang) {
    currentLang = lang;
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (_) {}

    var dict = I18N[lang];
    if (!dict) return;

    // Translate all [data-i18n] elements
    var els = document.querySelectorAll('[data-i18n]');
    els.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });

    // Translate all [data-i18n-placeholder] elements
    var placeholderEls = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderEls.forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] !== undefined) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    // Translate all [data-i18n-aria-label] elements
    var ariaEls = document.querySelectorAll('[data-i18n-aria-label]');
    ariaEls.forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria-label');
      if (dict[key] !== undefined) {
        el.setAttribute('aria-label', dict[key]);
      }
    });

    document.documentElement.setAttribute('lang', lang);

    // Update language toggle button
    var langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
      langToggle.setAttribute(
        'aria-label',
        lang === 'en' ? dict.aria_lang_toggle : 'Switch to English'
      );
      langToggle.textContent = lang === 'en' ? '中文' : 'EN';
    }

    // Update theme toggle aria-label
    var themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      var isDark = document.body.getAttribute('data-theme') !== 'light';
      if (lang === 'en') {
        themeToggle.setAttribute('aria-label', isDark ? dict.aria_theme_toggle : dict.aria_theme_toggle_light);
      } else {
        themeToggle.setAttribute('aria-label', isDark ? '切換至淺色模式' : '切換至深色模式');
      }
    }
  }

  function toggleLang() {
    applyLang(currentLang === 'en' ? 'zh' : 'en');
  }

  function init() {
    var langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
      langToggle.addEventListener('click', toggleLang);
    }

    var themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', function () {
        applyLang(currentLang); // refresh theme aria-label
      });
    }

    applyLang(getLang());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
