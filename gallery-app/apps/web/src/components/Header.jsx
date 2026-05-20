import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Instagram, Menu, Moon, Search, Sun } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/projects.js';
import { useGalleryTranslation } from '@/hooks/useGalleryTranslation.js';

const THEME_STORAGE_KEY = 'site-theme';

const navLinkClass = (active = false) => [
  'inline-flex min-h-[42px] items-center justify-center whitespace-nowrap px-1 text-sm font-semibold transition-colors',
  active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
].join(' ');

const searchInputClass = 'h-[42px] w-full rounded-full border border-border/70 bg-background/55 px-4 pr-11 text-sm text-foreground outline-none backdrop-blur-md transition-colors placeholder:text-muted-foreground focus:border-foreground/35';
const iconButtonClass = 'inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border border-border/70 bg-background/55 text-muted-foreground backdrop-blur-md transition-colors hover:text-foreground';
const langToggleClass = 'inline-flex h-[42px] items-center justify-center rounded-full border border-border/70 bg-background/55 px-3 text-xs font-bold tracking-wide text-muted-foreground backdrop-blur-md transition-colors hover:text-foreground';

const projectSearchIndex = projects.map((project) => ({
  id: project.id,
  title: project.title,
  category: project.category,
  description: project.description,
  hashtags: project.hashtags || [],
}));

const normalizeText = (value) => String(value || '').trim().toLowerCase();

const getProjectMatchScore = (project, normalizedQuery) => {
  if (!normalizedQuery) return 0;

  const title = normalizeText(project.title);
  const category = normalizeText(project.category);
  const description = normalizeText(project.description);
  const hashtags = (project.hashtags || []).map(normalizeText);

  let score = 0;

  if (title === normalizedQuery) score += 400;
  if (title.startsWith(normalizedQuery)) score += 240;
  else if (title.includes(normalizedQuery)) score += 170;

  if (category.includes(normalizedQuery)) score += 90;
  if (description.includes(normalizedQuery)) score += 45;

  hashtags.forEach((tag) => {
    if (tag === normalizedQuery) score += 150;
    else if (tag.startsWith(normalizedQuery)) score += 110;
    else if (tag.includes(normalizedQuery)) score += 70;
  });

  return score;
};

const getProjectMatches = (query, limit = 6) => {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return [];

  return projectSearchIndex
    .map((project) => ({ project, score: getProjectMatchScore(project, normalizedQuery) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.project.title.localeCompare(b.project.title))
    .slice(0, limit)
    .map((entry) => entry.project);
};

const applyThemeToDocument = (theme) => {
  const nextTheme = theme === 'light' ? 'light' : 'dark';
  const root = document.documentElement;

  root.dataset.theme = nextTheme;
  root.classList.toggle('dark', nextTheme === 'dark');
  root.classList.toggle('light', nextTheme === 'light');
  document.body?.setAttribute('data-theme', nextTheme);

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  } catch (_) {
    // Ignore storage failures and keep the in-memory theme.
  }
};

const HeaderSearch = ({ query, setQuery, onSubmit, t }) => {
  const location = useLocation();
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const trimmedQuery = query.trim();
  const suggestions = getProjectMatches(trimmedQuery);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!containerRef.current || containerRef.current.contains(event.target)) return;
      setIsOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.search]);

  const handleChange = (event) => {
    const nextValue = event.target.value;
    setQuery(nextValue);
    setIsOpen(Boolean(nextValue.trim()));
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-[250px] lg:max-w-[250px]">
      <form onSubmit={onSubmit} className="relative w-full">
        <input
          type="search"
          value={query}
          onChange={handleChange}
          onFocus={() => {
            if (trimmedQuery) setIsOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setIsOpen(false);
          }}
          placeholder={t('search_placeholder')}
          aria-label={t('search_placeholder')}
          autoComplete="off"
          className={searchInputClass}
        />
        <button
          type="submit"
          aria-label={t('search_placeholder')}
          className="absolute right-[5px] top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-background/70 text-foreground backdrop-blur-md transition-opacity hover:opacity-85"
        >
          <Search className="h-4 w-4" />
        </button>
      </form>

      {isOpen && trimmedQuery && (
        <div className="absolute inset-x-0 top-[calc(100%+0.65rem)] z-[80] overflow-hidden rounded-[1.5rem] border border-border/80 bg-background/96 p-2 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.55)] backdrop-blur-xl">
          {suggestions.length > 0 ? (
            <div className="flex flex-col gap-1">
              {suggestions.map((project) => (
                <Link
                  key={project.id}
                  to={`/project/${project.id}`}
                  onClick={() => setIsOpen(false)}
                  className="rounded-[1.1rem] px-4 py-3 text-left transition-colors hover:bg-muted/80"
                >
                  <div className="text-sm font-semibold text-foreground">{project.title}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{project.category}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.hashtags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/85">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
              <Link
                to={`/?q=${encodeURIComponent(trimmedQuery)}`}
                onClick={() => setIsOpen(false)}
                className="rounded-[1.1rem] border border-border/70 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/70"
              >
                {t('view_all_results')} "{trimmedQuery}"
              </Link>
            </div>
          ) : (
            <Link
              to={`/?q=${encodeURIComponent(trimmedQuery)}`}
              onClick={() => setIsOpen(false)}
              className="block rounded-[1.1rem] border border-border/70 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/70"
            >
              {t('search_for')} "{trimmedQuery}"
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, lang, toggleLang } = useGalleryTranslation();
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQuery(params.get('q') || '');
  }, [location.search]);

  useEffect(() => {
    let storedTheme = 'dark';
    try {
      storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY) === 'light' ? 'light' : 'dark';
    } catch (_) {
      storedTheme = 'dark';
    }
    setTheme(storedTheme);
    applyThemeToDocument(storedTheme);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    navigate(trimmed ? `/?q=${encodeURIComponent(trimmed)}` : '/');
  };

  const toggleTheme = () => {
    setTheme((current) => {
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyThemeToDocument(nextTheme);
      return nextTheme;
    });
  };

  const onGallery = location.pathname === '/' || location.pathname.startsWith('/project/');
  const ThemeIcon = theme === 'dark' ? Sun : Moon;
  const langLabel = lang === 'en' ? '中文' : 'EN';

  return (
    <header className="fixed left-4 right-4 top-4 z-50 sm:left-6 sm:right-6 lg:left-[5vw] lg:right-[5vw] lg:top-7">
      <div className="flex items-center justify-between gap-4 rounded-[1.75rem] border border-border/80 bg-background/70 px-4 py-3 shadow-[0_18px_60px_-32px_rgba(0,0,0,0.55)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/62 sm:px-5">
        <a href="/" className="shrink-0 text-[2.1rem] font-extrabold tracking-[-0.04em] text-foreground transition-opacity hover:opacity-80 sm:text-[2.35rem] lg:text-[3.15rem]">
          METAPHILE
        </a>

        <div className="hidden flex-1 items-center justify-end gap-3 lg:flex">
          <nav className="flex items-center gap-6">
            <a href="/" className={navLinkClass(false)}>{t('nav_home')}</a>
            <Link to="/" className={navLinkClass(onGallery)}>{t('nav_gallery')}</Link>
            <a href="/contact/" className={navLinkClass(false)}>{t('nav_contact')}</a>
          </nav>
          <HeaderSearch query={query} setQuery={setQuery} onSubmit={handleSubmit} t={t} />
          <a
            href="https://www.instagram.com/meta.phile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('instagram_label')}
            className={iconButtonClass}
          >
            <Instagram className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t('aria_lang_toggle')}
            className={langToggleClass}
          >
            {langLabel}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t('aria_theme_toggle_light') : t('aria_theme_toggle_dark')}
            title={theme === 'dark' ? t('aria_theme_toggle_light') : t('aria_theme_toggle_dark')}
            className={iconButtonClass}
          >
            <ThemeIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="https://www.instagram.com/meta.phile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('instagram_label')}
            className={iconButtonClass}
          >
            <Instagram className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t('aria_lang_toggle')}
            className={langToggleClass}
          >
            {langLabel}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t('aria_theme_toggle_light') : t('aria_theme_toggle_dark')}
            title={theme === 'dark' ? t('aria_theme_toggle_light') : t('aria_theme_toggle_dark')}
            className={iconButtonClass}
          >
            <ThemeIcon className="h-4 w-4" />
          </button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={t('mobile_menu_label')} className="h-[42px] w-[42px] rounded-full border border-border/70 bg-background/55 text-foreground backdrop-blur-md hover:bg-background/70">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] border-l border-border/60 bg-background/98 px-6 pt-14 backdrop-blur-xl">
              <SheetTitle className="mb-6 text-left text-xl font-semibold text-foreground">{t('nav_gallery')}</SheetTitle>
              <div className="mb-6 max-w-none">
                <HeaderSearch query={query} setQuery={setQuery} onSubmit={handleSubmit} t={t} />
              </div>
              <nav className="flex flex-col gap-4">
                <a href="/" className="text-base font-medium text-foreground transition-colors hover:text-muted-foreground">{t('nav_home')}</a>
                <Link to="/" className="text-base font-medium text-foreground transition-colors hover:text-muted-foreground">{t('nav_gallery')}</Link>
                <a href="/contact/" className="text-base font-medium text-foreground transition-colors hover:text-muted-foreground">{t('nav_contact')}</a>
                <a
                  href="https://www.instagram.com/meta.phile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-medium text-foreground transition-colors hover:text-muted-foreground"
                >
                  {t('instagram_label')}
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
