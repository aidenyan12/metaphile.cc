import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { projects } from '@/data/projects.js';
import { useGalleryTranslation } from '@/hooks/useGalleryTranslation.js';

const galleryLayout = [
  'col-span-12 md:col-span-7 xl:col-span-8 aspect-[5/3]',
  'col-span-12 md:col-span-5 xl:col-span-4 aspect-[4/5]',
  'col-span-12 md:col-span-5 xl:col-span-4 aspect-[4/3]',
  'col-span-12 md:col-span-7 xl:col-span-8 aspect-[16/9]',
  'col-span-12 md:col-span-6 xl:col-span-6 aspect-[5/4]',
];

const getSimilarityScore = (project, candidate) => {
  if (project.id === candidate.id) {
    return -1;
  }

  const sharedHashtags = candidate.hashtags.filter((tag) => project.hashtags.includes(tag)).length;
  const sameCategoryBonus = project.category === candidate.category ? 6 : 0;

  return sameCategoryBonus + sharedHashtags;
};

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { t } = useGalleryTranslation();

  const project = projects.find((item) => item.id === parseInt(projectId, 10));
  const similarProjects = project
    ? projects
        .map((candidate) => ({
          candidate,
          score: getSimilarityScore(project, candidate),
        }))
        .filter(({ score }) => score > 0)
        .sort((left, right) => right.score - left.score || left.candidate.id - right.candidate.id)
        .slice(0, 3)
        .map(({ candidate }) => candidate)
    : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 text-3xl font-bold">{t('project_not_found_title')}</h1>
        <p className="mb-8 text-muted-foreground">{t('project_not_found_message')}</p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          {t('return_to_gallery')}
        </button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${project.title} | Metaphile Gallery`}</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <article className="min-h-screen bg-background text-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t('back_to_gallery')}
          </Link>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <Home className="h-4 w-4" />
            {t('home')}
          </a>
        </div>

        <div className="relative h-[52vh] min-h-[24rem] w-full overflow-hidden bg-muted lg:h-[72vh]">
          <motion.img
            initial={{ scale: 1.04, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            src={project.galleryImages[0]}
            alt={project.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 lg:px-8 lg:pt-16">
          <div className="border-b border-border pb-12 lg:grid lg:grid-cols-[1.25fr,0.75fr] lg:gap-14">
            <div>
              <div className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
                {project.category}
              </div>
              <h1 className="max-w-4xl font-sora text-4xl font-semibold leading-[0.94] tracking-[-0.04em] text-foreground md:text-6xl lg:text-[4.5rem]">
                {project.title}
              </h1>
              <p className="mt-8 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">
                {project.description}
              </p>
            </div>

            <div className="mt-12 border-t border-border pt-8 lg:mt-0 lg:border-t-0 lg:pt-1">
              <div className="space-y-7">
                {project.facts.map((fact) => (
                  <div key={fact.label} className="grid gap-2 border-b border-border pb-5">
                    <div className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                      {fact.label}
                    </div>
                    <div className="text-base leading-7 text-foreground md:text-lg">
                      {fact.url ? (
                        <a href={fact.url} target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-4 transition-colors hover:text-muted-foreground">
                          {fact.value}
                        </a>
                      ) : (
                        fact.value
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center border-b border-border py-12 text-center lg:py-16">
            <div className="max-w-4xl font-sora text-2xl font-medium leading-relaxed tracking-[-0.02em] text-foreground md:text-4xl">
              "{project.quote}"
            </div>
          </div>

          <div className="border-b border-border py-12 lg:py-16">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <section>
                <div className="mb-5 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                  {t('background')}
                </div>
                <div className="space-y-5 text-base leading-8 text-muted-foreground md:text-lg">
                  {project.background.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>

              <section>
                <div className="mb-5 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                  {t('concept')}
                </div>
                <div className="space-y-5 text-base leading-8 text-muted-foreground md:text-lg">
                  {project.concept.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <div className="py-12 lg:py-16">
            <div className="mb-8 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
              {t('project_gallery')}
            </div>
            <div className="grid grid-cols-12 gap-4 md:gap-5 lg:gap-6">
              {project.galleryImages.map((image, index) => (
                <figure
                  key={`${project.id}-${image}`}
                  className={`${galleryLayout[index % galleryLayout.length]} overflow-hidden bg-muted`}
                >
                  <img src={image} alt={`${project.title} visual ${index + 1}`} className="h-full w-full object-cover" />
                </figure>
              ))}
            </div>
          </div>

          <div className="border-y border-border py-12 lg:py-16">
            <div className="grid gap-12 lg:grid-cols-[0.8fr,1.2fr] lg:gap-16">
              <div>
                <div className="mb-5 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                  {t('approach_outcomes')}
                </div>
                <h2 className="font-sora text-3xl font-semibold leading-tight tracking-[-0.03em] text-foreground md:text-4xl">
                  {t('outcomes_heading')}
                </h2>
              </div>

              <div>
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border border-border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <ul className="space-y-4 text-base leading-8 text-muted-foreground md:text-lg">
                  {project.outcomes.map((outcome) => (
                    <li key={outcome} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {similarProjects.length > 0 && (
            <div className="py-12 lg:py-16">
              <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                    {t('similar_projects')}
                  </div>
                  <h2 className="font-sora text-3xl font-semibold leading-tight tracking-[-0.03em] text-foreground md:text-4xl">
                    {t('similar_projects_desc')}
                  </h2>
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {similarProjects.map((item) => {
                  const sharedTags = item.hashtags.filter((tag) => project.hashtags.includes(tag));

                  return (
                    <Link
                      key={item.id}
                      to={`/project/${item.id}`}
                      className="group block border-t border-border pt-5 transition-opacity hover:opacity-90"
                    >
                      <div className="overflow-hidden bg-muted">
                        <img
                          src={item.galleryImages[0]}
                          alt={item.title}
                          className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="mt-5">
                        <div className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                          {item.category}
                        </div>
                        <h3 className="mt-3 font-sora text-2xl font-semibold leading-tight tracking-[-0.02em] text-foreground">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
                          {item.description}
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {sharedTags.slice(0, 3).map((tag) => (
                            <span
                              key={`${item.id}-${tag}`}
                              className="inline-flex items-center rounded-full border border-border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
};

export default ProjectDetailPage;
