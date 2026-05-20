const baseProjects = [
  {
    id: 1,
    title: 'Property X-Ray',
    category: 'Cultural Intelligence & Digital Transformation',
    description: 'Hong Kong real estate diagnostic platform fusing multi-source government data for radical transparency',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    hashtags: ['proptech', 'realestate', 'data', 'transparency', 'hongkong', 'analytics'],
  },
  {
    id: 2,
    title: 'Cross-Cultural Exchange Initiative',
    category: 'Cultural Intelligence & Digital Transformation',
    description: 'Digital infrastructure for international cultural collaboration',
    image: 'https://images.unsplash.com/photo-1651773765931-77ff3d75d393',
    hashtags: ['culture', 'digital', 'transformation', 'innovation', 'global'],
  },
  {
    id: 3,
    title: 'Heritage Digitization Project',
    category: 'Cultural Intelligence & Digital Transformation',
    description: 'Preserving cultural artifacts through advanced digital technologies',
    image: 'https://images.unsplash.com/flagged/photo-1564445477052-8a3787406bbf',
    hashtags: ['culture', 'digital', 'transformation', 'innovation', 'global'],
  },
  {
    id: 4,
    title: 'Inclusive Digital Ecosystems',
    category: 'Cultural Intelligence & Digital Transformation',
    description: 'Creating accessible platforms for diverse global communities',
    image: 'https://images.unsplash.com/photo-1544006658-5ed4d689eb5e',
    hashtags: ['culture', 'digital', 'transformation', 'innovation', 'global'],
  },
  {
    id: 5,
    title: 'Intercultural Communication Hub',
    category: 'Cultural Intelligence & Digital Transformation',
    description: 'Technology-enabled dialogue across cultural boundaries',
    image: 'https://images.unsplash.com/photo-1692976001563-41fa7497d81d',
    hashtags: ['culture', 'digital', 'transformation', 'innovation', 'global'],
  },
  {
    id: 6,
    title: 'Metaphile Anchor',
    category: 'Education Technology & Learning Design',
    description: 'An adaptive learning platform for learner-facing analytics, adaptive recommendations, and clearer next-step decisions',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    hashtags: ['edtech', 'adaptive', 'learning', 'analytics', 'pathways'],
  },
  {
    id: 7,
    title: 'Interactive Knowledge Visualization',
    category: 'Education Technology & Learning Design',
    description: 'Transforming complex concepts into engaging visual learning experiences',
    image: 'https://images.unsplash.com/photo-1694532409273-b26e2ce266ea',
    hashtags: ['edtech', 'learning', 'design', 'pedagogy', 'interactive'],
  },
  {
    id: 8,
    title: 'Collaborative Learning Platform',
    category: 'Education Technology & Learning Design',
    description: 'Fostering peer-to-peer education through innovative digital design',
    image: 'https://images.unsplash.com/photo-1695133139074-d0ab15d6d7da',
    hashtags: ['edtech', 'learning', 'design', 'pedagogy', 'interactive'],
  },
  {
    id: 9,
    title: 'Gamified Educational Experience',
    category: 'Education Technology & Learning Design',
    description: 'Engaging learners through interactive game-based pedagogy',
    image: 'https://images.unsplash.com/photo-1507131679781-70be42a343e7',
    hashtags: ['edtech', 'learning', 'design', 'pedagogy', 'interactive'],
  },
  {
    id: 10,
    title: 'Immersive Learning Environments',
    category: 'Education Technology & Learning Design',
    description: 'Next-generation educational spaces with interactive design principles',
    image: 'https://images.unsplash.com/photo-1576870397449-6ef1af18beb4',
    hashtags: ['edtech', 'learning', 'design', 'pedagogy', 'interactive'],
  },
  {
    id: 11,
    title: 'Data Visualization Archive',
    category: 'Research, Archives & Data Aesthetics',
    description: 'Aesthetic representation of complex research datasets',
    image: 'https://images.unsplash.com/photo-1596774419796-0318e0ab4ba1',
    hashtags: ['research', 'data', 'archives', 'visualization', 'aesthetics'],
  },
  {
    id: 12,
    title: 'Digital Archives Repository',
    category: 'Research, Archives & Data Aesthetics',
    description: 'Curated collection of historical research materials with elegant interface',
    image: 'https://images.unsplash.com/photo-1675023112817-52b789fd2ef0',
    hashtags: ['research', 'data', 'archives', 'visualization', 'aesthetics'],
  },
  {
    id: 13,
    title: 'Research Data Storytelling',
    category: 'Research, Archives & Data Aesthetics',
    description: 'Transforming academic findings into compelling visual narratives',
    image: 'https://images.unsplash.com/photo-1516383274235-5f42d6c6426d',
    hashtags: ['research', 'data', 'archives', 'visualization', 'aesthetics'],
  },
  {
    id: 14,
    title: 'Scholarly Knowledge Graph',
    category: 'Research, Archives & Data Aesthetics',
    description: 'Interactive mapping of research connections and academic relationships',
    image: 'https://images.unsplash.com/photo-1686061593213-98dad7c599b9',
    hashtags: ['research', 'data', 'archives', 'visualization', 'aesthetics'],
  },
  {
    id: 15,
    title: 'Historical Data Aesthetics',
    category: 'Research, Archives & Data Aesthetics',
    description: 'Beautiful visualization of archival research and temporal patterns',
    image: 'https://images.unsplash.com/photo-1548230445-ca4ebd9755a8',
    hashtags: ['research', 'data', 'archives', 'visualization', 'aesthetics'],
  },
];

const categoryProfiles = {
  'Cultural Intelligence & Digital Transformation': {
    clientLabel: 'Collaborating Institutions',
    client(index) {
      const clients = [
        'Metaphile Studio with regional cultural partners',
        'Independent cultural institutions and civic collaborators',
        'Cross-border creative and archival networks',
      ];
      return clients[index % clients.length];
    },
    type: 'Strategy, platform and story systems',
    scope: 'Research, content design, interface systems, implementation guidance',
    location: 'Hong Kong, Asia-Pacific and distributed collaboration teams',
    quote: 'A cultural interface should hold complexity without flattening the stories it carries.',
    focus: ['Narrative systems', 'Cross-cultural access', 'Digital infrastructure'],
    visuals: [
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f',
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952',
    ],
    background(project) {
      return [
        `${project.title} began as a response to the need for a more legible digital environment around ${project.description.toLowerCase()}. The brief called for a system that could carry multiple voices, geographies, and timelines without collapsing them into a single flat interface.`,
        'The work therefore focused on building a strong editorial structure first: what should be foregrounded, what should remain discoverable, and how visual rhythm could support clarity across many types of content and contributors.',
      ];
    },
    concept(project) {
      return [
        `The proposal for ${project.title} frames the interface as an evolving cultural document. Typography, spacing, and image sequencing are treated not just as decoration, but as tools for pacing meaning and helping audiences navigate layered material.`,
        'This led to a design language that balances calm editorial hierarchy with moments of visual emphasis, allowing research, storytelling, and public-facing communication to coexist in a single coherent system.',
      ];
    },
    outcomes(project) {
      return [
        `A clearer public-facing narrative for ${project.title}`,
        'A modular visual system that can scale across campaigns, archives, and partner updates',
        'A stronger bridge between strategic positioning and day-to-day content publishing',
      ];
    },
  },
  'Education Technology & Learning Design': {
    clientLabel: 'Learning Partners',
    client(index) {
      const clients = [
        'Metaphile with universities and independent educators',
        'Curriculum designers and technology teams',
        'Learning labs, museums, and public education partners',
      ];
      return clients[index % clients.length];
    },
    type: 'Learning experience and product design',
    scope: 'Curriculum translation, experience design, interaction prototyping, visual direction',
    location: 'Hybrid classrooms, digital products, and blended learning environments',
    quote: 'Learning interfaces work best when curiosity feels spatial, visual, and alive.',
    focus: ['Learning journeys', 'Interaction design', 'Interpretive clarity'],
    visuals: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
      'https://images.unsplash.com/photo-1455390582262-044cdead277a',
      'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
    ],
    background(project) {
      return [
        `${project.title} was developed to turn a complex learning objective into a structured but inviting experience. Instead of treating educational material as static content, the project considers pacing, interaction, and visual hierarchy as core teaching tools.`,
        'The challenge was to design a system that could work for different levels of confidence and prior knowledge while still feeling precise, contemporary, and memorable.',
      ];
    },
    concept(project) {
      return [
        `For ${project.title}, the design approach borrows from editorial case-study layouts and exhibition graphics: strong titles, carefully paced text blocks, and images that feel integral to comprehension rather than separate from it.`,
        'The resulting structure supports layered reading. Users can scan quickly, pause on visuals, or move deeper into the details without losing their place in the overall learning narrative.',
      ];
    },
    outcomes(project) {
      return [
        `A more legible and immersive presentation for ${project.title}`,
        'A reusable visual framework for future modules and updates',
        'A clearer relationship between content depth, interaction, and learner confidence',
      ];
    },
  },
  'Research, Archives & Data Aesthetics': {
    clientLabel: 'Research Collaboration',
    client(index) {
      const clients = [
        'Metaphile with archivists and research teams',
        'Independent scholars, curators, and collections managers',
        'Public-facing research and cultural interpretation partners',
      ];
      return clients[index % clients.length];
    },
    type: 'Research communication and archive interface design',
    scope: 'Data interpretation, narrative framing, interface design, visual systems',
    location: 'Archives, digital collections, and research-facing public platforms',
    quote: 'Research becomes more public when evidence, interface, and atmosphere work together.',
    focus: ['Archive storytelling', 'Visual interpretation', 'Public research access'],
    visuals: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
      'https://images.unsplash.com/photo-1455390582262-044cdead277a',
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6',
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353',
    ],
    background(project) {
      return [
        `${project.title} addresses the recurring gap between rich research material and public-facing comprehension. The project started with the question of how evidence, annotations, and visual material might be arranged so that expertise remains visible without becoming opaque.`,
        'Rather than simplifying the content too aggressively, the work organizes density through rhythm: captions, section breaks, metadata, and imagery all work together to guide attention and maintain trust in the material.',
      ];
    },
    concept(project) {
      return [
        `The concept for ${project.title} draws from exhibition catalogues and archival reading rooms. Key information is framed as a sequence of encounters: overview, context, concept, and visual evidence.`,
        'This creates a project page that feels closer to a documented research artifact than a standard marketing case study, while still remaining accessible to broader audiences.',
      ];
    },
    outcomes(project) {
      return [
        `A stronger visual narrative for ${project.title}`,
        'A modular page structure that can accommodate future research assets and deeper documentation',
        'A clearer public-facing bridge between data, archival context, and interpretation',
      ];
    },
  },
};

const rotateFromPool = (pool, start, count) => Array.from({ length: count }, (_, index) => pool[(start + index) % pool.length]);

const uniqueImages = (images) => images.filter((image, index) => images.indexOf(image) === index);

const buildProject = (project, index) => {
  const profile = categoryProfiles[project.category];
  const year = 2021 + (index % 5);
  const galleryImages = uniqueImages([project.image, ...rotateFromPool(profile.visuals, index % profile.visuals.length, 4)]).slice(0, 5);

  const baseProject = {
    ...project,
    year,
    client: profile.client(index),
    type: profile.type,
    scope: profile.scope,
    location: profile.location,
    quote: profile.quote,
    focus: profile.focus,
    background: profile.background(project),
    concept: profile.concept(project),
    outcomes: profile.outcomes(project),
    galleryImages,
    facts: [
      { label: profile.clientLabel, value: profile.client(index) },
      { label: 'Type', value: profile.type },
      { label: 'Scope', value: profile.scope },
      { label: 'Location', value: profile.location },
      { label: 'Year', value: String(year) },
      { label: 'Focus', value: profile.focus.join(', ') },
    ],
  };

  if (project.id === 1) {
    return {
      ...baseProject,
      client: 'Metaphile',
      type: 'PropTech diagnostic platform',
      scope: 'Government data fusion, property risk analysis, bilingual public-facing transparency tool',
      location: 'Hong Kong — served at search.metaphile.cc',
      quote: 'A property should be understood through evidence, not intuition. X-Ray connects every claim to its government source.',
      focus: ['Data provenance', 'Government data fusion', 'Bilingual accessibility'],
      background: [
        'Property X-Ray was built to address a persistent problem in Hong Kong real estate: fragmented government data that buyers and renters struggle to assemble into a coherent picture. Information about building safety, water quality, flood risk, land use, and personal data compliance is scattered across five different government departments — BD, WSD, HKO, RVD, and DPO.',
        'The platform fuses these sources into a single diagnostic view for any Hong Kong property. Every data point is cited to its originating department, making the audit trail visible. The system is designed with radical data provenance: no claim appears without a source, and simulated data is clearly labeled as such.'
      ],
      concept: [
        'Property X-Ray frames property research as a diagnostic exercise rather than a listing browser. The interface presents a layered report: structural safety indicators from BD, water interruption history from WSD, flood and storm risk from HKO, land use and valuation context from RVD, and privacy compliance notes from DPO.',
        'The bilingual EN/ZH interface ensures accessibility for both local and international users. Address parsing is tuned for Hong Kong\'s unique format — supporting Chinese addresses, English addresses, and Google Maps URL extraction — so the system meets users where they are.'
      ],
      outcomes: [
        'A single-view diagnostic report fusing five Hong Kong government data sources',
        'Cited data provenance — every claim traceable to its government source',
        'Bilingual EN/ZH interface with HK-specific address parsing',
        'Live deployment at search.metaphile.cc serving as a public transparency tool'
      ],
      facts: [
        { label: 'Product', value: 'Property X-Ray' },
        { label: 'Type', value: 'PropTech diagnostic platform' },
        { label: 'Scope', value: 'Government data fusion, property risk analysis, bilingual transparency tool' },
        { label: 'Website', value: 'search.metaphile.cc', url: 'https://search.metaphile.cc/' },
        { label: 'Year', value: String(year) },
        { label: 'Focus', value: 'Data provenance, government data fusion, bilingual accessibility' },
      ],
    };
  }

  if (project.id === 6) {
    return {
      ...baseProject,
      client: 'Metaphile',
      type: 'Adaptive learning platform',
      scope: 'Product strategy, adaptive recommendations, learner analytics, narrative progress design',
      location: 'Web platform for learner-facing guidance and career-oriented learning journeys',
      quote: 'Anchor turns learning analytics into a clear story of where a learner is now, what direction is plausible next, and what path can bridge the gap.',
      focus: ['Adaptive pathways', 'Learner analytics', 'Narrative records'],
      background: [
        'Metaphile Anchor was developed as a learner-facing hub inside the broader Metaphile ecosystem. The project responds to a practical challenge: learners often have fragmented records, unclear direction, and too little support when translating learning activity into coherent next steps.',
        'Instead of presenting analytics as a flat dashboard, Anchor reframes progress as an evolving narrative. This makes it easier for learners to understand their current position, identify realistic directions, and see how learning can support longer-term career movement.'
      ],
      concept: [
        'The platform combines story architecture, data-led decision support, and adaptive learning logic. Product structure, interface hierarchy, and recommendation flows are designed to feel advisory rather than overwhelming, so the experience remains legible even when the underlying data becomes complex.',
        'Anchor therefore behaves less like a static portal and more like a guidance layer: it surfaces adaptive roadmaps, learner-centric intelligence panels, and narrative records of progress that help users make better decisions with confidence.'
      ],
      outcomes: [
        'A clearer introduction to Metaphile Anchor as an adaptive learning platform',
        'A learner-centric interface for progress tracking, recommendations, and next-step guidance',
        'A stronger bridge between learning analytics, story-led interpretation, and career-oriented decision making'
      ],
      facts: [
        { label: 'Product', value: 'Metaphile Anchor' },
        { label: 'Type', value: 'Adaptive learning platform' },
        { label: 'Scope', value: 'Product strategy, adaptive recommendations, learner analytics, narrative progress design' },
        { label: 'Website', value: 'anchor.metaphile.cc', url: 'https://anchor.metaphile.cc/' },
        { label: 'Year', value: String(year) },
        { label: 'Focus', value: 'Adaptive pathways, learner analytics, narrative records' },
      ],
    };
  }

  return baseProject;
};

export const projects = baseProjects.map(buildProject);

export const categories = [
  'All',
  'Cultural Intelligence & Digital Transformation',
  'Education Technology & Learning Design',
  'Research, Archives & Data Aesthetics',
];

export const allHashtags = Array.from(new Set(projects.flatMap((project) => project.hashtags))).sort();
