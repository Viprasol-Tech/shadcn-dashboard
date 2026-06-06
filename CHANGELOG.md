# Changelog

Format based on [Keep a Changelog](https://keepachangelog.com/); versioning
follows [SemVer](https://semver.org/).

## [0.2.0] - 2025

### Added
- New shadcn-style primitives: `Input`, `Tabs`, `Dialog`, `DropdownMenu`, and a
  toast system (`ToastProvider` + `useToast`), all built on the `cn()` utility.
- Command palette: a pure, ranked fuzzy filter in `lib/command.ts`
  (`filterCommands`, `groupCommands`, `isSubsequence`) plus a `CommandPalette`
  component wired to Cmd/Ctrl+K via the new `Topbar`.
- Theme switching: pure helpers in `lib/theme.ts` (`resolveTheme`,
  `nextTheme`, `parseTheme`, `isTheme`, `themeClassName`), a `ThemeProvider`
  with system-preference detection and persistence, and a `ThemeToggle`.
- Dark mode: CSS-variable driven Tailwind palette with a full `.dark` theme.
- Composed `/settings` page using Tabs, Input, DropdownMenu, Badge, toasts, and
  the theme toggle.
- Shared `Providers` wrapper mounted in the root layout.

### Changed
- `tailwind.config.ts` and `globals.css` now use HSL CSS variables so the same
  utilities resolve to light or dark values.
- Dashboard header extracted into the reusable `Topbar` component.

### Tests
- Test count increased from 25 to 81 across new suites: `command`, `theme`,
  `primitives`, `toast`, `composed`, `dashboard-data`, and `sidebar`.

## [0.1.0] - 2025

### Added
- Initial release of shadcn-dashboard: shadcn/ui-style admin dashboard (Next.js + Tailwind) with reusable primitives.
