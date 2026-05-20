import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Helmet } from 'react-helmet';
import { Link, useSearchParams } from 'react-router-dom';
import { projects, categories, allHashtags } from '@/data/projects.js';
import { useGalleryTranslation } from '@/hooks/useGalleryTranslation.js';

const PortfolioGallery = () => {
  const { t, lang } = useGalleryTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeHashtags, setActiveHashtags] = useState([]);

  const searchQuery = (searchParams.get('q') || '').trim();
  const normalizedQuery = searchQuery.toLowerCase();

  const toggleHashtag = (tag) => {
    setActiveHashtags((prev) =>
      prev.includes(tag)
        ? prev.filter((item) => item !== tag)
        : [...prev, tag]
    );
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
      const matchesHashtags = activeHashtags.length === 0 || activeHashtags.every((tag) => project.hashtags.includes(tag));
      const haystack = [
        project.title,
        project.category,
        project.description,
        ...(project.hashtags || []),
        ...(project.focus || []),
        project.client,
        project.location,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);

      return matchesCategory && matchesHashtags && matchesQuery;
    });
  }, [activeCategory, activeHashtags, normalizedQuery]);

  const clearAllFilters = () => {
    setActiveCategory('All');
    setActiveHashtags([]);
    setSearchParams({});
  };

  return (
    <>
      <Helmet>
        <title>Metaphile Gallery</title>
        <meta
          name="description"
          content="Explore Metaphile projects spanning cultural intelligence, education technology, and research data aesthetics."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <section className="border-b border-border bg-background px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground"
            >
              {t('gallery_eyebrow')}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mb-6 max-w-4xl text-5xl font-bold leading-[0.94] text-foreground md:text-6xl lg:text-7xl"
              style={{ letterSpacing: '-0.04em' }}
            >
              {t('gallery_h1')}
            </motion.h1>
            {searchQuery && (
              <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="rounded-full border border-border px-4 py-2">
                  {t('search_for')}: "{searchQuery}"
                </span>
              </div>
            )}
          </div>
        </section>

        <section className="sticky top-[5.8rem] z-40 border-b border-border bg-background/92 px-4 py-8 backdrop-blur-xl sm:top-[6.6rem] sm:px-6 lg:px-8 lg:top-[7.2rem]">
          <div className="mx-auto flex max-w-7xl flex-col gap-8">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">{t('filter_label')}</p>
              {(activeCategory !== 'All' || activeHashtags.length > 0 || searchQuery) && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t('clear_all')}
                </button>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-6 py-2.5 text-sm font-medium transition-all duration-200 md:text-base ${
                    activeCategory === category
                      ? 'scale-105 border-foreground bg-foreground text-background shadow-md'
                      : 'border-border bg-muted text-muted-foreground hover:border-foreground/30 hover:text-foreground'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-2">
              {allHashtags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleHashtag(tag)}
                  className={`hashtag ${activeHashtags.includes(tag) ? 'active' : ''}`}
                  aria-label={`Filter by #${tag}`}
                  aria-pressed={activeHashtags.includes(tag)}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio-grid" className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${activeHashtags.join(',')}-${searchQuery}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="h-full"
                  >
                    <Link
                      to={`/project/${project.id}`}
                      className="card-hover group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border/70 bg-card shadow-sm"
                    >
                      <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-muted">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                      </div>

                      <div className="flex flex-grow flex-col p-6">
                        <div className="mb-4">
                          <Badge variant="secondary" className="line-clamp-1 border border-border bg-muted text-xs font-medium text-muted-foreground" title={project.category}>
                            {project.category}
                          </Badge>
                        </div>
                        <h3 className="mb-3 text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-foreground/80">
                          {project.title}
                        </h3>
                        <p className="mb-6 flex-grow line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                          {project.description}
                        </p>

                        <div className="mt-auto flex flex-wrap gap-2 border-t border-border/60 pt-4">
                          {project.hashtags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-xs font-medium text-muted-foreground">
                              #{tag}
                            </span>
                          ))}
                          {project.hashtags.length > 3 && (
                            <span className="text-xs font-medium text-muted-foreground">
                              +{project.hashtags.length - 3} {t('plus_more')}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 rounded-[1.75rem] border border-dashed border-border bg-muted/30 py-24 text-center"
              >
                <p className="mb-3 text-lg text-muted-foreground">{t('no_results')}</p>
                <p className="mb-6 text-sm text-muted-foreground">{t('no_results_hint')}</p>
                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:opacity-90"
                >
                  {t('clear_filters')}
                </button>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default PortfolioGallery;
