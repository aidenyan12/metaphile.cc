import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Database, GraduationCap } from 'lucide-react';

const sections = [
  {
    id: 'cultural-intelligence',
    eyebrow: 'We offer solutions for',
    title: 'Cultural Intelligence',
    description: [
      'Digital presence and story architecture designed for resonance, not just communication.',
      'Data-led decision systems that turn complexity into visual clarity.',
      'Secure and ethical infrastructure that protects creative and intellectual assets.',
    ],
    icon: Compass,
  },
  {
    id: 'learning-design',
    title: 'Education Technology & Learning Design',
    description: [
      'AI-enhanced learning experiences that respond to curiosity as well as performance.',
      'Interactive visual learning through 3D, AR, and data storytelling.',
      'Learning analytics that surface engagement, understanding, and narrative patterns.',
    ],
    icon: GraduationCap,
  },
  {
    id: 'research-archives',
    title: 'Research, Archives & Data Aesthetics',
    description: [
      'Computational humanities pipelines for cultural collections and archives.',
      'Semantic and relational mapping that reveals hidden constellations across people, artworks, and histories.',
      'Analytic and generative visualization that transforms research into exhibitions and visual essays.',
    ],
    icon: Database,
  },
];

const ServicesPage = () => {
  return (
    <>
      <Helmet>
        <title>Metaphile Services</title>
        <meta
          name="description"
          content="Explore Metaphile services in cultural intelligence, education technology, and research data aesthetics."
        />
      </Helmet>

      <main className="min-h-screen bg-[#05050b] text-slate-50">
        <div className="relative isolate overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.32),_transparent_30%),radial-gradient(circle_at_80%_15%,_rgba(59,130,246,0.18),_transparent_22%),linear-gradient(180deg,_#05050b_0%,_#09090f_100%)]" />
          <div className="absolute left-[58%] top-24 hidden h-[34rem] w-[34rem] rounded-full border border-white/10 bg-[radial-gradient(circle,_rgba(168,85,247,0.30),_rgba(109,40,217,0.03)_60%,_transparent_72%)] blur-2xl lg:block" />
          <div className="absolute left-[64%] top-44 hidden h-64 w-64 rounded-full border border-violet-300/10 bg-violet-400/10 blur-3xl lg:block" />

          <header className="relative z-10 px-6 pb-10 pt-8 lg:px-14">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <Link to="/" className="font-sora text-3xl font-bold tracking-[-0.04em] text-violet-300 transition-opacity hover:opacity-80 md:text-5xl">
                METAPHILE
              </Link>
              <nav className="flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-200/85 lg:justify-end">
                <a href="#cultural-intelligence" className="transition-colors hover:text-violet-300">Cultural Intelligence</a>
                <a href="#learning-design" className="transition-colors hover:text-violet-300">Learning Design</a>
                <a href="#research-archives" className="transition-colors hover:text-violet-300">Research & Data</a>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-white transition hover:border-violet-300/40 hover:bg-white/15"
                >
                  Portfolio
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </nav>
            </div>
          </header>

          <section className="relative z-10 px-6 pb-24 pt-6 lg:px-14 lg:pb-28 lg:pt-10">
            <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr,1.1fr] lg:items-center">
              <div>
                <p className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-slate-300/70">
                  Digital presence with cultural depth
                </p>
                <h1 className="max-w-2xl font-sora text-5xl font-bold leading-[0.94] tracking-[-0.05em] text-white md:text-7xl lg:text-[5.5rem]">
                  Cultural intelligence for modern digital systems.
                </h1>
                <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300 md:text-xl">
                  This homepage now connects directly to your portfolio, so visitors can move from your offer and positioning into specific projects without leaving the website.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link
                    to="/portfolio"
                    className="inline-flex items-center justify-center rounded-full bg-blue-600 px-7 py-3.5 text-base font-semibold text-white shadow-[0_16px_36px_rgba(37,99,235,0.35)] transition hover:-translate-y-0.5 hover:bg-blue-500"
                  >
                    Open Portfolio
                  </Link>
                  <a
                    href="#service-sections"
                    className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-3.5 text-base font-semibold text-white/90 transition hover:border-violet-300/40 hover:text-white"
                  >
                    Explore Services
                  </a>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <article className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-300/60">Core focus</p>
                  <h2 className="mt-4 font-sora text-2xl font-semibold text-white">Story architecture</h2>
                  <p className="mt-4 leading-7 text-slate-300">
                    Adaptive content ecosystems designed around coherence, visibility, and resonance.
                  </p>
                </article>
                <article className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur md:translate-y-10">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-300/60">System layer</p>
                  <h2 className="mt-4 font-sora text-2xl font-semibold text-white">Insight infrastructure</h2>
                  <p className="mt-4 leading-7 text-slate-300">
                    Dashboards, analytics, and research interfaces that turn dense information into narrative signal.
                  </p>
                </article>
                <article className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur md:col-span-2">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-300/60">Why this merge helps</p>
                  <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-200">
                    Visitors can now move between your service overview and your work samples using the menu, page buttons, and internal links, which turns the two separate uploads into one connected site.
                  </p>
                </article>
              </div>
            </div>
          </section>
        </div>

        <section id="service-sections" className="bg-[#09090f] px-6 py-20 lg:px-14 lg:py-28">
          <div className="mx-auto flex max-w-7xl flex-col gap-16">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <article
                  key={section.id}
                  id={section.id}
                  className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.22)] lg:grid-cols-[0.8fr,1.2fr] lg:items-start lg:p-12"
                >
                  <div>
                    {section.eyebrow && (
                      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-slate-400">
                        {section.eyebrow}
                      </p>
                    )}
                    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-400/10 text-violet-300">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h2 className="font-sora text-3xl font-semibold leading-tight text-white md:text-5xl">
                      {section.title}
                    </h2>
                  </div>

                  <div className="space-y-5 text-lg leading-8 text-slate-300">
                    {section.description.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    <div className="pt-4">
                      <Link
                        to="/portfolio"
                        className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-500"
                      >
                        View related work
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
};

export default ServicesPage;
