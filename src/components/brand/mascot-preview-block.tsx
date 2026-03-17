import { cn } from "@/lib/utils"
import { LogoDownloadMenu } from "./logo-download-menu"
import type { MascotSystem, LogoBackground } from "@/lib/schema"

interface MascotPreviewBlockProps {
  mascot: MascotSystem
  printMode?: boolean
}

const BG_CONFIG: Record<LogoBackground, { className: string; label: string }> = {
  light: {
    className: "",
    label: "Light",
  },
  dark: {
    className: "",
    label: "Dark",
  },
  brand: { className: "bg-primary", label: "Brand" },
}

export function MascotPreviewBlock({ mascot, printMode = false }: MascotPreviewBlockProps) {
  if (printMode) {
    return (
      <div className="pdf-subsection-page">
        <div className="grid h-full grid-cols-[0.72fr_1.28fr] gap-6">
          <div className="space-y-3">
            {mascot.variants.map((variant) =>
              variant.backgrounds.map((bg) => {
                const cfg = BG_CONFIG[bg]
                return (
                  <div key={`${variant.label}-${bg}`} className="space-y-1.5">
                    <div
                      className={cn(
                        "flex aspect-3/2 items-center justify-center rounded-lg p-8 ring-1 ring-border/30",
                        cfg.className
                      )}
                      style={
                        bg === "light"
                          ? {
                              background:
                                "linear-gradient(180deg, #D9D9EA 0%, #CAD5E1 100%)",
                            }
                          : bg === "dark"
                            ? {
                                background:
                                  "linear-gradient(180deg, #121218 0%, #171725 100%)",
                              }
                            : undefined
                      }
                    >
                      <img
                        src={variant.src}
                        alt={`${mascot.name} — ${variant.label}`}
                        className="max-h-[90px] max-w-full object-contain"
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground">{cfg.label}</span>
                  </div>
                )
              })
            )}
          </div>

          <div className="rounded-lg border border-border/40 bg-card/70 p-4">
            <h3 className="text-base font-semibold">{mascot.name}</h3>
            {(mascot.description || mascot.funFact) && (
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {mascot.description}
                {mascot.description && mascot.funFact ? " " : ""}
                {mascot.funFact ? `Fun fact: ${mascot.funFact}` : ""}
              </p>
            )}

            {mascot.guidelines && mascot.guidelines.length > 0 && (
              <div className="mt-4">
                <h4 className="mb-2 text-xs font-medium">Mascot Usage Guidelines</h4>
                <ul className="space-y-1.5">
                  {mascot.guidelines.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("space-y-10", printMode && "pdf-subsection-page space-y-6")}>
      <div>
        <h3 className="text-lg font-medium">{mascot.name}</h3>
        {(mascot.description || mascot.funFact) && (
          <p className={cn("mt-1 max-w-2xl text-sm text-muted-foreground", printMode && "text-xs")}>
            {mascot.description}
            {mascot.description && mascot.funFact ? " " : ""}
            {mascot.funFact ? `Fun fact: ${mascot.funFact}` : ""}
          </p>
        )}
      </div>

      <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2", printMode && "gap-3")}>
        {mascot.variants.map((variant) =>
          variant.backgrounds.map((bg) => {
            const cfg = BG_CONFIG[bg]
            return (
              <div key={`${variant.label}-${bg}`} className="space-y-2">
                <div
                  className={cn(
                    "group relative flex aspect-3/2 items-center justify-center rounded-lg p-12 ring-1 ring-border/30",
                    printMode && "p-8",
                    cfg.className
                  )}
                  style={
                    bg === "light"
                      ? {
                          background:
                            "linear-gradient(180deg, #D9D9EA 0%, #CAD5E1 100%)",
                        }
                      : bg === "dark"
                        ? {
                            background:
                              "linear-gradient(180deg, #121218 0%, #171725 100%)",
                          }
                        : undefined
                  }
                >
                  <img
                    src={variant.src}
                    alt={`${mascot.name} — ${variant.label}`}
                    className={cn("max-h-[120px] max-w-full object-contain", printMode && "max-h-[88px]")}
                  />
                  {variant.downloadUrl && !printMode && (
                    <div className="absolute bottom-3 right-3 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                      <LogoDownloadMenu
                        svgUrl={variant.downloadUrl}
                        name={`${mascot.name}-${variant.label}-${bg}`}
                        floating
                      />
                    </div>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{cfg.label}</span>
              </div>
            )
          })
        )}
      </div>

      {mascot.guidelines && mascot.guidelines.length > 0 && (
        <div>
          <h4 className={cn("mb-3 text-sm font-medium", printMode && "mb-2 text-xs")}>
            Mascot Usage Guidelines
          </h4>
          <ul className={cn("space-y-2", printMode && "space-y-1.5")}>
            {mascot.guidelines.map((item, index) => (
              <li
                key={index}
                className={cn(
                  "flex items-start gap-2.5 text-sm text-muted-foreground",
                  printMode && "text-xs leading-relaxed"
                )}
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
