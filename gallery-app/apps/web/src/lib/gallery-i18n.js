/**
 * gallery-i18n.js
 * All user-facing EN/ZH translations for the Metaphile gallery React app.
 * Consumed by the useGalleryTranslation hook.
 */

export const I18N = {
  en: {
    // ── Header ────────────────────────────────────────────
    nav_home: 'Home',
    nav_gallery: 'Gallery',
    nav_contact: 'Contact',
    search_placeholder: 'Search projects',
    aria_lang_toggle: 'Switch to Chinese',
    aria_theme_toggle_light: 'Switch to light mode',
    aria_theme_toggle_dark: 'Switch to dark mode',
    instagram_label: 'Instagram',
    mobile_menu_label: 'Menu',

    // ── PortfolioGallery ──────────────────────────────────
    gallery_eyebrow: 'Gallery',
    gallery_h1: 'Metaphile work archive.',
    filter_label: 'Filter the archive',
    clear_all: 'Clear all',
    no_results: 'No projects match the current search and filters.',
    no_results_hint:
      'Try a broader keyword, another category, or clear the active hashtags.',
    clear_filters: 'Clear all filters',
    view_all_results: 'View all results for',
    search_for: 'Search gallery for',
    plus_more: 'more',

    // ── ProjectDetailPage ─────────────────────────────────
    back_to_gallery: 'Back to Gallery',
    home: 'Home',
    background: 'Background',
    concept: 'Concept',
    approach_outcomes: 'Approach & Outcomes',
    project_gallery: 'Project Gallery',
    similar_projects: 'Similar Projects',
    similar_projects_desc:
      'These projects are ranked by the same category first, then by overlapping hashtags, so the mini directory stays relevant to the page you are viewing.',
    outcomes_heading: 'A more detailed documentation page for each work item.',

    // 404
    not_found_title: '404',
    not_found_message: 'The page you are looking for does not exist.',
    return_to_gallery: 'Return to Gallery',
    project_not_found_title: 'Project Not Found',
    project_not_found_message:
      'The project you are looking for does not exist or has been removed.',

    // ── Footer ────────────────────────────────────────────
    footer_tagline: 'Gallery page for Metaphile work, linked back to Home and Contact.',
    copyright_prefix: '©',
    copyright_suffix: 'All rights reserved.',
  },

  zh: {
    // ── Header ────────────────────────────────────────────
    nav_home: '主頁',
    nav_gallery: '作品集',
    nav_contact: '聯絡',
    search_placeholder: '搜尋項目',
    aria_lang_toggle: '切換至中文',
    aria_theme_toggle_light: '切換至淺色模式',
    aria_theme_toggle_dark: '切換至深色模式',
    instagram_label: 'Instagram',
    mobile_menu_label: '選單',

    // ── PortfolioGallery ──────────────────────────────────
    gallery_eyebrow: '作品集',
    gallery_h1: 'Metaphile 作品總覽',
    filter_label: '篩選作品',
    clear_all: '清除全部',
    no_results: '沒有符合目前搜尋及篩選條件的項目。',
    no_results_hint: '嘗試更闊的關鍵字、另一個類別，或清除標籤篩選。',
    clear_filters: '清除所有篩選',
    view_all_results: '查看所有與',
    search_for: '在作品集搜尋',
    plus_more: '更多',

    // ── ProjectDetailPage ──────────────────────────────────
    back_to_gallery: '返回作品集',
    home: '主頁',
    background: '背景',
    concept: '理念',
    approach_outcomes: '方法與成果',
    project_gallery: '項目圖集',
    similar_projects: '相關項目',
    similar_projects_desc:
      '這些項目首先按相同類別排序，然後按重疊標籤排序，使目錄與您正在查看的頁面保持相關。',
    outcomes_heading: '每個工作項目的更詳細文檔頁面。',

    // 404
    not_found_title: '404',
    not_found_message: '您尋找的頁面不存在。',
    return_to_gallery: '返回作品集',
    project_not_found_title: '項目不存在',
    project_not_found_message: '您尋找的項目不存在或已被移除。',

    // ── Footer ────────────────────────────────────────────
    footer_tagline: 'Metaphile 作品展示頁面，連結回主頁及聯絡頁。',
    copyright_prefix: '©',
    copyright_suffix: '保留所有權利。',
  },
};
