# AGENTS.md: Nicholas Yun Portfolio (v2.0)

Context for AI agents to avoid architectural regressions and common mistakes.

## Critical Commands
| Command | Purpose |
| :--- | :--- |
| `pnpm dev` | Starts Vite 6 dev server. |
| `pnpm typecheck` | **Mandatory** before any code changes. Uses TS 6 strict mode. |
| `pnpm build` | Production build. Verify after styling changes. |

## Toolchain & TS 6 Quirks
- **Package Manager**: Use `pnpm` exclusively.
- **Tailwind v4**: No `tailwind.config.js`. Config is CSS-first via `@theme` in `src/styles/index.css`.
- **TS 6 Constraints**: 
  - `erasableSyntaxOnly: true` — **Do not use `enum` or `namespace`**.
  - `noUncheckedIndexedAccess: true` — Array access (e.g., `arr[0]`) returns `T | undefined`. Use guards.

## Architectural Non-Negotiables
- **Hash Routing**: Uses a custom system (`src/hooks/useRouteHash.ts`). **Do not install `react-router-dom`**.
- **Kinetic Typography**: Headlines in `HeroKinetic.tsx` use `useWeightedScroll.ts` to adjust `font-weight` via scroll velocity. Preserve this interaction.
- **Content Ingestion**: Portfolio and collection items are ingested via `import.meta.glob` in `src/lib/content.ts`. 
  - **Path Requirement**: Globs must use `../content/` relative paths to point from `src/lib/` to `src/content/`.
- **Accessibility**: All animations **must** check the `useReducedMotion.ts` hook. WCAG AAA is the baseline.

## Design System Enforcement
- **Brutalist Radii**: All elements must use `rounded-none`. **Do not introduce `rounded-md`, `rounded-full`, etc.**
- **The 28px Grid**: Layouts must align with the visible 28px background grid rhythm defined in `src/styles/index.css`.
- **Typography**: 
  - Editorial: `Cormorant Garamond` (Kinetic).
  - Utility: `IBM Plex Mono` (Labels/MX).

## Common Mistakes to Avoid
- **Empty Alt Text**: Content images require meaningful `alt` text. **Do not use `alt=""`** unless strictly decorative (rare).
- **Unstable Keys**: `ContentBody.tsx` and loops should use stable keys (e.g., `` `para-${index}` ``), not raw paragraph strings or indices alone if content can change.
- **Theme Variables**: Use the OKLCH-based CSS variables (`--text-primary`, `--border-color`) defined in `index.css` to support both Night and Day themes.

Refer to `CLAUDE.md` for the "Meticulous Approach" workflow.
