"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

interface DropdownContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerId: string;
  menuId: string;
}

const DropdownContext = React.createContext<DropdownContextValue | null>(null);

function useDropdown(component: string): DropdownContextValue {
  const ctx = React.useContext(DropdownContext);
  if (!ctx) {
    throw new Error(`<${component}> must be used within <DropdownMenu>`);
  }
  return ctx;
}

export interface DropdownMenuProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function DropdownMenu({ children, defaultOpen = false }: DropdownMenuProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const baseId = React.useId();
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const ctx = React.useMemo<DropdownContextValue>(
    () => ({
      open,
      setOpen,
      triggerId: `${baseId}-trigger`,
      menuId: `${baseId}-menu`,
    }),
    [open, baseId],
  );

  return (
    <DropdownContext.Provider value={ctx}>
      <div ref={containerRef} className="relative inline-block text-left">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export interface DropdownMenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function DropdownMenuTrigger({
  className,
  onClick,
  ...props
}: DropdownMenuTriggerProps) {
  const ctx = useDropdown("DropdownMenuTrigger");
  return (
    <button
      type="button"
      id={ctx.triggerId}
      aria-haspopup="menu"
      aria-expanded={ctx.open}
      aria-controls={ctx.menuId}
      onClick={(event) => {
        ctx.setOpen(!ctx.open);
        onClick?.(event);
      }}
      className={className}
      {...props}
    />
  );
}

export type DropdownMenuContentProps = React.HTMLAttributes<HTMLDivElement>;

export function DropdownMenuContent({
  className,
  children,
  ...props
}: DropdownMenuContentProps) {
  const ctx = useDropdown("DropdownMenuContent");
  if (!ctx.open) return null;
  return (
    <div
      id={ctx.menuId}
      role="menu"
      aria-labelledby={ctx.triggerId}
      className={cn(
        "absolute right-0 z-50 mt-2 min-w-[10rem] rounded-md border border-border bg-background p-1 text-foreground shadow-md",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface DropdownMenuItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** When true the item stays open after activation. */
  closeOnSelect?: boolean;
}

export function DropdownMenuItem({
  className,
  onClick,
  closeOnSelect = true,
  ...props
}: DropdownMenuItemProps) {
  const ctx = useDropdown("DropdownMenuItem");
  return (
    <button
      type="button"
      role="menuitem"
      onClick={(event) => {
        onClick?.(event);
        if (closeOnSelect) ctx.setOpen(false);
      }}
      className={cn(
        "flex w-full cursor-pointer items-center rounded-sm px-2 py-1.5 text-left text-sm transition-colors",
        "hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:outline-none",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export function DropdownMenuSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLHRElement>) {
  return (
    <hr
      className={cn("-mx-1 my-1 border-t border-border", className)}
      {...props}
    />
  );
}

export function DropdownMenuLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("px-2 py-1.5 text-xs font-semibold text-muted-foreground", className)}
      {...props}
    />
  );
}

export default DropdownMenu;
