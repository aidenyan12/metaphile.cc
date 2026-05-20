/**
 * useGalleryTranslation.js
 *
 * A lightweight i18n hook for the gallery React app.
 *
 * Usage:
 *   import { useGalleryTranslation } from '@/hooks/useGalleryTranslation';
 *   const { t, lang, setLang, toggleLang } = useGalleryTranslation();
 *
 *   // In JSX:
 *   <nav>{t('nav_home')}</nav>
 *   <button onClick={toggleLang}>{lang === 'en' ? '中文' : 'EN'}</button>
 *
 * The language preference is stored in localStorage as 'site-lang'.
 * The hook also syncs the <html lang> attribute.
 *
 * Note: this hook is NOT reactive to localStorage changes from other tabs.
 * A full implementation would listen to the 'storage' event.
 */

import { useState, useCallback, useEffect } from 'react';
import { I18N } from '@/lib/gallery-i18n.js';

const LANG_STORAGE_KEY = 'site-lang';

export function useGalleryTranslation() {
  const [lang, setLangState] = useState('en');

  // Derive the initial lang from localStorage (or default to 'en')
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LANG_STORAGE_KEY);
      if (stored === 'en' || stored === 'zh') {
        setLangState(stored);
        document.documentElement.lang = stored;
      } else {
        document.documentElement.lang = 'en';
      }
    } catch (_) {
      document.documentElement.lang = 'en';
    }
  }, []);

  const setLang = useCallback((newLang) => {
    if (newLang !== 'en' && newLang !== 'zh') return;
    setLangState(newLang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, newLang);
    } catch (_) {}
    document.documentElement.lang = newLang;
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'en' ? 'zh' : 'en');
  }, [lang, setLang]);

  /**
   * Translate a key. Falls back to the key itself if missing.
   * @param {string} key
   * @returns {string}
   */
  const t = useCallback(
    (key) => {
      const dict = I18N[lang];
      if (!dict) return key;
      return dict[key] !== undefined ? dict[key] : key;
    },
    [lang]
  );

  return { t, lang, setLang, toggleLang };
}
