/* ============================================================
   The Engineered Soul — Static Data
   Hero slides, about pillars, social links, collection definitions.
   ============================================================ */

import type {
  HeroSlide,
  AboutPillar,
  SocialLink,
  Collection,
} from './types';

// ============================================================
// Hero Slides
// ============================================================

export const heroSlides: HeroSlide[] = [
  {
    label: 'Creative Technologist',
    portraitKey: 'nicholas-yun',
    headline: 'Ideas, made tangible.',
    subtitle: 'Code. Design. Words. Images. Experiments.',
    artifactTitle: 'Idea → Interface → Feeling',
    artifactMeta: 'Code / Design / Words',
    signature: 'Nicholas Yun',
    accent: '#2457ff',
    secondaryAccent: '#8f55ff',
    tags: ['Engineering', 'Empathy', 'Intent'],
  },
  {
    label: 'Editorial Soul',
    portraitKey: 'creative-technologist',
    headline: 'Words with weight.',
    subtitle: 'Poetry. Prose. The slow craft of language.',
    artifactTitle: 'Silence → Sentence → Sound',
    artifactMeta: 'Poetry / Prose / Voice',
    signature: 'NY',
    accent: '#8f55ff',
    secondaryAccent: '#e5488b',
    tags: ['Lyrical', 'Restrained', 'Patient'],
  },
  {
    label: 'Visual Builder',
    portraitKey: 'project-archive',
    headline: 'A workshop, not a feed.',
    subtitle: 'Photography. Type. Studies in light and matter.',
    artifactTitle: 'Light → Material → Frame',
    artifactMeta: 'Photography / Art / Studies',
    signature: 'NY',
    accent: '#f2b705',
    secondaryAccent: '#ff5c35',
    tags: ['Atmospheric', 'Tactile', 'Slow'],
  },
];

// ============================================================
// About Pillars
// ============================================================

export const aboutPillars: AboutPillar[] = [
  {
    title: 'A Multidisciplinary Soul',
    paragraphs: [
      'I live at the seam of disciplines — code that breathes, language that lands, images that carry weight. Each discipline informs the others; the seams are where the work happens.',
      'I am not a generalist by default. I am a generalist by design — refusing to let any single medium become a crutch that flattens the others.',
    ],
  },
  {
    title: 'Engineering as Empathy',
    paragraphs: [
      'Code is not a deliverable. It is a relationship — with the user, the future maintainer, the constraints. I write code the way I write a sentence: with intent, restraint, and a refusal to confuse complexity for depth.',
      'The best engineering decisions are felt before they are seen. They are the ones where nothing has to be explained.',
    ],
  },
  {
    title: 'Editorial Discipline',
    paragraphs: [
      'Typography is a moral act. Spacing is a moral act. The decision to leave something empty is as deliberate as the decision to fill it.',
      'I work in the lineage of editorial designers — Brodovitch, Müller-Brockmann, the Pullizer Prize — where restraint is a craft and whitespace is a structural element, not absence.',
    ],
  },
  {
    title: 'Post-AI Authenticity',
    paragraphs: [
      'I am not interested in optimizing for the algorithm. I am interested in work that could not have been made by anyone else, in any other moment.',
      'In a world of infinite synthetic output, the only defensible position is to be irreducibly specific — to refuse the easy template, the safe gradient, the generic font pairing.',
    ],
  },
];

// ============================================================
// Social Links
// ============================================================

export const socialLinks: SocialLink[] = [
  {
    label: 'Email',
    icon: 'mail',
    href: 'mailto:nicholas@example.com',
    description: 'The slowest, most direct way to reach me.',
  },
  {
    label: 'LinkedIn',
    icon: 'linkedin',
    href: 'https://linkedin.com/in/nicholas-yun',
    description: 'Professional lineage, roles, references.',
  },
  {
    label: 'Instagram',
    icon: 'instagram',
    href: 'https://instagram.com/nicholas.yun',
    description: 'Visual studies, behind the scenes, life.',
  },
  {
    label: 'GitHub',
    icon: 'github',
    href: 'https://github.com/nicholas-yun',
    description: 'Code, side projects, late-night commits.',
  },
];

// ============================================================
// Collection Definitions
// NOTE: `slug` MUST match the directory name in src/content/collections/
// ============================================================

export const collectionDefinitions: Collection[] = [
  {
    slug: 'code',
    title: 'Code',
    category: 'Software',
    accent: '#2457ff',
    description:
      'Tools, libraries, and side projects where the architecture is the argument.',
    status: 'active',
  },
  {
    slug: 'design',
    title: 'Design',
    category: 'Visual',
    accent: '#ff5c35',
    description:
      'Brand systems, type studies, posters — work that earns its weight in restraint.',
    status: 'archive',
  },
  {
    slug: 'poetry',
    title: 'Poetry',
    category: 'Words',
    accent: '#8f55ff',
    description:
      'Lyric, prose, and the slow craft of language. Each piece is a room with one window.',
    status: 'active',
  },
  {
    slug: 'photography',
    title: 'Photography',
    category: 'Lens',
    accent: '#f2b705',
    description:
      'Studies in light, matter, and the unsaid. Atmosphere over event.',
    status: 'archive',
  },
  {
    slug: 'artworks',
    title: 'Artworks',
    category: 'Studio',
    accent: '#00a77f',
    description:
      'Mixed media, studies, and small obsessions. The work that does not need a brief.',
    status: 'archive',
  },
  {
    slug: 'stories',
    title: 'Stories',
    category: 'Narrative',
    accent: '#e5488b',
    description:
      'Long-form pieces, essays, and the stories that need more than a paragraph.',
    status: 'archive',
  },
  {
    slug: 'web-experiments',
    title: 'Web Experiments',
    category: 'Lab',
    accent: '#16a3b8',
    description:
      'Tactile interfaces, generative sketches, things that exist to ask a question.',
    status: 'active',
  },
];

// ============================================================
// Build metadata (consumed by Machine Mode)
// ============================================================

export const buildMetadata = {
  version: '2.0.0',
  name: 'The Engineered Soul',
  author: 'Nicholas Yun',
  hash: 'engineered-soul',
} as const;
