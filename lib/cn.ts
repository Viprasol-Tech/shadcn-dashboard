/**
 * A dependency-free `cn()` class-name merge utility in the spirit of
 * `clsx` + `tailwind-merge`. It accepts any mix of strings, numbers,
 * arrays, and conditional objects, flattens them into a single class list,
 * de-duplicates by token, and lets later classes win for conflicting
 * Tailwind utility groups (e.g. `px-2 px-4` -> `px-4`).
 */

export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

/** Tailwind utility prefixes whose "later wins" within the same variant. */
const CONFLICT_GROUPS: ReadonlyArray<RegExp> = [
  /^p[trblxy]?-/, // padding
  /^m[trblxy]?-/, // margin
  /^(w|h)-/, // width / height
  /^text-/, // text color / size
  /^bg-/, // background
  /^border(-[trbl])?-/, // border width/color sides
  /^rounded(-[a-z]+)?-/, // border radius
  /^flex-/, // flex
  /^grid-/, // grid
  /^gap-/, // gap
  /^font-/, // font weight / family
  /^items-/, // align-items
  /^justify-/, // justify-content
];

/** Flatten arbitrary ClassValue input into a flat array of class tokens. */
function flatten(input: ClassValue, out: string[]): void {
  if (!input) return;

  if (typeof input === "string" || typeof input === "number") {
    const str = String(input).trim();
    if (str.length === 0) return;
    for (const token of str.split(/\s+/)) {
      if (token) out.push(token);
    }
    return;
  }

  if (Array.isArray(input)) {
    for (const item of input) flatten(item, out);
    return;
  }

  if (typeof input === "object") {
    for (const [key, value] of Object.entries(input)) {
      if (value) {
        const trimmed = key.trim();
        if (trimmed) out.push(trimmed);
      }
    }
  }
}

/**
 * Split a class token into its variant prefix (e.g. `hover:`, `md:`) and the
 * base utility. Conflict resolution only applies within the same variant set.
 */
function splitVariant(token: string): { variant: string; base: string } {
  const lastColon = token.lastIndexOf(":");
  if (lastColon === -1) return { variant: "", base: token };
  return {
    variant: token.slice(0, lastColon + 1),
    base: token.slice(lastColon + 1),
  };
}

/**
 * Determine the conflict-group key for a base utility, if any. The key is the
 * matched utility prefix (e.g. `px-`, `py-`, `bg-`) so that classes sharing the
 * same prefix conflict (`px-2` vs `px-4`) while sibling axes (`px-2` vs `py-4`)
 * do not.
 */
function groupKey(base: string): string | null {
  for (const re of CONFLICT_GROUPS) {
    const match = re.exec(base);
    if (match) return match[0];
  }
  return null;
}

export function cn(...inputs: ClassValue[]): string {
  const tokens: string[] = [];
  for (const input of inputs) flatten(input, tokens);

  // Map of conflict signature -> index in `result` so a later class can
  // overwrite an earlier conflicting one in place.
  const conflictIndex = new Map<string, number>();
  // Set of exact tokens already seen (dedupe identical classes).
  const seen = new Set<string>();
  const result: string[] = [];

  for (const token of tokens) {
    if (seen.has(token)) continue;

    const { variant, base } = splitVariant(token);
    const group = groupKey(base);

    if (group) {
      const signature = `${variant}::${group}`;
      const existing = conflictIndex.get(signature);
      if (existing !== undefined) {
        // Replace the previous conflicting class; later wins.
        seen.delete(result[existing]);
        result[existing] = token;
        conflictIndex.set(signature, existing);
        seen.add(token);
        continue;
      }
      conflictIndex.set(signature, result.length);
    }

    result.push(token);
    seen.add(token);
  }

  return result.join(" ");
}

export default cn;
