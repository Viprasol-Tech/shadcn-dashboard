import { describe, it, expect, vi } from "vitest";
import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CommandPalette } from "@/components/command-palette";
import { ThemeToggle } from "@/components/theme-toggle";
import { ThemeProvider } from "@/components/ui/theme-provider";
import type { Command } from "@/lib/command";

const commands: ReadonlyArray<Command> = [
  { id: "1", title: "Go to Overview", group: "Navigation" },
  { id: "2", title: "Go to Settings", group: "Navigation" },
  { id: "3", title: "Export data", group: "Actions" },
];

describe("<CommandPalette>", () => {
  it("renders nothing when closed", () => {
    render(
      <CommandPalette
        open={false}
        onOpenChange={() => {}}
        commands={commands}
        onSelect={() => {}}
      />,
    );
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  });

  it("lists all commands grouped when opened", () => {
    render(
      <CommandPalette
        open
        onOpenChange={() => {}}
        commands={commands}
        onSelect={() => {}}
      />,
    );
    expect(screen.getAllByRole("option")).toHaveLength(3);
    expect(screen.getByText("Navigation")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("filters as the user types", () => {
    render(
      <CommandPalette
        open
        onOpenChange={() => {}}
        commands={commands}
        onSelect={() => {}}
      />,
    );
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "settings" },
    });
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(1);
    expect(options[0]).toHaveTextContent("Go to Settings");
  });

  it("shows an empty state for no matches", () => {
    render(
      <CommandPalette
        open
        onOpenChange={() => {}}
        commands={commands}
        onSelect={() => {}}
      />,
    );
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "zzzzz" },
    });
    expect(screen.getByText("No results found.")).toBeInTheDocument();
  });

  it("selects a command on click and closes", () => {
    const onSelect = vi.fn();
    const onOpenChange = vi.fn();
    render(
      <CommandPalette
        open
        onOpenChange={onOpenChange}
        commands={commands}
        onSelect={onSelect}
      />,
    );
    fireEvent.click(screen.getByRole("option", { name: "Export data" }));
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "3" }),
    );
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("selects the highlighted command on Enter", () => {
    const onSelect = vi.fn();
    render(
      <CommandPalette
        open
        onOpenChange={() => {}}
        commands={commands}
        onSelect={onSelect}
      />,
    );
    const combobox = screen.getByRole("combobox");
    fireEvent.keyDown(combobox, { key: "ArrowDown" });
    fireEvent.keyDown(combobox, { key: "Enter" });
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "2" }),
    );
  });
});

describe("<ThemeToggle>", () => {
  function renderToggle() {
    window.localStorage.clear();
    document.documentElement.classList.remove("dark");
    return render(
      <ThemeProvider defaultTheme="light">
        <ThemeToggle />
      </ThemeProvider>,
    );
  }

  it("renders the current theme label", () => {
    renderToggle();
    expect(screen.getByRole("button", { name: /Theme:/ })).toBeInTheDocument();
    expect(screen.getByText("Light")).toBeInTheDocument();
  });

  it("cycles the theme label on click", () => {
    renderToggle();
    const button = screen.getByRole("button", { name: /Theme:/ });
    fireEvent.click(button);
    expect(screen.getByText("Dark")).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.getByText("System")).toBeInTheDocument();
  });

  it("toggles the dark class on the document root", () => {
    renderToggle();
    const button = screen.getByRole("button", { name: /Theme:/ });
    fireEvent.click(button); // light -> dark
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
