<div align="center">
  <img src="docs/assets/logo.png" alt="Viprasol Tech" width="120" />

  <h1>shadcn-dashboard</h1>

  <p>A shadcn/ui-style admin dashboard built with Next.js (App Router) + Tailwind, using hand-written, reusable UI primitives.</p>

  <p><strong>Built and maintained by Viprasol Tech</strong></p>

  <p>
    <a href="https://github.com/Viprasol-Tech/shadcn-dashboard/blob/main/LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-green.svg" /></a>
    <a href="https://github.com/Viprasol-Tech/shadcn-dashboard"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-14-black.svg?logo=next.js" /></a>
    <a href="https://github.com/Viprasol-Tech/shadcn-dashboard"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-strict-blue.svg?logo=typescript" /></a>
  </p>
</div>

---

## Features

- **shadcn-style primitives, hand-written** — `Button`, `Card`, and `Badge` in `components/ui/`, built without the shadcn CLI so you fully own the code.
- **`cn()` class-merge utility** — a dependency-free, `clsx`-like merge in `lib/cn.ts` that flattens strings/arrays/objects, dedupes, and lets later Tailwind utilities win conflicts (`px-2 px-4` -> `px-4`).
- **Typed nav config** — `lib/nav.ts` exposes the sidebar config plus an `isActive(path, href)` helper that matches exact and nested routes (root `/` matches exactly).
- **Composed dashboard page** — `app/page.tsx` assembles a sidebar, stat cards, and a recent-activity list from the primitives.
- **Tailwind configured** — design tokens, dark-mode class strategy, and `globals.css` ready to extend.
- **Fully tested** — Vitest unit tests for `cn()` and `isActive()`, plus jsdom + Testing Library render tests for the primitives.
- **Strict TypeScript** — `tsc --noEmit` is part of the verification gate.

## Quickstart

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Scripts

| Script              | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start the Next.js dev server         |
| `npm run build`     | Production build                     |
| `npm start`         | Run the production server            |
| `npm run typecheck` | Type-check with `tsc --noEmit`       |
| `npm test`          | Run the Vitest suite                 |

## What's included

```
app/
  layout.tsx          # Root layout + global styles
  page.tsx            # Dashboard composing the primitives
  globals.css         # Tailwind directives + base styles
components/
  ui/button.tsx       # Button primitive (variants + sizes)
  ui/card.tsx         # Card + Header/Title/Content/Footer
  ui/badge.tsx        # Badge primitive (variants)
  sidebar.tsx         # Nav sidebar using lib/nav
  stat-card.tsx       # Metric card built from Card + Badge
lib/
  cn.ts               # clsx-style class merge (tested)
  nav.ts              # Nav config + isActive() (tested)
  dashboard-data.ts   # Sample stats + activity data
tests/
  cn.test.ts          # cn() merge / dedupe / conflict tests
  nav.test.ts         # isActive() exact + nested matching
  components.test.tsx # Button / Card / Badge render tests
```

## Contributing

Contributions are welcome. Please open an issue to discuss substantial changes first, keep `npm run typecheck` and `npm test` green, and follow the existing code style. See `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md` for details.

## Contact — Viprasol Tech Private Limited

- Website: [viprasol.com](https://viprasol.com)
- Email: [support@viprasol.com](mailto:support@viprasol.com)
- Telegram: [t.me/viprasol_help](https://t.me/viprasol_help) | WhatsApp: +91 96336 52112
- GitHub: [@Viprasol-Tech](https://github.com/Viprasol-Tech) | [LinkedIn](https://www.linkedin.com/in/viprasol/) | X [@viprasol](https://twitter.com/viprasol)

## License

[MIT](LICENSE) (c) 2025 Viprasol Tech Private Limited
