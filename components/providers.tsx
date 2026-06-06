"use client";

import * as React from "react";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ToastProvider } from "@/components/ui/toast";

/**
 * Client-side context providers shared across the app: theme and toasts.
 * Mounted once in the root layout so any page can call `useTheme`/`useToast`.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system">
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  );
}

export default Providers;
