/**
 * Navigation configuration for the dashboard sidebar plus an `isActive`
 * helper that decides whether a nav link should be highlighted for the
 * current pathname. The root link ("/") only matches exactly; all other
 * links match exactly or when the current path is nested beneath them.
 */

export interface NavItem {
  /** Visible label for the nav link. */
  label: string;
  /** Route the link points to. */
  href: string;
  /** Short description for tooltips / accessibility. */
  description: string;
}

export const navItems: ReadonlyArray<NavItem> = [
  {
    label: "Overview",
    href: "/",
    description: "Key metrics at a glance",
  },
  {
    label: "Analytics",
    href: "/analytics",
    description: "Traffic and conversion trends",
  },
  {
    label: "Customers",
    href: "/customers",
    description: "Manage your customer base",
  },
  {
    label: "Settings",
    href: "/settings",
    description: "Workspace and account settings",
  },
];

/** Normalize a path by stripping a trailing slash (except for the root). */
function normalize(path: string): string {
  if (path.length > 1 && path.endsWith("/")) {
    return path.replace(/\/+$/, "");
  }
  return path;
}

/**
 * Returns true when a nav link with `href` should be considered active for
 * the given `path`.
 *
 * - The root href "/" matches only the exact root path.
 * - Any other href matches when the path equals it, or is nested below it
 *   (e.g. href "/customers" is active for "/customers/42").
 */
export function isActive(path: string, href: string): boolean {
  const p = normalize(path);
  const h = normalize(href);

  if (h === "/") {
    return p === "/";
  }

  if (p === h) return true;
  return p.startsWith(`${h}/`);
}

export default navItems;
