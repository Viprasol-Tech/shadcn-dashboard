import { describe, it, expect } from "vitest";
import { isActive, navItems } from "@/lib/nav";

describe("navItems", () => {
  it("includes a root overview link", () => {
    expect(navItems.some((item) => item.href === "/")).toBe(true);
  });

  it("has unique hrefs", () => {
    const hrefs = navItems.map((i) => i.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});

describe("isActive", () => {
  it("matches the root only exactly", () => {
    expect(isActive("/", "/")).toBe(true);
    expect(isActive("/analytics", "/")).toBe(false);
  });

  it("matches an exact non-root path", () => {
    expect(isActive("/customers", "/customers")).toBe(true);
  });

  it("matches nested paths under a non-root href", () => {
    expect(isActive("/customers/42", "/customers")).toBe(true);
    expect(isActive("/customers/42/edit", "/customers")).toBe(true);
  });

  it("does not match sibling prefixes", () => {
    expect(isActive("/customers-archive", "/customers")).toBe(false);
  });

  it("ignores a trailing slash on the current path", () => {
    expect(isActive("/customers/", "/customers")).toBe(true);
  });

  it("does not mark unrelated paths active", () => {
    expect(isActive("/settings", "/customers")).toBe(false);
  });
});
