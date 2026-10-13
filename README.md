# @ph0n/theme-kit

Shared themes, styles and Solid UI components for [divizn's](https://github.com/divizn) sites.

## What's included

- **Themes**, one file each, setting the same tokens so components look native in any of them:
  - `themes/zinc.css`: black/zinc, Inter + Cal Sans, blue accent, rounded 1px cards. Dark by default, `data-theme="light"` for light.
  - `themes/blueprint.css`: navy ink on graph paper, STIX Two Text + Atkinson Hyperlegible, square 2px rules, pen shadows. Follows `prefers-color-scheme`; `data-theme` forces either mode.
- `base.css`: box sizing, body colours and font from the theme, reduced-motion handling.
- `components.css`: plain CSS classes built only on tokens, usable with or without Tailwind:
  - graph paper: `.graph-paper`, `.graph-rows`, `.graph-cols`, `.graph-grid`, `.graph-torch`, `.graph-card` (+ `-arrow`)
  - timeline: `.timeline-entry`, `.timeline-marker` (scroll-driven)
  - `.section-head` + `.section-numeral`, `.checkpoint`, `.track` (+ `-stop`, `-node`, `-text`, `-name`, `-key`, `-meta`)
  - progress: `.status-pill` (`data-status`), `.status-menu` (popover), `.progress-bar` (`--p`, optional `--mark` tick), `.week-chip` (`data-state`), `.overdue-banner`
- `tailwind.css`: maps the tokens to Tailwind v4 utilities (`bg-background`, `text-accent`, `font-display`, ...) plus keyframe animations (fade-in, glow, title, text-glow, ink, underline, rise, grid draw-in) and a spring easing.
- Solid UI components from `@ph0n/theme-kit/ui`: `BentoGrid` + `BentoGridItem`, `Badge`, `Button`, `Card` (+ `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`), `Separator` and `cn()`.

## Tokens

Every theme defines: `--background`, `--foreground`, `--muted-foreground`, `--muted`, `--card`, `--border`, `--border-strong`, `--primary`, `--primary-foreground`, `--accent`, `--warning`, `--grid`, `--grid-major`, `--grid-lit`, `--font-body`, `--font-display`, `--font-ui`, `--radius`, `--border-width`, `--shadow-raised`.

Themes may add extras of their own (zinc: `--glow-*`, `--particle-rgb`). Components only read the shared set.

## Installation

```bash
pnpm add @ph0n/theme-kit
```

## Usage

With Tailwind:

```css
@import "tailwindcss";
@import "@ph0n/theme-kit/themes/zinc.css";
@import "@ph0n/theme-kit/base.css";
@import "@ph0n/theme-kit/components.css";
@import "@ph0n/theme-kit/tailwind.css";
@import "@fontsource-variable/inter";
```

Without Tailwind:

```css
@import "@ph0n/theme-kit/themes/blueprint.css";
@import "@ph0n/theme-kit/base.css";
@import "@ph0n/theme-kit/components.css";
```

Fonts are the site's responsibility. Zinc expects Inter (fontsource) and `public/fonts/CalSans-SemiBold.ttf`; blueprint expects STIX Two Text and Atkinson Hyperlegible.

### Components

```tsx
import { Badge, Card, CardTitle, cn } from "@ph0n/theme-kit/ui";
```

The components ship as untransformed Solid JSX under the `solid` export condition, so the site's Solid integration compiles them. `solid-js` is an optional peer dependency. `tailwind.css` registers them with Tailwind (`@source "./dist"`).

## Customizing per-site

Add site-specific tokens after the imports:

```css
:root {
  --hit: #f87171;
  --miss: #52525b;
  --live: #34d399;
}

@theme inline {
  --color-hit: var(--hit);
  --color-miss: var(--miss);
  --color-live: var(--live);
}
```

## Adding a theme

Copy an existing file in `themes/`, keep every shared token, and choose its light/dark mechanism. Components need no change.

## Releasing

Bump the version, publish (`prepublishOnly` runs the build), then update consuming sites:

```bash
pnpm update @ph0n/theme-kit
```

## License

MIT
