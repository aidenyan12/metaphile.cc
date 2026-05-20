/**
 * homepage-i18n.js
 * Bilingual EN/ZH toggle for metaphile.cc homepage.
 * All user-facing text is stored in the `I18N` object below.
 * Add `data-i18n="key"` to any element — the JS will swap its textContent.
 *
 * Language preference is persisted to localStorage as `site-lang`.
 * The toggle button expects `id="lang-toggle"` in the DOM.
 */

(function () {
  var I18N = {
    en: {
      // Nav
      nav_home: 'Home',
      nav_gallery: 'Gallery',
      nav_contact: 'Contact',
      search_placeholder: 'Search projects',

      // Scroll cue
      scroll_cue_text: 'Start scrolling to explore',

      // Section 1 — hero
      eyebrow: 'We offer solutions for',
      h1: 'Cultural Intelligence',
      lead1: 'Digital Presence & Story Architecture: Adaptive content ecosystems designed not just for communication, but for storytelling and resonance.',
      lead2: 'Data-Led Decision Systems: Dashboards and analytics that translate complexity into clarity — insight as a visual narrative.',
      lead3: 'Secure & Ethical Infrastructure: Cybersecurity frameworks and compliance layers that protect intellectual and creative assets.',
      cta_gallery: 'View Gallery',

      // Section 2
      h2_s2: 'Education Technology & Learning Design',
      p1_s2: 'AI-Enhanced Learning: Intelligent tutors, generative assistants, and recommendation systems that respond to curiosity, not just performance.',
      p2_s2: 'Interactive Visual Learning: 3D, AR, and data visualization that make abstract ideas tangible and relational.',
      p3_s2: 'Learning Analytics & Interpretation: Dashboards that reveal understanding, engagement, and narrative patterns rather than only scores.',
      cta_s2: 'Explore Service',

      // Section 3
      h2_s3: 'Research, Archives & Data Aesthetics',
      p1_s3: 'Computational Humanities Pipelines: Text mining, NLP, and computer vision for cultural collections — analytical yet transparent.',
      p2_s3: 'Semantic & Relational Mapping: Knowledge graphs that reveal unseen constellations between people, artworks, and histories.',
      p3_s3: 'Analytic & Generative Visualization: Interfaces that transform research data into visual essays, exhibitions, and spatial stories.',
      cta_s3: 'Explore Service',

      // Accessibility aria-labels
      aria_lang_toggle: 'Switch to Chinese',
      aria_theme_toggle: 'Switch to light mode',
      aria_theme_toggle_light: 'Switch to dark mode',
    },

    zh: {
      // Nav
      nav_home: '主頁',
      nav_gallery: '作品集',
      nav_contact: '聯絡',
      search_placeholder: '搜尋項目',

      // Scroll cue
      scroll_cue_text: '開始滾動探索',

      // Section 1 — hero
      eyebrow: '我們提供以下解決方案',
      h1: '文化智能',
      lead1: '數碼形象與故事架構：適應性內容生態系統，不僅為溝通而設計，更為講故事與共鳴而打造。',
      lead2: '數據主導決策系統：將複雜性轉化為清晰洞察的儀表板與分析工具——以視覺敘事呈現洞見。',
      lead3: '安全與倫理基礎設施：保護知識與創意資產的網絡安全框架及合規層。',
      cta_gallery: '瀏覽作品集',

      // Section 2
      h2_s2: '教育科技與學習設計',
      p1_s2: '人工智能強化學習：智能導師、生成式助理及推薦系統，回應好奇心而不僅止於表現。',
      p2_s2: '互動視覺學習：令抽象概念變得切實可觸及關聯性的 3D、AR 及數據可視化。',
      p3_s2: '學習分析與解讀：揭示理解、參與度及敘事模式的儀表板，而非僅呈現分數。',
      cta_s2: '探索服務',

      // Section 3
      h2_s3: '研究、檔案與數據美學',
      p1_s3: '計算人文學管道：為文化藏品而設的文本探礦、自然語言處理及電腦視覺——分析與透明兼備。',
      p2_s3: '語義與關係映射：揭示人物、藝術品與歷史之間無形星叢的知識圖譜。',
      p3_s3: '分析與生成式可視化：將研究數據轉化為視覺論文、展覽及空間故事的界面。',
      cta_s3: '探索服務',

      // Accessibility aria-labels
      aria_lang_toggle: '切換至英文',
      aria_theme_toggle: '切換至淺色模式',
      aria_theme_toggle_light: '切換至深色模式',
    },
  };

  var LANG_KEY = 'site-lang';
  var currentLang = null; // 'en' or 'zh'

  function getLang() {
    try {
      var stored = localStorage.getItem(LANG_KEY);
      if (stored === 'en' || stored === 'zh') return stored;
    } catch (_) {}
    // Default to English
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

    // Update lang attribute on <html> for accessibility / screen readers
    document.documentElement.setAttribute('lang', lang);

    // Update language toggle button label
    var langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
      langToggle.setAttribute(
        'aria-label',
        lang === 'en' ? dict.aria_lang_toggle : 'Switch to English'
      );
      // Show the other language as the button label
      langToggle.textContent = lang === 'en' ? '中文' : 'EN';
    }

    // Update theme toggle aria-label to match current language
    var themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      var isDark = document.body.getAttribute('data-theme') !== 'light';
      if (lang === 'en') {
        themeToggle.setAttribute('aria-label', isDark ? dict.aria_theme_toggle : dict.aria_theme_toggle_light);
      } else {
        // zh
        themeToggle.setAttribute('aria-label', isDark ? '切換至淺色模式' : '切換至深色模式');
      }
    }
  }

  function toggleLang() {
    applyLang(currentLang === 'en' ? 'zh' : 'en');
  }

  // Wire up the toggle button once DOM is ready
  function init() {
    var langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
      langToggle.addEventListener('click', toggleLang);
    }

    // Theme toggle must also update lang-aware aria-label when clicked
    var themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', function () {
        // Re-apply lang to refresh theme aria-label after theme switch
        applyLang(currentLang);
      });
    }

    // Apply the saved / default language
    applyLang(getLang());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
