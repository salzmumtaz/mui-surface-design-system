# Prism — MUI Surface Design System

A clean-room portfolio demo of a multi-surface theming architecture built with React, TypeScript, and MUI.

The demo models two independent concepts:

- **Tenant:** `prism | northstar` — selects brand tokens, typography, geometry, and the complete surface palette.
- **Theme family:** `light | dark` — selected globally by the user.
- **Surface variant:** `application | sidebar | glass | content` — selected locally by layout context.

MUI's `palette.mode` remains strictly `light | dark`. Custom metadata lives at `theme.surface`, keeping third-party component behavior predictable while allowing nested surfaces to express richer visual roles.

## Architecture

```text
Application theme (light/dark family)
├── Sidebar surface
└── Glass workspace surface
    └── Content surface
```

Themes are resolved through a typed matrix and cached by `tenant:family:variant`. A `ThemeProvider` is introduced only at a meaningful visual boundary—not around ordinary layout primitives.

The source is organized as a small design system rather than page-level styling:

```text
src/theme/foundations.ts          typography, spacing, shape, brand tokens
src/theme/surfaces.ts             family × surface palette matrix
src/theme/components.ts           MUI defaults, overrides, and variants
src/theme/create-surface-theme.ts composition and caching
src/components/                   semantic page components and layout
```

Feature components select typography and component variants. They do not redefine font sizes, weights, colors, radii, hover states, or card recipes.

### Why glass is a surface

Glass is a contextual layer, not a third MUI color scheme. In the dark family it keeps dark-compatible foreground tokens but changes container backgrounds, borders, elevation, and blur. Components placed on top of that layer use a slightly stronger translucent `background.paper`. A nested content surface can then switch to an opaque light palette for dense forms or long-form information.

```text
dark application shell
└── translucent glass workspace
    ├── glass-on-glass metric cards
    └── opaque light content island
```

## Run locally

```bash
npm install
npm run dev
```

## Production check

```bash
npm run build
npm run lint
```

## Why this exists

Standard global light/dark switching is insufficient for products with mixed visual contexts, such as dark application chrome, branded navigation, translucent workspaces, and high-contrast content islands. This project demonstrates a scalable way to support those contexts without prop drilling or overloading MUI's native color-scheme model.

## Production-style tenant loading

The demo includes a mock asynchronous tenant-config API and a Zustand bootstrap store. The store validates unknown API data, renders a cached configuration while revalidating, persists the user's light/dark preference, prevents duplicate Strict Mode bootstrap requests, and keeps the current tenant active if switching fails.

```text
cached config → immediate render → API revalidation
tenant toggle → small local loader → validate response → atomic theme swap
                                      └─ failure → preserve current tenant
```

Replace the mock body in `src/services/tenant-config-api.ts` with the real authenticated request; page components and the theme resolver remain unchanged.
