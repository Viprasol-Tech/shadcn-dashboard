import { describe, it, expect } from "vitest";
import {
  filterCommands,
  groupCommands,
  isSubsequence,
  type Command,
} from "@/lib/command";

const commands: ReadonlyArray<Command> = [
  { id: "1", title: "Go to Overview", group: "Navigation", keywords: ["home"] },
  { id: "2", title: "Go to Analytics", group: "Navigation" },
  { id: "3", title: "Go to Settings", group: "Navigation" },
  { id: "4", title: "Create new report", group: "Actions", keywords: ["add"] },
  { id: "5", title: "Export data as CSV", group: "Actions", keywords: ["download"] },
];

describe("isSubsequence", () => {
  it("matches an in-order subsequence", () => {
    expect(isSubsequence("gta", "go to analytics")).toBe(true);
  });

  it("rejects out-of-order characters", () => {
    expect(isSubsequence("zog", "go to overview")).toBe(false);
  });

  it("treats an empty query as a match", () => {
    expect(isSubsequence("", "anything")).toBe(true);
  });
});

describe("filterCommands", () => {
  it("returns all commands for an empty query", () => {
    expect(filterCommands(commands, "")).toHaveLength(commands.length);
    expect(filterCommands(commands, "   ")).toHaveLength(commands.length);
  });

  it("returns a copy, not the original array", () => {
    const result = filterCommands(commands, "");
    expect(result).not.toBe(commands);
  });

  it("filters out non-matching commands", () => {
    const result = filterCommands(commands, "zzzzz");
    expect(result).toHaveLength(0);
  });

  it("ranks an exact/prefix title above a fuzzy match", () => {
    const result = filterCommands(commands, "export");
    expect(result[0]?.id).toBe("5");
  });

  it("matches via keywords", () => {
    const result = filterCommands(commands, "download");
    expect(result.map((c) => c.id)).toContain("5");
  });

  it("matches case-insensitively", () => {
    const result = filterCommands(commands, "ANALYTICS");
    expect(result.map((c) => c.id)).toContain("2");
  });

  it("supports fuzzy subsequence matching", () => {
    const result = filterCommands(commands, "crt");
    expect(result.map((c) => c.id)).toContain("4");
  });

  it("is a stable sort for equal scores", () => {
    // "go to" prefixes three nav items equally; original order should hold.
    const result = filterCommands(commands, "go to");
    expect(result.map((c) => c.id).slice(0, 3)).toEqual(["1", "2", "3"]);
  });
});

describe("groupCommands", () => {
  it("groups by label preserving first-seen order", () => {
    const grouped = groupCommands(commands);
    expect(grouped.map((g) => g.group)).toEqual(["Navigation", "Actions"]);
    expect(grouped[0].items).toHaveLength(3);
    expect(grouped[1].items).toHaveLength(2);
  });

  it("uses the fallback label for ungrouped commands", () => {
    const grouped = groupCommands([{ id: "x", title: "Lonely" }], "Misc");
    expect(grouped[0].group).toBe("Misc");
  });
});
