# Nicholas Yun Portfolio — The Engineered Soul (v2.0)

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](package.json)
[![Tech Stack](https://img.shields.io/badge/stack-React_19_|_TS_6_|_Vite_6_|_Tailwind_4-indigo.svg)](package.json)
[![Aesthetic](https://img.shields.io/badge/aesthetic-Tactile_Brutalism-black.svg)](src/styles/index.css)
[![Accessibility](https://img.shields.io/badge/accessibility-WCAG_AAA-green.svg)](src/App.tsx)

> "Engineering the soul, one pixel at a time."

An avant-garde **Digital Installation** that balances **Tactile Brutalism** (visible structure, mono utility, 1px borders) with **High-End Editorial** (serif typography, extreme whitespace, cinematic motion). This project rejects generic web patterns and "AI slop" aesthetics in favor of a unique, data-driven experience built on a rigid mathematical foundation and kinetic interaction models.

---

## ⚡ Key Features

| Feature | Description |
| :--- | :--- |
| **🌀 Kinetic Typography** | Viewport-scaled headlines that dynamically change weight (200-950) based on scroll velocity. |
| **📏 The 28px Grid** | A mathematically rigid, visible background rhythm that dictates every pixel of the installation. |
| **🔳 Asymmetric Bento** | A non-linear project shelf with category-specific visual textures (Mono for Code, Serif for Poetry). |
| **🤖 Machine Mode (MX)** | A technical technical overlay revealing build versions, raw state data, and system logic. |
| **🖐️ Human Fingerprint** | Subtle CSS noise and grain overlays to add tactile, analog texture to the digital canvas. |
| **♿ AAA Accessibility** | High-contrast brutalism targeting WCAG AAA with full `prefers-reduced-motion` support. |

---

## 🛠️ Architecture

### Tech Stack
| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | React | 19.0 | Component-driven UI orchestrator |
| **Language** | TypeScript | 6.0 | Strict-mode type safety (`erasableSyntaxOnly`) |
| **Build Tool** | Vite | 6.3 | Zero-latency HMR and production bundling |
| **Styling** | Tailwind CSS | 4.1 | CSS-first configuration via `@theme` |
| **Routing** | Custom Hook | — | Hash-based routing for Archive Spreads |
| **Package Manager** | pnpm | >= 9 | Dependency management |

### Data Flow
```mermaid
graph LR
    MD[.md Content] --> Glob[import.meta.glob]
    Glob --> Parser[Frontmatter Parser]
    Parser --> State[App State / Thin Orchestrator]
    State --> UI[Bento / Archive UI]
    Scroll[Scroll Velocity] --> Kinetic[Kinetic Typography]
```

---

## 📂 File Hierarchy

```text
📂 src/
├── 📄 App.tsx                # Thin orchestrator; lifts all global state
├── 📄 main.tsx               # StrictMode entry point
├── 📂 components/            # High-fidelity UI primitives
│   ├── 📄 HeroKinetic.tsx    # Scroll-responsive typographic installation
│   ├── 📄 AboutFlow.tsx      # Asymmetric editorial layout
│   ├── 📄 BentoGrid.tsx      # Non-linear project shelf
│   ├── 📄 MachineOverlay.tsx # Technical MX debug layer
│   └── 📄 GrainOverlay.tsx   # "Human fingerprint" texture
├── 📂 hooks/                 # Interaction & system logic
│   ├── 📄 useWeightedScroll.ts # Scroll velocity → font-weight logic
│   ├── 📄 useRouteHash.ts      # Custom hash-based router
│   └── 📄 useReducedMotion.ts  # WCAG animation gates
├── 📂 lib/                   # Data layer & types
│   ├── 📄 content.ts         # Markdown ingestion & frontmatter parser
│   ├── 📄 types.ts           # Strict TypeScript interfaces
│   └── 📄 data.ts            # Static definitions & social links
└── 📂 styles/
    └── 📄 index.css          # Tailwind v4 @theme & 28px grid system
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** >= 20
- **pnpm** >= 9

### Installation
```bash
pnpm install
```

### Verification & Build
```bash
# Start development server
pnpm dev

# Run strict type checking (Mandatory before commits)
pnpm typecheck

# Build for production
pnpm build
```

---

## 🎨 Design System

The installation is governed by a rigid set of design tokens in `src/styles/index.css`:

- **The Unit**: `28px` grid rhythm.
- **Borders**: `1px solid` with `0px` radius (`radius-brutal`).
- **Typography**:
  - **Editorial**: *Cormorant Garamond* (Kinetic headlines).
  - **Utility**: *IBM Plex Mono* (Labels, metadata, MX data).
  - **Body**: *Inter* (Legibility-focused reading).
- **Colors**: OKLCH-based palette for perceptual uniformity across Dark (Night) and Light (Day) themes.

---

## ✍️ Content Management

The portfolio is data-driven, ingesting content from Markdown files:

1. **Portfolio Items**: Place `.md` files in `src/content/portfolio/`.
2. **Collections**: Place `.md` files in `src/content/collections/{category}/`.
3. **Images**: Sibling `.jpg`/`.png` files with the same name as the `.md` are auto-associated.
4. **Portrait**: Managed via `public/nicholas-portrait.jpg`.

---

## ♿ Accessibility & Motion

- **WCAG AAA**: High-contrast ratios and semantic HTML are strictly enforced.
- **Motion Gates**: All kinetic interactions check `useReducedMotion()`. 
- **Focus**: Global focus-visible styles provide a 3px accent outline for keyboard navigation.
- **Skip Link**: A "Skip to main content" link is available for screen readers.

---

## 🤝 Contributing

This project follows the **Meticulous Approach**:
1. **Analyze** → 2. **Plan** → 3. **Validate** → 4. **Implement** → 5. **Verify** → 6. **Deliver**

- **Strict TS**: No `any`, `enum`, or `namespace`.
- **Brutalist CSS**: No `rounded-*` classes except `rounded-none`.
- **Validation**: `pnpm typecheck` must pass with zero errors.

---

## 📜 License

MIT © Nicholas Yun. See `LICENSE` for details (if applicable).

*"Engineering the soul, one pixel at a time."*
