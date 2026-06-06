/**
 * A small, dependency-free command-palette engine. It powers a fuzzy filter
 * over a list of commands (the kind you reach for with Cmd/Ctrl+K) and ranks
 * matches by quality: exact title hits beat prefix hits, which beat
 * subsequence ("fuzzy") hits. Results are stable for equal scores so the
 * source ordering is preserved.
 */

export interface Command {
  /** Stable identifier for the command. */
  id: string;
  /** Human-readable title shown in the palette. */
  title: string;
  /** Optional grouping label (e.g. "Navigation", "Actions"). */
  group?: string;
  /** Optional keywords that also match the query but are not displayed. */
  keywords?: ReadonlyArray<string>;
}

export interface CommandMatch<T extends Command = Command> {
  command: T;
  /** Higher is a better match. */
  score: number;
}

const SCORE = {
  EXACT: 1000,
  PREFIX: 500,
  WORD_PREFIX: 250,
  SUBSTRING: 120,
  SUBSEQUENCE: 40,
  KEYWORD: 20,
} as const;

/**
 * Returns true when every character of `query` appears in `text` in order
 * (not necessarily contiguously). The canonical "fuzzy" match.
 */
export function isSubsequence(query: string, text: string): boolean {
  if (query.length === 0) return true;
  let qi = 0;
  for (let ti = 0; ti < text.length && qi < query.length; ti++) {
    if (text[ti] === query[qi]) qi++;
  }
  return qi === query.length;
}

/** Score a single haystack string against a normalized query. */
function scoreText(query: string, text: string): number {
  if (text === query) return SCORE.EXACT;
  if (text.startsWith(query)) return SCORE.PREFIX;

  const words = text.split(/[\s\-_/]+/);
  if (words.some((w) => w.startsWith(query))) return SCORE.WORD_PREFIX;

  if (text.includes(query)) return SCORE.SUBSTRING;
  if (isSubsequence(query, text)) return SCORE.SUBSEQUENCE;
  return 0;
}

/** Score a command (title + keywords) against a normalized query. */
function scoreCommand(query: string, command: Command): number {
  const title = command.title.toLowerCase();
  let best = scoreText(query, title);

  if (command.keywords) {
    for (const keyword of command.keywords) {
      const kw = keyword.toLowerCase();
      if (kw === query || kw.startsWith(query) || kw.includes(query)) {
        best = Math.max(best, SCORE.KEYWORD + scoreText(query, kw) / 10);
      } else if (isSubsequence(query, kw)) {
        best = Math.max(best, SCORE.KEYWORD);
      }
    }
  }

  return best;
}

/**
 * Filter and rank `commands` against a free-text `query`. An empty (or
 * whitespace-only) query returns all commands unchanged. Non-matching
 * commands are dropped. Ties preserve the original order (stable sort).
 */
export function filterCommands<T extends Command>(
  commands: ReadonlyArray<T>,
  query: string,
): T[] {
  const q = query.trim().toLowerCase();
  if (q.length === 0) return [...commands];

  const matches: Array<CommandMatch<T> & { index: number }> = [];
  commands.forEach((command, index) => {
    const score = scoreCommand(q, command);
    if (score > 0) matches.push({ command, score, index });
  });

  matches.sort((a, b) => b.score - a.score || a.index - b.index);
  return matches.map((m) => m.command);
}

/**
 * Group already-filtered commands by their `group` label, preserving the
 * order in which each group is first encountered. Commands without a group
 * are collected under the provided `fallback` label.
 */
export function groupCommands<T extends Command>(
  commands: ReadonlyArray<T>,
  fallback = "Other",
): Array<{ group: string; items: T[] }> {
  const order: string[] = [];
  const buckets = new Map<string, T[]>();

  for (const command of commands) {
    const label = command.group ?? fallback;
    if (!buckets.has(label)) {
      buckets.set(label, []);
      order.push(label);
    }
    buckets.get(label)!.push(command);
  }

  return order.map((group) => ({ group, items: buckets.get(group)! }));
}

export default filterCommands;
