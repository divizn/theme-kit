# @ph0n/theme-kit

Shared design tokens and Tailwind preset for [divizn's](https://github.com/divizn) static sites.

## What's included

- CSS custom properties for a black/zinc dark-by-default color palette
- A blue accent (`--accent`) with a per-theme value, since one hex cannot clear contrast on both grounds
- Light theme override (`[data-theme="light"]`)
- Inter Variable + CalSans font setup
- Tailwind v4 theme configuration
- Keyframe animations (fade-in, glow, title, text-glow)

## Installation

```bash
pnpm add @ph0n/theme-kit
```

## Usage

Import in your main stylesheet (before any Tailwind directives):

```css
@import "tailwindcss";
@import "@ph0n/theme-kit";
@import "@fontsource-variable/inter";

/* Your site's own extra tokens go here */
```

Then add the CalSans font file to your project (still your responsibility):

```
public/fonts/CalSans-SemiBold.ttf
```

The package provides the CSS; you provide the binary.

## Customizing per-site

If your site needs extra tokens (e.g., game-specific colors), add them *after* the import:

```css
@import "@ph0n/theme-kit";

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

Tailwind v4 merges `@theme` blocks, so this just adds to the preset without conflicts.

## Updating colors

Edit `theme.css` in this package, bump the version (`npm version patch`), publish, then update consuming sites:

```bash
pnpm update @ph0n/theme-kit
```

This centralizes theme changes — no more hand-copying CSS across repos.

## License

MIT
