import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Sidebar } from "@/components/sidebar";
import { navItems } from "@/lib/nav";

describe("<Sidebar>", () => {
  it("renders a link for every nav item", () => {
    render(<Sidebar pathname="/" />);
    for (const item of navItems) {
      expect(screen.getByRole("link", { name: item.label })).toBeInTheDocument();
    }
  });

  it("marks the link matching the current path as the active page", () => {
    render(<Sidebar pathname="/settings" />);
    const active = screen.getByRole("link", { name: "Settings" });
    expect(active).toHaveAttribute("aria-current", "page");
  });

  it("does not mark non-matching links as active", () => {
    render(<Sidebar pathname="/settings" />);
    const overview = screen.getByRole("link", { name: "Overview" });
    expect(overview).not.toHaveAttribute("aria-current");
  });

  it("exposes an accessible primary navigation landmark", () => {
    render(<Sidebar pathname="/" />);
    expect(
      screen.getByRole("navigation", { name: "Primary" }),
    ).toBeInTheDocument();
  });
});
