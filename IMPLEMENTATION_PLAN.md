# Implementation Plan: The Engineered Soul (v2.0)

## Executive Summary

This plan re-imagines the Nicholas Yun portfolio from a monolithic React + Plain CSS SPA into a **TypeScript-strict, Tailwind CSS v4-powered, component-driven Digital Installation** that balances Technical Brutalism (visible structure, mono utility, 1px borders) with High-End Editorial (serif typography, extreme whitespace, cinematic motion).

---

## Current State Analysis

### What Works
- Content ingestion system (`import.meta.glob`) is elegant and should be preserved
- Dark/light theme system works well
- Hero slideshow with pointer-tracking parallax
- About section with calm fade rotation
- Archive/collection routing and rendering
- Mobile drawer navigation

### Critical Problems
| Problem | Severity | Detail |
|---------|----------|--------|
| Monolithic CSS (4411 lines) | Critical | Multiple override layers create specificity hell; impossible to maintain |
| Monolithic JSX (1265 lines) | High | Exceeds 1000-line threshold; all logic in one file |
| No TypeScript | High | No type safety; `pnpm type check` will fail |
| No component decomposition | High | Cannot test, reuse, or reason about individual sections |
| Dead CSS from iterative overrides | Medium | Original light-theme CSS still present but fully overridden |
| No Tailwind | Medium | Skills recommend it; plain CSS at this scale is unmaintainable |

---

## Architectural Decision: Why TypeScript + Tailwind v4

1. **User requirement**: "pnpm type and build check" implies TypeScript is expected
2. **Skill guidance**: All included skills (`react19-ts6-vite8-tailwindv4-mvp`, `super-frontend-design`, `ui-styling`, `tailwind-patterns`) mandate TypeScript strict + Tailwind v4
3. **PRD v2 alignment**: The "Machine Mode" feature requires typed data structures
4. **Scale justification**: 4400+ lines of CSS proves plain CSS has failed at this scale
5. **CSS-first Tailwind v4**: Uses `@theme` directive in CSS, preserving the project's CSS-centric culture while gaining utility composability

---

## Phase 0: Project Infrastructure

**Objective**: Transform the build system from JS/npm to TS/pnpm with Tailwind v4.

### Tasks
- [ ] 0.1 Initialize pnpm (create `pnpm-workspace.yaml`, convert lockfile)
- [ ] 0.2 Add TypeScript 6.x with strict mode (`tsconfig.json` with `erasableSyntaxOnly`)
- [ ] 0.3 Upgrade Vite to v8 with `@vitejs/plugin-react`
- [ ] 0.4 Add Tailwind CSS v4 (`@tailwindcss/vite` plugin)
- [ ] 0.5 Configure path aliases (`@/components`, `@/hooks`, `@/lib`, `@/styles`)
- [ ] 0.6 Rename `src/App.jsx` → `src/App.tsx`, `src/main.jsx` → `src/main.tsx`
- [ ] 0.7 Add `index.html` update for new entry point
- [ ] 0.8 Verify `pnpm dev` runs with zero errors

### File Changes
| Action | Path |
|--------|------|
| Create | `pnpm-workspace.yaml` |
| Create | `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` |
| Modify | `vite.config.ts` (add Tailwind plugin, path aliases) |
| Modify | `package.json` (add deps, scripts: `typecheck`, `lint`) |
| Modify | `index.html` (entry → `main.tsx`) |
| Rename | `src/App.jsx` → `src/App.tsx` |
| Rename | `src/main.jsx` → `src/main.tsx` |
| Delete | `src/App.css` (replaced by Tailwind + design system CSS) |

### Verification
```bash
pnpm install && pnpm dev  # Must start without errors
```

---

## Phase 1: Design System Foundation (Tactile Canvas)

**Objective**: Establish the "math" of the site before building components.

### Design Tokens (CSS Custom Properties → Tailwind @theme)

```css
/* Brutalist Foundation */
--u: 28px;                    /* Grid unit */
--border-brutal: 1px solid;   /* All borders */
--radius-brutal: 0px;         /* No rounded corners */

/* Editorial Soul */
--font-editorial: 'Cormorant Garamond', serif;
--font-utility: 'IBM Plex Mono', monospace;
--font-body: 'Inter', system-ui, sans-serif;

/* Color System (OKLCH for perceptual uniformity) */
--ink: oklch(0.15 0.02 260);
--surface: oklch(0.98 0.005 90);
--accent-code: oklch(0.55 0.22 264);    /* #2457ff */
--accent-design: oklch(0.65 0.24 32);   /* #ff5c35 */
--accent-art: oklch(0.6 0.15 168);      /* #00a77f */
--accent-photo: oklch(0.78 0.16 88);    /* #f2b705 */
--accent-poetry: oklch(0.52 0.24 292);  /* #8f55ff */
--accent-story: oklch(0.58 0.22 340);   /* #e5488b */
```

### Tasks
- [ ] 1.1 Create `src/styles/index.css` with `@import "tailwindcss"` and `@theme` block
- [ ] 1.2 Define all design tokens as `@theme` values
- [ ] 1.3 Create `src/styles/typography.css` with kinetic type scales
- [ ] 1.4 Create `src/styles/grid.css` with 28px visible background grid
- [ ] 1.5 Create `src/styles/animations.css` with weighted motion keyframes
- [ ] 1.6 Create `src/styles/grain.css` with CSS noise overlay
- [ ] 1.7 Implement dark/light theme via `.theme-night` / `.theme-day` class
- [ ] 1.8 Load Google Fonts: Cormorant Garamond (editorial), IBM Plex Mono (utility), Inter (body)

### Typography Scale
| Class | Size | Weight | Font | Use |
|-------|------|--------|------|-----|
| `.type-kinetic-hero` | `clamp(4rem, 9vw, 9rem)` | 950 | Editorial | Hero headline |
| `.type-editorial-h2` | `clamp(2.2rem, 4.2vw, 4.5rem)` | 700 | Editorial | Section heads |
| `.type-mono-util` | `0.78rem` | 500 | Mono | Metadata, labels |
| `.type-body` | `clamp(1rem, 1.35vw, 1.22rem)` | 400 | Body | Paragraphs |

### Verification
- 28px grid visible as background pattern
- All three font families load correctly
- Design tokens resolve in both themes

---

## Phase 2: Component Architecture (Decompose Monolith)

**Objective**: Break the 1265-line App.jsx into typed, composable components.

### Directory Structure
```
src/
├── components/
│   ├── LayoutShell.tsx        # Wraps SPA, 1px perimeter borders, MX state
│   ├── Navigation.tsx         # Sticky nav with MX toggle
│   ├── BrandMark.tsx          # SVG brand mark
│   ├── SocialIcon.tsx         # Social SVG icons
│   ├── HeroKinetic.tsx        # Viewport-scaled kinetic hero
│   ├── AboutFlow.tsx          # Asymmetric editorial about
│   ├── BentoGrid.tsx          # Non-linear portfolio grid
│   ├── BentoTile.tsx          # Individual project portal
│   ├── ArchiveSpread.tsx      # Editorial spread for collections
│   ├── ArchiveItemCard.tsx    # Collection item card
│   ├── ContentBody.tsx        # Poem/prose renderer
│   ├── ContactSection.tsx     # Contact + socials
│   ├── MachineOverlay.tsx     # Technical data layer
│   ├── GrainOverlay.tsx       # CSS noise texture
│   ├── MobileDrawer.tsx       # Mobile nav drawer
│   └── ThemeToggle.tsx        # Day/night switch
├── hooks/
│   ├── useWeightedScroll.ts   # Scroll velocity + friction
│   ├── useRouteHash.ts        # Hash-based routing
│   └── useReducedMotion.ts    # Accessibility motion check
├── lib/
│   ├── content.ts             # import.meta.glob ingestion + parsing
│   ├── data.ts                # Static data (heroSlides, aboutPillars, etc.)
│   └── types.ts               # Shared TypeScript interfaces
├── styles/
│   ├── index.css              # Tailwind + @theme tokens
│   ├── typography.css         # Font orchestration
│   ├── grid.css               # Background grid
│   ├── animations.css         # Weighted motion keyframes
│   └── grain.css              # Noise overlay
├── content/                   # (preserved as-is)
├── App.tsx                    # Root component, thin orchestrator
└── main.tsx                   # React entry point
```

### TypeScript Interfaces (lib/types.ts)
```typescript
interface HeroSlide {
  label: string;
  portraitKey: string;
  headline: string;
  subtitle: string;
  artifactTitle: string;
  artifactMeta: string;
  signature: string;
  accent: string;
  secondaryAccent: string;
  tags: string[];
}

interface AboutPillar {
  title: string;
  paragraphs: string[];
}

interface Project {
  title: string;
  category: string;
  accent: string;
  medium?: string;
  status: string;
  description: string;
  link?: string;
  linkLabel: string;
  slug: string;
  image?: string;
  body?: string;
}

interface CollectionItem extends Project {
  collectionSlug: string;
  document?: string;
}

interface Collection {
  slug: string;
  title: string;
  category: string;
  accent: string;
  description: string;
  status: string;
}

interface ArchiveRoute {
  collectionSlug: string;
  itemSlug: string | null;
}
```

### Tasks
- [ ] 2.1 Create `src/lib/types.ts` with all interfaces
- [ ] 2.2 Create `src/lib/content.ts` — extract all import.meta.glob + parsing logic
- [ ] 2.3 Create `src/lib/data.ts` — extract heroSlides, aboutPillars, collectionDefinitions, etc.
- [ ] 2.4 Create `src/hooks/useRouteHash.ts` — extract hash routing
- [ ] 2.5 Create `src/hooks/useReducedMotion.ts` — motion preference detection
- [ ] 2.6 Create `src/hooks/useWeightedScroll.ts` — scroll velocity + friction calculation
- [ ] 2.7 Create `src/components/BrandMark.tsx` — SVG brand mark
- [ ] 2.8 Create `src/components/SocialIcon.tsx` — social SVG icons
- [ ] 2.9 Create `src/components/ThemeToggle.tsx` — day/night toggle
- [ ] 2.10 Create `src/components/GrainOverlay.tsx` — CSS noise layer
- [ ] 2.11 Create `src/components/LayoutShell.tsx` — perimeter borders + Machine Mode state
- [ ] 2.12 Create `src/components/Navigation.tsx` — sticky nav with MX toggle
- [ ] 2.13 Create `src/components/MobileDrawer.tsx` — mobile nav
- [ ] 2.14 Refactor `src/App.tsx` to use composed components

### Verification
```bash
pnpm typecheck  # Zero type errors
```

---

## Phase 3: Hero Installation (Kinetic Typography)

**Objective**: A strong first impression — viewport-scaled text that fluctuates in weight based on scroll.

### Design Direction
- Headline scales from `4rem` → `9rem` based on viewport
- Font-weight responds to scroll velocity (fast = thin, slow = heavy)
- Light-sheet animations preserved but refined
- Portrait slideshow preserved with brutalist frame treatment
- Accent color per slide maintained

### Component: HeroKinetic.tsx
```tsx
interface HeroKineticProps {
  slide: HeroSlide;
  portraitUrl: string;
  onPrev: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
  activeIndex: number;
  totalSlides: number;
}
```

### Tasks
- [ ] 3.1 Implement `useWeightedScroll` hook (scroll velocity → font-weight mapping)
- [ ] 3.2 Build `HeroKinetic.tsx` with viewport-scaled headline
- [ ] 3.3 Preserve pointer-tracking parallax (`--mx`, `--my`, `--dx`, `--dy` CSS vars)
- [ ] 3.4 Add brutalist portrait frame (1px border, 0px radius, inner stroke)
- [ ] 3.5 Refine light-sheet animations with `prefers-reduced-motion` support
- [ ] 3.6 Implement slide auto-rotation (10s interval, preserved)
- [ ] 3.7 Add `scroll-cue` with editorial styling
- [ ] 3.8 Add grain overlay to hero section

### Verification
- Hero headline weight responds to scroll
- All three slides cycle correctly
- Portrait images render with brutalist frame
- Reduced motion: all animations disabled

---

## Phase 4: About Flow (Asymmetric Editorial)

**Objective**: Narrating the multidisciplinary story with "calm friction" — asymmetric layout, delayed weighted fades, serif typography.

### Design Direction
- Two-column asymmetric layout (0.26fr / 0.74fr)
- Editorial serif for pillar titles (`Cormorant Garamond`)
- Mono for pillar labels (`IBM Plex Mono`)
- Calm 900ms fade-out/fade-in rotation preserved
- 1px left border as visual "spine"
- Grain overlay as "human fingerprint"

### Component: AboutFlow.tsx
```tsx
interface AboutFlowProps {
  pillars: AboutPillar[];
}
```

### Tasks
- [ ] 4.1 Build `AboutFlow.tsx` with asymmetric grid layout
- [ ] 4.2 Implement pillar navigation with 1px bordered buttons
- [ ] 4.3 Preserve calm 900ms fade transition
- [ ] 4.4 Apply serif typography to pillar titles
- [ ] 4.5 Apply mono typography to labels/metadata
- [ ] 4.6 Add grain overlay to about section
- [ ] 4.7 Ensure stable height during transitions (sizer pattern preserved)

### Verification
- Pillar transitions are calm and smooth
- Height remains stable during swaps
- Typography hierarchy is clear (serif headers, mono labels, sans body)

---

## Phase 5: Living Shelf (Non-Linear Bento Grid)

**Objective**: Presenting mixed-media work as a curated collection with category-specific visual textures.

### Design Direction
- Asymmetric Bento grid (12-column with varied spans)
- Category texture mapping:
  - **Code**: Mono font, blue accent, terminal-like card feel
  - **Design**: Sans-serif, coral accent, visual preview dominant
  - **Poetry**: Serif font, purple accent, text-first card
  - **Photography**: Image-dominant, yellow accent
  - **Art**: Image + mono caption, teal accent
  - **Storytelling**: Serif excerpt, pink accent
- 1px solid borders, 0px radius
- Accent-colored 4px top border on each tile
- Hover: subtle shadow + arrow animation

### Components
```tsx
interface BentoGridProps {
  projects: Project[];
}

interface BentoTileProps {
  project: Project;
  texture: 'mono' | 'serif' | 'sans' | 'image';
}
```

### Tasks
- [ ] 5.1 Build `BentoGrid.tsx` with 12-column asymmetric layout
- [ ] 5.2 Implement span assignments (first + last = span 6, others vary)
- [ ] 5.3 Build `BentoTile.tsx` with category texture injection
- [ ] 5.4 Add brutalist styling (1px border, 0px radius, accent top border)
- [ ] 5.5 Implement hover states (shadow + link arrow animation)
- [ ] 5.6 Create `ContentBody.tsx` for poem preview in poetry tiles
- [ ] 5.7 Ensure all project gateway links route to correct collections

### Verification
- Grid displays asymmetrically with varied tile sizes
- Each category has distinct typographic texture
- All links navigate to correct collections

---

## Phase 6: Archive (Editorial Spreads)

**Objective**: Converting simple detail pages into immersive case studies with magazine-style layouts.

### Design Direction
- Collection list: 3-column grid with image-first cards
- Item detail: two-column spread (image left, text right)
- Serif for poetry body text, mono for metadata
- 1px borders, 0px radius, accent underlines for back/live links
- Full-bleed image treatment

### Component: ArchiveSpread.tsx
```tsx
interface ArchiveSpreadProps {
  collection: Collection;
  items: CollectionItem[];
  activeItem: CollectionItem | null;
}
```

### Tasks
- [ ] 6.1 Build `ArchiveSpread.tsx` with collection header
- [ ] 6.2 Implement item list view (3-column grid)
- [ ] 6.3 Implement item detail view (two-column editorial spread)
- [ ] 6.4 Build `ArchiveItemCard.tsx` with image + metadata
- [ ] 6.5 Build `ContentBody.tsx` for poem/prose rendering
- [ ] 6.6 Add back navigation with accent border
- [ ] 6.7 Add PDF/live project links
- [ ] 6.8 Style empty state

### Verification
- Collection pages display all items
- Item detail renders full content + image
- Back navigation works correctly
- Empty collections show graceful empty state

---

## Phase 7: Machine Mode (MX Toggle + Overlay)

**Objective**: Add a "Machine Mode" that reveals raw site data, build info, and system status.

### Design Direction
- Toggle button in navigation labeled "MX" (Machine Experience)
- When active: overlays semi-transparent panel with:
  - Build version, timestamp
  - Raw JSON of current page data
  - Collection counts
  - Route information
- Uses `IBM Plex Mono` exclusively
- Dark overlay with green terminal aesthetic

### Component: MachineOverlay.tsx
```tsx
interface MachineOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    buildVersion: string;
    route: string;
    collections: Record<string, number>;
    activeData: unknown;
  };
}
```

### Tasks
- [ ] 7.1 Build `MachineOverlay.tsx` with terminal aesthetic
- [ ] 7.2 Add MX toggle button to `Navigation.tsx`
- [ ] 7.3 Lift Machine Mode state to `LayoutShell.tsx`
- [ ] 7.4 Wire data display (route, collections, active item)
- [ ] 7.5 Add keyboard shortcut (Escape to close)

### Verification
- MX toggle opens/closes overlay
- Overlay shows real data about current state
- Escape key closes overlay

---

## Phase 8: Polish & Performance

**Objective**: Ensure the Avant-Garde vision remains hyper-functional.

### Tasks
- [ ] 8.1 Implement `prefers-reduced-motion` global toggle (all animations respect it)
- [ ] 8.2 Optimize `import.meta.glob` — verify eager loading for critical paths
- [ ] 8.3 Verify WCAG AAA contrast ratios (all text against backgrounds)
- [ ] 8.4 Test responsive behavior at 360px, 430px, 620px, 760px, 900px, 1200px, 1536px
- [ ] 8.5 Run Lighthouse audit (target: Performance 95+, Accessibility 95+, Best Practices 95+)
- [ ] 8.6 Remove all dead CSS (no unused classes, no override layers)
- [ ] 8.7 Verify GitHub Pages deployment (`vite.config.ts` base path)
- [ ] 8.8 Final `pnpm typecheck && pnpm build` — zero errors, zero warnings

### Verification
```bash
pnpm typecheck && pnpm build  # Must pass with zero errors
```

---

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Tailwind v4 migration breaks existing styles | Incremental: build new system alongside, then remove old CSS |
| TypeScript strict mode reveals hidden bugs | Fix as discovered; use `unknown` over `any` |
| Font loading performance | Use `font-display: swap` + preload critical fonts |
| Lighthouse score regression | Monitor after each phase; optimize images, lazy-load below fold |
| GitHub Pages base path issues | Verify `base: './'` in vite.config.ts early |

---

## Execution Order

Phase 0 → Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6 → Phase 7 → Phase 8

Each phase must pass `pnpm typecheck` before proceeding to the next.

---

## Estimated Scope

| Phase | New Files | Modified Files | Estimated Effort |
|-------|-----------|----------------|------------------|
| 0 | 4 | 4 | Infrastructure |
| 1 | 6 | 0 | Design System |
| 2 | 16 | 1 | Architecture |
| 3 | 3 | 1 | Hero |
| 4 | 2 | 1 | About |
| 5 | 3 | 1 | Portfolio |
| 6 | 3 | 1 | Archive |
| 7 | 2 | 2 | Machine Mode |
| 8 | 0 | varies | Polish |
| **Total** | **~39** | **~11** | **Full re-architecture** |
