"use client";

import { nextTheme, type Theme } from "@/lib/theme";
import { useTheme } from "@/components/ui/theme-provider";
import { Button } from "@/components/ui/button";

const LABELS: Record<Theme, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
};

const ICONS: Record<Theme, string> = {
  light: "Sun",
  dark: "Moon",
  system: "Auto",
};

/**
 * A single-button theme switcher that cycles light -> dark -> system. Renders
 * the current setting and is fully keyboard-accessible via the underlying
 * Button primitive.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      aria-label={`Theme: ${LABELS[theme]}. Activate to change.`}
      onClick={() => setTheme(nextTheme(theme))}
    >
      <span aria-hidden="true">{ICONS[theme]}</span>
      <span>{LABELS[theme]}</span>
    </Button>
  );
}

export default ThemeToggle;
