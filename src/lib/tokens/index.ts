import type { ThemeConfig, ThemeColors } from "@/lib/schema"

function colorVarEntries(colors: ThemeColors): Record<string, string> {
  return {
    "--primary": colors.primary,
    "--primary-foreground": colors.primaryForeground,
    "--secondary": colors.secondary,
    "--secondary-foreground": colors.secondaryForeground,
    "--accent": colors.accent,
    "--accent-foreground": colors.accentForeground,
    "--background": colors.background,
    "--foreground": colors.foreground,
    "--muted": colors.muted,
    "--muted-foreground": colors.mutedForeground,
    "--card": colors.card,
    "--card-foreground": colors.cardForeground,
    "--border": colors.border,
  }
}

function entriesToCSS(entries: Record<string, string>): string {
  return Object.entries(entries)
    .map(([k, v]) => `${k}:${v}`)
    .join(";")
}

export function themeToStyleTag(theme: ThemeConfig): string {
  const fontVars = [
    `--font-heading:${theme.fonts.heading}`,
    `--font-body:${theme.fonts.body}`,
    theme.fonts.mono ? `--font-mono:${theme.fonts.mono}` : "",
    theme.radius ? `--radius:${theme.radius}` : "",
  ]
    .filter(Boolean)
    .join(";")

  const lightCSS = entriesToCSS(colorVarEntries(theme.colors))
  const rootRule = `:root{${lightCSS};${fontVars}}`

  if (!theme.darkColors) return rootRule

  const darkCSS = entriesToCSS(colorVarEntries(theme.darkColors))
  return `${rootRule} :root.dark{${darkCSS}}`
}

/** @deprecated Use themeToStyleTag for dark mode support */
export function themeToCSSVars(theme: ThemeConfig): Record<string, string> {
  return {
    ...colorVarEntries(theme.colors),
    "--font-heading": theme.fonts.heading,
    "--font-body": theme.fonts.body,
    ...(theme.fonts.mono ? { "--font-mono": theme.fonts.mono } : {}),
    ...(theme.radius ? { "--radius": theme.radius } : {}),
  }
}

export function fontFamiliesFromTheme(theme: ThemeConfig): string[] {
  const families = [theme.fonts.heading, theme.fonts.body]
  if (theme.fonts.mono) families.push(theme.fonts.mono)
  return [...new Set(families)]
}
