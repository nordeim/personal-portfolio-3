# The Engineered Soul — Nicholas Yun Portfolio (v2.0)

## Project Overview
This is a high-end personal portfolio designed as an "Avant-Garde Digital Installation." It balances **Tactile Brutalism** (mathematical rigor, visible structure, 1px borders) with **High-End Editorial** (serif typography, extreme whitespace, cinematic motion).

- **Tech Stack**: React 19, TypeScript 6, Vite 6, Tailwind CSS 4.
- **Aesthetic**: "Post-AI Authenticity" — rejecting generic web patterns in favor of bespoke, mathematically grounded design.
- **Key Concepts**: 28px Global Grid, Kinetic Typography (weight varies by scroll velocity), Machine Mode (MX), and Asymmetric Bento Layouts.

---

## Core Mandates

### 1. Aesthetic Integrity (Anti-Generic)
- **Grid Discipline**: Every element must align to the **28px** mathematical rhythm defined in `src/styles/index.css`.
- **Brutalist Enforcement**: Use `border-radius: 0px` for all elements. Sharp corners are non-negotiable.
- **Typography Hierarchy**:
  - **Editorial**: *Cormorant Garamond* (Kinetic headlines, serif).
  - **Utility**: *IBM Plex Mono* (Labels, metadata, technical data).
  - **Body**: *Inter* (Legibility).
- **Tactile Texture**: Maintain the CSS noise/grain overlay for an "analog" feel.

### 2. Technical Standards
- **TypeScript Strictness**: 
  - `erasableSyntaxOnly: true` (No `enum`, no `namespace`).
  - No `any` — use `unknown` or proper interfaces.
  - Interfaces are preferred over types (except for unions/intersections).
- **Component Architecture**: 
  - Use the "Thin Orchestrator" pattern in `App.tsx`.
  - UI primitives live in `src/components`.
  - Interaction logic is encapsulated in `src/hooks`.
- **Routing**: Hash-based routing (`#collection/slug`, `#portfolio/slug`) handled via `useRouteHash.ts`.

### 3. Accessibility & Performance
- **WCAG AAA**: Maintain high contrast, focus-visible outlines, and semantic HTML.
- **Motion**: Always respect `prefers-reduced-motion`.
- **Lighthouse**: Target 95+ scores for Performance and Accessibility.

---

## Workspace Map

- `src/components/`: Modular UI units (HeroKinetic, AboutFlow, ArchiveSpread).
- `src/content/`: Markdown sources for portfolio and collections.
- `src/hooks/`: Custom hooks for scroll-weighted motion and routing.
- `src/lib/`: Type definitions, data sources, and content ingestion logic.
- `src/styles/`: Tailwind 4 theme and global design system orchestration.

---

## Building & Development

### Key Commands
- **Install**: `pnpm install`
- **Dev**: `pnpm dev`
- **Type Check**: `pnpm typecheck` (Mandatory before any code changes)
- **Build**: `pnpm build`

### Content Management
- Portfolio and Archive items are ingested from `.md` files in `src/content/`.
- Frontmatter is parsed in `src/lib/content.ts`.
- Images should be placed in `public/` or `src/content/` as specified in the [Media Placement Guide](./docs/Media_Content_Placement_Guide.md).

---

## Development Workflow: The Meticulous Approach
Follow the six-phase cycle for every task:
1. **Analyze**: Deep requirement mining.
2. **Plan**: Structured roadmap with checklists.
3. **Validate**: Confirmation checkpoint with the user.
4. **Implement**: Modular, tested builds.
5. **Verify**: Rigorous QA (Accessibility, Performance, Aesthetic).
6. **Deliver**: Complete handoff.

*"Engineering the soul, one pixel at a time."*
