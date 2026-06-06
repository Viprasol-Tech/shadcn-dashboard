/**
 * Theme utilities. The dashboard supports three theme settings: an explicit
 * "light" or "dark", plus "system" which defers to the OS preference. These
 * helpers are pure (no DOM access) so they can be unit-tested; the React
 * provider in `components/ui/theme-provider.tsx` wires them to the document.
 */

export type Theme = "light" | "dark" | "system";

/** A concrete, applied appearance with no "system" indirection. */
export type ResolvedTheme = "light" | "dark";

export const THEMES: ReadonlyArray<Theme> = ["light", "dark", "system"];

/** Type guard for the {@link Theme} union. */
export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark" || value === "system";
}

/**
 * Resolve a theme setting to a concrete appearance. When the setting is
 * "system" the supplied `systemPrefersDark` flag decides the outcome.
 */
export function resolveTheme(theme: Theme, systemPrefersDark: boolean): ResolvedTheme {
  if (theme === "system") return systemPrefersDark ? "dark" : "light";
  return theme;
}

/**
 * Cycle to the next theme in a fixed order: light -> dark -> system -> light.
 * Useful for a single toggle button.
 */
export function nextTheme(theme: Theme): Theme {
  const i = THEMES.indexOf(theme);
  return THEMES[(i + 1) % THEMES.length];
}

/**
 * Parse a persisted theme value (e.g. from localStorage) into a valid Theme,
 * falling back to `fallback` for anything unrecognized.
 */
export function parseTheme(value: string | null | undefined, fallback: Theme = "system"): Theme {
  return isTheme(value) ? value : fallback;
}

/**
 * Compute the class list to apply to the document root for a resolved theme.
 * Tailwind's class strategy keys off the literal "dark" class; "light" is the
 * default so it is represented as the absence of "dark".
 */
export function themeClassName(resolved: ResolvedTheme): string {
  return resolved === "dark" ? "dark" : "";
}

export default resolveTheme;
