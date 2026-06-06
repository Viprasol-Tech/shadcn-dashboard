import { describe, it, expect } from "vitest";
import {
  isTheme,
  nextTheme,
  parseTheme,
  resolveTheme,
  themeClassName,
  THEMES,
} from "@/lib/theme";

describe("isTheme", () => {
  it("accepts the three valid themes", () => {
    expect(isTheme("light")).toBe(true);
    expect(isTheme("dark")).toBe(true);
    expect(isTheme("system")).toBe(true);
  });

  it("rejects anything else", () => {
    expect(isTheme("blue")).toBe(false);
    expect(isTheme(null)).toBe(false);
    expect(isTheme(undefined)).toBe(false);
    expect(isTheme(42)).toBe(false);
  });
});

describe("resolveTheme", () => {
  it("returns explicit themes unchanged", () => {
    expect(resolveTheme("light", true)).toBe("light");
    expect(resolveTheme("dark", false)).toBe("dark");
  });

  it("defers to the system preference for 'system'", () => {
    expect(resolveTheme("system", true)).toBe("dark");
    expect(resolveTheme("system", false)).toBe("light");
  });
});

describe("nextTheme", () => {
  it("cycles light -> dark -> system -> light", () => {
    expect(nextTheme("light")).toBe("dark");
    expect(nextTheme("dark")).toBe("system");
    expect(nextTheme("system")).toBe("light");
  });

  it("covers every theme exactly once across a full cycle", () => {
    const seen = new Set<string>();
    let current = THEMES[0];
    for (let i = 0; i < THEMES.length; i++) {
      seen.add(current);
      current = nextTheme(current);
    }
    expect(seen.size).toBe(THEMES.length);
    expect(current).toBe(THEMES[0]);
  });
});

describe("parseTheme", () => {
  it("passes through valid values", () => {
    expect(parseTheme("dark")).toBe("dark");
  });

  it("falls back for invalid or missing values", () => {
    expect(parseTheme("nope")).toBe("system");
    expect(parseTheme(null)).toBe("system");
    expect(parseTheme(undefined, "light")).toBe("light");
  });
});

describe("themeClassName", () => {
  it("maps dark to the 'dark' class and light to empty", () => {
    expect(themeClassName("dark")).toBe("dark");
    expect(themeClassName("light")).toBe("");
  });
});
