---
IMPORTANT: File is read fresh for every conversation. Be brief and practical.
---

# Nicholas Yun Portfolio — The Engineered Soul (v2.0)

## Core Identity & Purpose
An avant-garde **Digital Installation** for Nicholas Yun. It balances **Tactile Brutalism** (visible structure, mono utility, 1px borders) with **High-End Editorial** (serif typography, extreme whitespace, cinematic motion) to deliver "Post-AI Authenticity."

**Tech Stack**: React 19, TypeScript 6, Vite 6, Tailwind CSS 4.

---

## Foundational Principles

### Meticulous Approach (Six-Phase Workflow)
Follow this workflow for all implementation tasks:
1. **ANALYZE**: Deep requirement mining; identify implicit needs and risks.
2. **PLAN**: Create a structured roadmap; present for confirmation.
3. **VALIDATE**: Obtain explicit user approval before writing code.
4. **IMPLEMENT**: Build modular, tested, and documented components.
5. **VERIFY**: Rigorous QA (Aesthetic, Accessibility, Performance).
6. **DELIVER**: Complete handoff with knowledge transfer.

### Anti-Generic Design Philosophy
- **Reject "AI Slop"**: Avoid generic UI patterns (purple gradients, Inter-only pairings, card grids).
- **Mathematical Rigor**: Every element must align with the **28px global grid**.
- **Brutalist Enforcement**: `border-radius: 0px` is absolute. Use `rounded-none`.
- **Tactile Texture**: Maintain the CSS noise/grain overlay for an analog feel.

---

## Implementation Standards

### TypeScript & React
- **Strict Mode**: `erasableSyntaxOnly: true` is enabled. **Do not use `enum` or `namespace`**.
- **No `any`**: Use `unknown` or specific interfaces.
- **Component Pattern**: Use the "Thin Orchestrator" pattern in `App.tsx`. Max prop drilling depth is 2.
- **Key Stability**: Use stable, unique keys (e.g., `` `para-${index}` ``). Avoid array indices for dynamic lists.

### Styling (Tailwind v4)
- **CSS-First Config**: All tokens live in `src/styles/index.css` via `@theme`. **No `tailwind.config.js`**.
- **Typography Hierarchy**:
  - **Editorial**: *Cormorant Garamond* (Kinetic headlines).
  - **Utility**: *IBM Plex Mono* (Metadata, system labels).
  - **Body**: *Inter*.

### Motion & Interaction
- **Kinetic Typography**: Weight fluctuates based on scroll velocity via `useWeightedScroll.ts`.
- **Accessibility**: All animations **must** check `useReducedMotion.ts`. Baseline is WCAG AAA.

---

## Development Workflow

### Build Commands
| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start Vite development server |
| `pnpm build` | Production build (compiles TS + Vite) |
| `pnpm typecheck` | **Mandatory** strict type check before any change |
| `pnpm preview` | Preview production build |
| `node scripts/verify-content.test.js` | TDD content ingestion audit |

### File Organization
- `/src/components`: UI primitives and installations (16 files).
- `/src/hooks`: Interaction logic and system state (3 files).
- `/src/lib`: Data structures, types, and ingestion (`import.meta.glob`).
- `/src/content`: Markdown sources and assets (all content inside `collections/` or `portfolio/`).
- `/src/styles`: Design system and global CSS.

---

## Project-Specific Standards

### Routing
Uses custom hash-based routing (`#collection/slug`, `#portfolio/slug`) via `useRouteHash.ts`. **Do not install external router libraries**.

### Content Ingestion
Content is ingested via `import.meta.glob` in `src/lib/content.ts`. To add content:
1. Place `.md` files in `src/content/collections/[slug]/` or `src/content/portfolio/`.
2. Ensure sibling images match the filename (e.g., `work.md` + `work.jpg`).
3. Run `node scripts/verify-content.test.js` to verify ingestion integrity.

**⚠️ Critical**: `import.meta.glob` paths are **relative to the calling file** (`src/lib/content.ts`). Paths must be `../content/...` (not `./content/...`). Content placed outside `collections/` or `portfolio/` at the `src/content/` root is **completely orphaned** and will never be ingested.

### Anti-Patterns to Avoid
- **Shadows**: Avoid soft, blurry shadows; use hard offsets or borders.
- **Radii**: Never use `rounded-sm`, `md`, `lg`, or `full`.
- **Libraries**: Do not add UI libraries (shadcn, Radix, Framer) for simple effects.

---

## Lessons Learned (Post-Remediation)

### Content Ingestion Path
The `import.meta.glob` call in `src/lib/content.ts` is **relative to the file that calls it** (`src/lib/content.ts`), not the project root. A path like `./content/...` (relative to `src/lib/`) would point to `src/lib/content/` (which does not exist), whereas `../content/...` correctly points to `src/content/`. This is a classic subtlety in Vite's glob semantics. We added a TDD test (`scripts/verify-content.test.js`) to catch content that falls through the cracks.

### Portrait Key ↔ Directory Name
The `heroSlides` in `src/lib/data.ts` map `portraitKey` to `src/content/portrait/[key]/`. If a directory does not match the key exactly, the site falls back to a "NY" text placeholder — which is a clear visual regression. Always run `node scripts/verify-content.test.js` after modifying `heroSlides` or the `portrait/` directory.

### `PUT_*_HERE.md` and `README.md` Filtering
`isCollectionGuideFile()` in `src/lib/content.ts` originally only filtered placeholder files (`PUT_*_HERE.md`), but `README.md` files placed in content directories for documentation were also being ingested. We extended the filter to include `README.md` (case-insensitive) to prevent these guide files from appearing as collection items.

### Top-Level Content Orphaning
When adding new content, it's a common mistake to create a directory like `src/content/[category]/` (e.g., `src/content/photography/`) rather than placing it in `src/content/collections/`. Our remediation moved these files, but it's a pattern to watch — multiple levels of nesting (`src/content/artworks/`) might look like the right place but are structurally wrong for the current `import.meta.glob` setup.

*"Engineering the soul, one pixel at a time."*
