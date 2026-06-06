import { navItems, isActive } from "@/lib/nav";
import { cn } from "@/lib/cn";

export interface SidebarProps {
  /** Current pathname used to highlight the active link. */
  pathname: string;
}

export function Sidebar({ pathname }: SidebarProps) {
  return (
    <nav
      aria-label="Primary"
      className="flex w-60 flex-col gap-1 border-r border-border bg-background p-4"
    >
      <div className="px-2 pb-4 text-lg font-semibold tracking-tight">
        shadcn-dashboard
      </div>
      <ul className="flex flex-col gap-1">
        {navItems.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={active ? "page" : undefined}
                title={item.description}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Sidebar;
