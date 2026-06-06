"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export type ToastVariant = "default" | "success" | "destructive";

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  /** Auto-dismiss delay in ms. Use 0 to disable auto-dismiss. */
  duration?: number;
}

export interface Toast extends ToastOptions {
  id: string;
}

interface ToastContextValue {
  toasts: ReadonlyArray<Toast>;
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within <ToastProvider>");
  }
  return ctx;
}

const VARIANT_CLASSES: Record<ToastVariant, string> = {
  default: "border-border bg-background text-foreground",
  success: "border-transparent bg-primary text-primary-foreground",
  destructive: "border-transparent bg-destructive text-destructive-foreground",
};

let counter = 0;
function nextId(): string {
  counter += 1;
  return `toast-${counter}`;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  /** Default auto-dismiss duration in ms. */
  defaultDuration?: number;
}

export function ToastProvider({
  children,
  defaultDuration = 4000,
}: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const timers = React.useRef(new Map<string, ReturnType<typeof setTimeout>>());

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const toast = React.useCallback(
    (options: ToastOptions) => {
      const id = nextId();
      const duration = options.duration ?? defaultDuration;
      setToasts((prev) => [...prev, { id, ...options }]);
      if (duration > 0) {
        const timer = setTimeout(() => dismiss(id), duration);
        timers.current.set(id, timer);
      }
      return id;
    },
    [defaultDuration, dismiss],
  );

  React.useEffect(() => {
    const map = timers.current;
    return () => {
      map.forEach((timer) => clearTimeout(timer));
      map.clear();
    };
  }, []);

  const value = React.useMemo<ToastContextValue>(
    () => ({ toasts, toast, dismiss }),
    [toasts, toast, dismiss],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

interface ToastViewportProps {
  toasts: ReadonlyArray<Toast>;
  onDismiss: (id: string) => void;
}

function ToastViewport({ toasts, onDismiss }: ToastViewportProps) {
  if (toasts.length === 0) return null;
  return (
    <div
      role="region"
      aria-label="Notifications"
      className="fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          data-variant={t.variant ?? "default"}
          className={cn(
            "flex items-start justify-between gap-3 rounded-md border p-4 shadow-md",
            VARIANT_CLASSES[t.variant ?? "default"],
          )}
        >
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">{t.title}</span>
            {t.description ? (
              <span className="text-sm opacity-90">{t.description}</span>
            ) : null}
          </div>
          <button
            type="button"
            aria-label="Dismiss notification"
            onClick={() => onDismiss(t.id)}
            className="text-sm font-medium opacity-70 transition-opacity hover:opacity-100"
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
}

export default ToastProvider;
