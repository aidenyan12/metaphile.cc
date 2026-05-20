import React from 'react';
import { Link } from 'react-router-dom';
import { useGalleryTranslation } from '@/hooks/useGalleryTranslation.js';

const Footer = () => {
  const { t } = useGalleryTranslation();

  return (
    <footer className="mt-auto border-t border-border bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <a href="/" className="font-sora text-xl font-bold tracking-tight text-foreground">
              METAPHILE
            </a>
            <p className="text-sm text-muted-foreground">
              {t('footer_tagline')}
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            <a href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {t('nav_home')}
            </a>
            <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {t('nav_gallery')}
            </Link>
            <a href="/contact/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {t('nav_contact')}
            </a>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            {t('copyright_prefix')} {new Date().getFullYear()} Metaphile. {t('copyright_suffix')}
          </p>
          <div className="flex gap-4">
            <a href="/" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              {t('nav_home')}
            </a>
            <Link to="/" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              {t('nav_gallery')}
            </Link>
            <a href="/contact/" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              {t('nav_contact')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
