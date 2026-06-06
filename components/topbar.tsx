"use client";

import * as React from "react";
import { commands } from "@/lib/commands-data";
import { CommandPalette } from "@/components/command-palette";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import type { Command } from "@/lib/command";

/**
 * The dashboard top bar: page heading, theme toggle, and a button that opens
 * the command palette. Also binds Cmd/Ctrl+K to open the palette.
 */
export function Topbar({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { toast } = useToast();
  const [paletteOpen, setPaletteOpen] = React.useState(false);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const onSelect = (command: Command) => {
    toast({ title: command.title, variant: "default" });
  };

  return (
    <header className="mb-8 flex items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPaletteOpen(true)}
          aria-keyshortcuts="Meta+K Control+K"
        >
          Search
          <kbd className="rounded border border-border px-1 text-xs">Ctrl K</kbd>
        </Button>
        <ThemeToggle />
      </div>
      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        commands={commands}
        onSelect={onSelect}
      />
    </header>
  );
}

export default Topbar;
