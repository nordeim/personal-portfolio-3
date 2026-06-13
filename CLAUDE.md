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

### File Organization
- `/src/components`: UI primitives and installations.
- `/src/hooks`: Interaction logic and system state.
- `/src/lib`: Data structures, types, and ingestion (`import.meta.glob`).
- `/src/content`: Markdown sources and assets.
- `/src/styles`: Design system and global CSS.

---

## Project-Specific Standards

### Routing
Uses custom hash-based routing (`#collection/slug`, `#portfolio/slug`) via `useRouteHash.ts`. **Do not install external router libraries**.

### Content Ingestion
Content is ingested via `import.meta.glob` in `src/lib/content.ts`. To add content:
1. Place `.md` files in `src/content/`.
2. Ensure sibling images match the filename (e.g., `work.md` + `work.jpg`).

### Anti-Patterns to Avoid
- **Shadows**: Avoid soft, blurry shadows; use hard offsets or borders.
- **Radii**: Never use `rounded-sm`, `md`, `lg`, or `full`.
- **Libraries**: Do not add UI libraries (shadcn, Radix, Framer) for simple effects.

*"Engineering the soul, one pixel at a time."*
