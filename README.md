<div align="center">
  <img src="docs/assets/logo.png" alt="Viprasol Tech" width="120" />

  <h1>shadcn-dashboard</h1>

  <p>A shadcn/ui-style admin dashboard built with Next.js (App Router) + Tailwind — hand-written, fully owned UI primitives, a Cmd/Ctrl+K command palette, light/dark theming, and a composed settings page.</p>

  <p><strong>Built and maintained by Viprasol Tech</strong></p>

  <p>
    <a href="https://github.com/Viprasol-Tech/shadcn-dashboard/blob/main/LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-green.svg" /></a>
    <a href="https://github.com/Viprasol-Tech/shadcn-dashboard"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-14-black.svg?logo=next.js" /></a>
    <a href="https://github.com/Viprasol-Tech/shadcn-dashboard"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-strict-blue.svg?logo=typescript" /></a>
    <a href="https://github.com/Viprasol-Tech/shadcn-dashboard"><img alt="Tests" src="https://img.shields.io/badge/tests-81%20passing-brightgreen.svg?logo=vitest" /></a>
    <a href="https://github.com/Viprasol-Tech/shadcn-dashboard"><img alt="Version" src="https://img.shields.io/badge/version-0.2.0-blue.svg" /></a>
  </p>
</div>

---

## ✨ Features

- 🧩 **Hand-written shadcn-style primitives** — `Button`, `Card`, `Badge`, `Input`, `Tabs`, `Dialog`, `DropdownMenu`, and a `Toast` system in `components/ui/`, built without the shadcn CLI so you fully own the code.
- 🎨 **`cn()` class-merge utility** — a dependency-free, `clsx`-like merge in `lib/cn.ts` that flattens strings/arrays/objects, dedupes, and lets later Tailwind utilities win conflicts (`px-2 px-4` → `px-4`).
- ⌨️ **Command palette** — a Cmd/Ctrl+K palette backed by a pure, ranked fuzzy filter in `lib/command.ts` (exact → prefix → word-prefix → substring → subsequence), with stable grouping.
- 🌗 **Light / dark / system theming** — pure helpers in `lib/theme.ts`, a `ThemeProvider` with OS-preference detection and persistence, a one-button `ThemeToggle`, and a CSS-variable Tailwind palette.
- 🧭 **Typed nav config** — `lib/nav.ts` exposes the sidebar config plus an `isActive(path, href)` helper that matches exact and nested routes.
- 🗂️ **Composed pages** — a dashboard overview (`app/page.tsx`) and a tabbed settings page (`app/settings/page.tsx`) assembled entirely from the primitives.
- 🔔 **Toasts** — a `useToast()` hook with auto-dismiss, manual dismiss, and variants.
- ✅ **Fully tested** — 81 Vitest tests: pure-logic unit tests for `cn`, `command`, `theme`, `nav`, and dashboard data, plus jsdom + Testing Library render tests for every primitive and composed component.
- 🔒 **Strict TypeScript** — `tsc --noEmit` is part of the verification gate; zero `any`, no stubs.

## 🚀 Quickstart

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) and try **Ctrl/Cmd + K** to open the command palette.

### Scripts

| Script              | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start the Next.js dev server         |
| `npm run build`     | Production build                     |
| `npm start`         | Run the production server            |
| `npm run typecheck` | Type-check with `tsc --noEmit`       |
| `npm test`          | Run the Vitest suite                 |

## 📦 What's included

```
app/
  layout.tsx            # Root layout + global styles + Providers
  page.tsx              # Dashboard composing the primitives + Topbar
  settings/page.tsx     # Tabbed settings page (Profile/Workspace/Appearance)
  globals.css           # Tailwind directives + light/dark CSS variables
components/
  ui/button.tsx         # Button primitive (variants + sizes)
  ui/card.tsx           # Card + Header/Title/Description/Content/Footer
  ui/badge.tsx          # Badge primitive (variants)
  ui/input.tsx          # Input primitive
  ui/tabs.tsx           # Accessible Tabs (List/Trigger/Content)
  ui/dialog.tsx         # Modal Dialog (Esc + overlay close, focus restore)
  ui/dropdown-menu.tsx  # DropdownMenu (click-outside + Esc close)
  ui/toast.tsx          # ToastProvider + useToast() hook
  ui/theme-provider.tsx # Theme context (system detection + persistence)
  providers.tsx         # Theme + Toast providers wrapper
  sidebar.tsx           # Nav sidebar using lib/nav
  stat-card.tsx         # Metric card built from Card + Badge
  topbar.tsx            # Header with search + Cmd/Ctrl+K palette
  command-palette.tsx   # Cmd/Ctrl+K palette using lib/command
  theme-toggle.tsx      # One-button light/dark/system switch
lib/
  cn.ts                 # clsx-style class merge (tested)
  command.ts            # Ranked fuzzy command filter (tested)
  theme.ts              # Theme resolution helpers (tested)
  nav.ts                # Nav config + isActive() (tested)
  commands-data.ts      # Palette command set built from nav
  dashboard-data.ts     # Sample stats + activity data (tested)
tests/                  # 81 Vitest + Testing Library tests
```

### Using a primitive

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

<Tabs defaultValue="profile">
  <TabsList>
    <TabsTrigger value="profile">Profile</TabsTrigger>
    <TabsTrigger value="workspace">Workspace</TabsTrigger>
  </TabsList>
  <TabsContent value="profile">…</TabsContent>
  <TabsContent value="workspace">…</TabsContent>
</Tabs>
```

### Filtering commands (pure logic)

```ts
import { filterCommands } from "@/lib/command";

filterCommands(commands, "export"); // ranked, grouped-ready matches
```

## 🗺️ Roadmap

- [x] Core primitives: Button, Card, Badge
- [x] Form + overlay primitives: Input, Tabs, Dialog, DropdownMenu, Toast
- [x] Command palette with ranked fuzzy filtering
- [x] Light / dark / system theming with persistence
- [x] Composed settings page
- [ ] Data table primitive with sorting + pagination
- [ ] Charts (sparklines + area) for stat cards
- [ ] Form validation helpers
- [ ] Storybook-style component gallery route

## ❓ FAQ

**Why hand-written primitives instead of the shadcn CLI?**
You own every line. There is no generator to re-run and no hidden dependency — the components are plain TypeScript + Tailwind you can read, test, and modify freely.

**Is the command palette filter tied to React?**
No. `lib/command.ts` is pure and framework-agnostic; the React `CommandPalette` is a thin layer over it, which is why the ranking logic is so easy to unit-test.

**How does dark mode work?**
Tailwind's `class` strategy plus HSL CSS variables in `globals.css`. `ThemeProvider` toggles a `dark` class on `<html>` and persists the choice; `system` follows the OS preference live.

**Does this require a backend?**
No. It is a front-end starter with sample data in `lib/dashboard-data.ts`. Wire your own API where you see the sample arrays.

## 🤝 Contributing

Contributions are welcome. Please open an issue to discuss substantial changes first, keep `npm run typecheck` and `npm test` green, and follow the existing code style. See `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md` for details.

## Contact — Viprasol Tech Private Limited

- Website: [viprasol.com](https://viprasol.com)
- Email: [support@viprasol.com](mailto:support@viprasol.com)
- Telegram: [t.me/viprasol_help](https://t.me/viprasol_help) | WhatsApp: +91 96336 52112
- GitHub: [@Viprasol-Tech](https://github.com/Viprasol-Tech) | [LinkedIn](https://www.linkedin.com/in/viprasol/) | X [@viprasol](https://twitter.com/viprasol)

## License

[MIT](LICENSE) (c) 2025 Viprasol Tech Private Limited
