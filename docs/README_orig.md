# Nicholas Yun Portfolio — The Engineered Soul (v2.0)

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](package.json)
[![Tech Stack](https://img.shields.io/badge/stack-React_19_|_TS_6_|_Vite_6_|_Tailwind_4-indigo.svg)](package.json)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](#license)
[![Aesthetic](https://img.shields.io/badge/aesthetic-Tactile_Brutalism-black.svg)](GEMINI.md)

An avant-garde **Digital Installation** that balances **Tactile Brutalism** (visible structure, mono utility, 1px borders) with **High-End Editorial** (serif typography, extreme whitespace, cinematic motion).

## Overview

The Nicholas Yun Portfolio (v2.0) is a "Post-AI Authenticity" project. It rejects generic web patterns and "AI slop" aesthetics in favor of a unique, data-driven experience built on a rigid mathematical foundation and kinetic interaction models.

- **The Soul**: High-contrast editorial spreads using *Cormorant Garamond*.
- **The Machine**: A technical shell powered by *IBM Plex Mono* and a visible 28px background grid.
- **The Flow**: Custom weighted motion logic where typography weight responds to scroll velocity.

---

## Key Features

| Feature | Description |
| :--- | :--- |
| **Kinetic Typography** | Viewport-scaled headlines that dynamically change weight based on scroll speed. |
| **Asymmetric Bento** | A non-linear project shelf with category-specific visual textures (Mono for Code, Serif for Poetry). |
| **Machine Mode (MX)** | A technical overlay revealing build versions, raw state data, and system logic. |
| **The 28px Grid** | A mathematically rigid, visible background rhythm that dictates every pixel of the site. |
| **Human Fingerprint** | Subtle CSS noise and grain overlays to add tactile, analog texture to the digital canvas. |
| **AAA Accessibility** | High-contrast brutalism targeting WCAG AAA with full `prefers-reduced-motion` support. |

---

## Quick Start

### Prerequisites
- **Node.js** >= 20
- **pnpm** >= 9

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/personal-portfolio.git
cd personal-portfolio

# Install dependencies
pnpm install
```

### Development
```bash
# Start Vite development server
pnpm dev
```

### Verification
```bash
# Run strict type checking (mandatory before any code change)
pnpm typecheck

# Build for production
pnpm build
```

---

## Architecture

### Tech Stack
| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | React | 19.0 | Component-driven UI orchestrator |
| **Language** | TypeScript | 6.0 | Strict-mode type safety |
| **Build Tool** | Vite | 6.3 | Zero-latency HMR and production bundling |
| **Styling** | Tailwind CSS | 4.1 | CSS-first configuration via `@theme` |
| **Routing** | Custom Hook | — | Hash-based routing for Archive Spreads |
| **Package Manager** | pnpm | >= 9 | Dependency management |

### File Hierarchy
 - `src/components` — High-fidelity UI primitives (HeroKinetic, AboutFlow, MachineOverlay).
 - `src/hooks` — Interaction logic (`useWeightedScroll`, `useRouteHash`).
 - `src/lib` — Data-driven content ingestion and strict TypeScript interfaces.
 - `src/styles` — Global design system orchestration and Tailwind `@theme` tokens.
 - `src/content` — Structured Markdown and asset sources.

### Adding Media Content

For instructions on where and how to place images, PDFs, and text files, see the [Media Content Placement Guide](./Media_Content_Placement_Guide.md). It covers portrait photos, collection items, and portfolio assets.

---

## Design System

The site is governed by a rigid set of design tokens in `src/styles/index.css`:

- **The Unit**: `28px` grid rhythm.
- **Borders**: `1px solid` with `0px` radius (`radius-brutal`).
- **Colors**: OKLCH-based palette for perceptual uniformity across dark and light themes.
- **Typography**:
  - **Editorial**: *Cormorant Garamond* (Kinetic headlines).
  - **Utility**: *IBM Plex Mono* (Labels, metadata, MX data).
  - **Body**: *Inter* (Legibility-focused reading).

---

## Known Issues & Lessons Learned

### 1. Aesthetic Consistency (Resolved)
**Issue**: Components contained a mix of `rounded-none`, `rounded-full`, `rounded-md`, and `rounded-lg`, violating the strict brutalist aesthetic claim.
**Fix**: A `sed` pass replaced all rounded classes with `rounded-none`.
**File**: `REMEDIATION_SUMMARY.md`

### 2. Accessibility (Resolved)
**Issue**: Archive images used empty `alt` attributes (`alt=""`) which fails WCAG AAA for content images.
**Fix**: Updated `ArchiveSpread.tsx` to use `alt={activeItem.title}` and `alt={item.title}`.
**File**: `REMEDIATION_SUMMARY.md`

### 3. React Key Stability (Resolved)
**Issue**: `ContentBody.tsx` used paragraph strings as React `key` props.
**Fix**: Changed `key` props to use `\`para-\${index}\`` for stability.
**File**: `REMEDIATION_SUMMARY.md`

---

## Troubleshooting

### `pnpm typecheck` fails after styling changes
- Ensure you haven't introduced any `any` types.
- Check that `erasableSyntaxOnly: true` is respected (no `enum`, `namespace`).
- Verify there are no unused imports or variables (`noUnusedLocals`, `noUnusedParameters`).

### Build output size is larger than expected
- The production build includes all fonts referenced in `index.html`.
- Images in `src/content/` or `public/` are bundled statically.
- If the `dist/` folder is bloated, check for large unoptimized assets.

### `useWeightedScroll` causes layout thrashing
- The hook uses `requestAnimationFrame` throttling.
- `fontWeight` is applied via inline `style` on the heading to avoid React re-render overhead for class changes.
- If performance drops, verify no heavy calculations run inside the rAF loop.

---

## Contributing

This project follows the **Meticulous Approach** for all changes. Please refer to [CLAUDE.md](./CLAUDE.md) for the six-phase workflow (**Analyze -> Plan -> Validate -> Implement -> Verify -> Deliver**).

1. Ensure `pnpm typecheck` passes with zero errors.
2. Maintain the **Tactile Brutalist** aesthetic.
3. Reject generic components; use the project's established design system.

---

## License

Distributed under the MIT License. See `LICENSE` for more information (if applicable).

---

*"Engineering the soul, one pixel at a time."*
