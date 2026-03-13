import { cn } from "@/lib/utils"
import { LogoDownloadMenu } from "./logo-download-menu"
import type { MascotSystem, LogoBackground } from "@/lib/schema"

interface MascotPreviewBlockProps {
  mascot: MascotSystem
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

export function MascotPreviewBlock({ mascot }: MascotPreviewBlockProps) {
  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-lg font-medium">{mascot.name}</h3>
        {(mascot.description || mascot.funFact) && (
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            {mascot.description}
            {mascot.description && mascot.funFact ? " " : ""}
            {mascot.funFact ? `Fun fact: ${mascot.funFact}` : ""}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {mascot.variants.map((variant) =>
          variant.backgrounds.map((bg) => {
            const cfg = BG_CONFIG[bg]
            return (
              <div key={`${variant.label}-${bg}`} className="space-y-2">
                <div
                  className={cn(
                    "group relative flex aspect-3/2 items-center justify-center rounded-lg p-12 ring-1 ring-border/30",
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
                    className="max-h-[120px] max-w-full object-contain"
                  />
                  {variant.downloadUrl && (
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
          <h4 className="mb-3 text-sm font-medium">Mascot Usage Guidelines</h4>
          <ul className="space-y-2">
            {mascot.guidelines.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2.5 text-sm text-muted-foreground"
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
