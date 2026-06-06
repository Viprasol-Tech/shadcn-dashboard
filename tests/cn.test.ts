import { describe, it, expect } from "vitest";
import { cn } from "@/lib/cn";

describe("cn", () => {
  it("joins multiple string arguments", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("ignores falsy values", () => {
    expect(cn("a", false, null, undefined, "", "b")).toBe("a b");
  });

  it("flattens arrays", () => {
    expect(cn(["a", "b"], ["c"])).toBe("a b c");
  });

  it("supports conditional object syntax", () => {
    expect(cn("base", { active: true, hidden: false })).toBe("base active");
  });

  it("dedupes identical classes", () => {
    expect(cn("p-2", "text-sm", "p-2")).toBe("p-2 text-sm");
  });

  it("lets later conflicting tailwind classes win", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-sm", "text-lg")).toBe("text-lg");
    expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
  });

  it("keeps the position of the first occurrence when overwriting", () => {
    expect(cn("px-2", "font-bold", "px-4")).toBe("px-4 font-bold");
  });

  it("resolves conflicts per variant independently", () => {
    expect(cn("px-2", "hover:px-2", "px-4")).toBe("px-4 hover:px-2");
  });

  it("does not treat unrelated utilities as conflicting", () => {
    expect(cn("px-2", "py-4")).toBe("px-2 py-4");
  });

  it("handles whitespace-separated tokens inside a single string", () => {
    expect(cn("  a   b  ", "c")).toBe("a b c");
  });

  it("returns an empty string for no meaningful input", () => {
    expect(cn(null, undefined, false, "")).toBe("");
  });
});
