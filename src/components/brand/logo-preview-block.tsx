import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"
import { LogoDownloadMenu } from "./logo-download-menu"
import type { LogoSystem, LogoVariant, LogoBackground } from "@/lib/schema"

interface LogoPreviewBlockProps {
  logos: LogoSystem
}

const BG_CONFIG: Record<
  LogoBackground,
  { className: string; label: string; style?: CSSProperties }
> = {
  light: {
    className: "",
    label: "Light",
    style: {
      background: "linear-gradient(180deg, #D9D9EA 0%, #CAD5E1 100%)",
    },
  },
  dark: {
    className: "",
    label: "Dark",
    style: {
      background: "linear-gradient(180deg, #121218 0%, #171725 100%)",
    },
  },
  brand: { className: "bg-primary", label: "Brand" },
}

interface VariantPair {
  label: string
  description?: string
  items: { variant: LogoVariant; bg: LogoBackground }[]
}

function pairVariants(variants: LogoVariant[]): VariantPair[] {
  const pairs: VariantPair[] = []
  const used = new Set<string>()

  for (const v of variants) {
    if (used.has(v.name)) continue

    const baseName = v.name.replace(" — Reversed", "")
    const reversed = variants.find((r) => r.name === `${baseName} — Reversed`)

    const items: VariantPair["items"] = []

    for (const bg of v.backgrounds) {
      items.push({ variant: v, bg })
    }

    if (reversed && !used.has(reversed.name)) {
      for (const bg of reversed.backgrounds) {
        items.push({ variant: reversed, bg })
      }
      used.add(reversed.name)
    }

    used.add(v.name)
    pairs.push({ label: baseName, description: v.description, items })
  }

  return pairs
}

export function LogoPreviewBlock({ logos }: LogoPreviewBlockProps) {
  const pairs = pairVariants(logos.variants)

  return (
    <div className="space-y-16">
      {pairs.map((pair) => (
        <div key={pair.label}>
          <div className="mb-5">
            <h3 className="text-lg font-medium">{pair.label}</h3>
            {pair.description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {pair.description}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            {pair.items.map(({ variant, bg }) => {
              const cfg = BG_CONFIG[bg]
              return (
                <div key={`${variant.name}-${bg}`} className="flex-1 space-y-2">
                  <div
                    className={cn(
                      "group relative flex aspect-3/2 items-center justify-center rounded-lg p-16",
                      "ring-1 ring-border/30",
                      cfg.className
                    )}
                    style={cfg.style}
                  >
                    <img
                      src={variant.src}
                      alt={`${pair.label} on ${cfg.label} background`}
                      className="max-h-[80px] max-w-full object-contain"
                    />
                    {variant.downloadUrl && (
                      <div className="absolute bottom-3 right-3 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                        <LogoDownloadMenu
                          svgUrl={variant.downloadUrl}
                          name={`${pair.label}-${bg}`}
                          floating
                        />
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {cfg.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {logos.buildDiagramSrc && (
        <div>
          <h3 className="mb-4 text-lg font-medium">Wordmark Construction</h3>
          <div className="overflow-hidden rounded-lg border border-border/30 bg-muted/30 px-6 py-5">
            <img
              src={logos.buildDiagramSrc}
              alt="Wordmark construction diagram"
              className="mx-auto w-full max-w-lg object-contain dark:hidden"
              style={{ filter: "invert(1) hue-rotate(180deg)" }}
            />
            <img
              src={logos.buildDiagramSrc}
              alt="Wordmark construction diagram"
              className="mx-auto hidden w-full max-w-lg object-contain dark:block"
            />
          </div>
        </div>
      )}

      {logos.guidelines && logos.guidelines.length > 0 && (
        <div>
          <h3 className="mb-4 text-lg font-medium">Logo Usage Guidelines</h3>
          <ul className="space-y-2">
            {logos.guidelines.map((g, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm text-muted-foreground"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                {g}
              </li>
            ))}
          </ul>
        </div>
      )}

      {(logos.clearSpace || logos.minimumSize) && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {logos.clearSpace && (
            <div>
              <h4 className="mb-2 text-sm font-medium">Clear Space</h4>
              <p className="text-sm text-muted-foreground">
                {logos.clearSpace}
              </p>
            </div>
          )}
          {logos.minimumSize && (
            <div>
              <h4 className="mb-2 text-sm font-medium">Minimum Size</h4>
              <p className="text-sm text-muted-foreground">
                {logos.minimumSize}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
