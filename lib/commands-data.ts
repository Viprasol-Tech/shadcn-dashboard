import type { Command } from "@/lib/command";
import { navItems } from "@/lib/nav";

/**
 * The command set surfaced in the Cmd/Ctrl+K palette: every nav destination
 * plus a few global actions. Built from the shared `navItems` so navigation
 * stays in sync with the sidebar.
 */
export const commands: ReadonlyArray<Command> = [
  ...navItems.map<Command>((item) => ({
    id: `nav:${item.href}`,
    title: `Go to ${item.label}`,
    group: "Navigation",
    keywords: [item.label, item.href, item.description],
  })),
  {
    id: "action:new-report",
    title: "Create new report",
    group: "Actions",
    keywords: ["add", "create", "report"],
  },
  {
    id: "action:export",
    title: "Export data as CSV",
    group: "Actions",
    keywords: ["download", "csv", "export"],
  },
  {
    id: "action:toggle-theme",
    title: "Toggle color theme",
    group: "Preferences",
    keywords: ["dark", "light", "appearance", "theme"],
  },
];

export default commands;
