export type ColorFormat = "hex" | "rgb" | "hsl"

interface RGB {
  r: number
  g: number
  b: number
}

interface HSL {
  h: number
  s: number
  l: number
}

export function hexToRgb(hex: string): RGB | null {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!match) return null
  return {
    r: parseInt(match[1], 16),
    g: parseInt(match[2], 16),
    b: parseInt(match[3], 16),
  }
}

export function hexToHsl(hex: string): HSL | null {
  const rgb = hexToRgb(hex)
  if (!rgb) return null

  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2

  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) }

  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

  let h = 0
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
  else if (max === g) h = ((b - r) / d + 2) / 6
  else h = ((r - g) / d + 4) / 6

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

export function formatRgb(hex: string): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
}

export function formatHsl(hex: string): string {
  const hsl = hexToHsl(hex)
  if (!hsl) return hex
  return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
}

export function formatColor(hex: string, format: ColorFormat): string {
  switch (format) {
    case "hex":
      return hex.toUpperCase()
    case "rgb":
      return formatRgb(hex)
    case "hsl":
      return formatHsl(hex)
  }
}

export const COLOR_FORMATS: { label: string; format: ColorFormat }[] = [
  { label: "HEX", format: "hex" },
  { label: "RGB", format: "rgb" },
  { label: "HSL", format: "hsl" },
]
