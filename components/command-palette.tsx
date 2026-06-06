"use client";

import * as React from "react";
import { filterCommands, groupCommands, type Command } from "@/lib/command";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  commands: ReadonlyArray<Command>;
  /** Invoked when a command is chosen (Enter or click). */
  onSelect: (command: Command) => void;
  placeholder?: string;
}

/**
 * A Cmd/Ctrl+K style command palette. Filtering and ranking are delegated to
 * the pure `filterCommands` helper in `lib/command.ts`; this component owns the
 * query state, keyboard navigation, and rendering.
 */
export function CommandPalette({
  open,
  onOpenChange,
  commands,
  onSelect,
  placeholder = "Type a command or search...",
}: CommandPaletteProps) {
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);

  const results = React.useMemo(
    () => filterCommands(commands, query),
    [commands, query],
  );
  const groups = React.useMemo(() => groupCommands(results), [results]);

  // Reset transient state whenever the palette opens.
  React.useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  // Keep the highlighted index in range as results shrink.
  React.useEffect(() => {
    setActiveIndex((i) => Math.min(i, Math.max(0, results.length - 1)));
  }, [results.length]);

  const choose = React.useCallback(
    (command: Command) => {
      onSelect(command);
      onOpenChange(false);
    },
    [onSelect, onOpenChange],
  );

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const selected = results[activeIndex];
      if (selected) choose(selected);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="flex flex-col gap-3">
        <Input
          autoFocus
          role="combobox"
          aria-expanded={results.length > 0}
          aria-label="Command palette search"
          value={query}
          placeholder={placeholder}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={onKeyDown}
        />
        <ul role="listbox" aria-label="Commands" className="max-h-72 overflow-y-auto">
          {results.length === 0 ? (
            <li className="px-2 py-6 text-center text-sm text-muted-foreground">
              No results found.
            </li>
          ) : (
            groups.map((group) => (
              <li key={group.group}>
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                  {group.group}
                </div>
                <ul>
                  {group.items.map((command) => {
                    const index = results.indexOf(command);
                    const active = index === activeIndex;
                    return (
                      <li key={command.id}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={active}
                          onMouseEnter={() => setActiveIndex(index)}
                          onClick={() => choose(command)}
                          className={cn(
                            "flex w-full cursor-pointer items-center rounded-sm px-2 py-1.5 text-left text-sm transition-colors",
                            active
                              ? "bg-accent text-accent-foreground"
                              : "text-foreground hover:bg-accent hover:text-accent-foreground",
                          )}
                        >
                          {command.title}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))
          )}
        </ul>
      </div>
    </Dialog>
  );
}

export default CommandPalette;
