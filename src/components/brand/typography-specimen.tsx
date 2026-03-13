import { ExternalLink } from "lucide-react"
import type { TypographySystem, FontFamily, TypeScaleEntry } from "@/lib/schema"

interface TypographySpecimenProps {
  typography: TypographySystem
}

const CHARSET_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const CHARSET_LOWER = "abcdefghijklmnopqrstuvwxyz"
const CHARSET_NUMBERS = "0123456789 !@#$%^&*()_+-=[]{}|;':\",./<>?"

export function TypographySpecimen({ typography }: TypographySpecimenProps) {
  return (
    <div className="space-y-16">
      <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
        {typography.families.map((family, i) => (
          <FontSpecimenRow key={family.name} family={family} index={i} />
        ))}
        {typography.scale && typography.scale.length > 0 && (
          <TypeScaleRow scale={typography.scale} />
        )}
      </div>
    </div>
  )
}

function FontSpecimenRow({
  family,
  index,
}: {
  family: FontFamily
  index: number
}) {
  const roleLabel = index === 0 ? "Primary Font" : "Technical Font"
  const fontStack =
    family.fontStackCss ??
    `'${family.name}', ${family.category}`
  const weightLabels =
    family.allWeightLabels ??
    family.weights.map((w) => w.label)

  return (
    <div className="grid grid-cols-[200px_1fr_160px] border-b border-border/40 last:border-b-0">
      {/* Left: Role + stack */}
      <div className="flex flex-col justify-center border-r border-border/30 p-5">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {roleLabel}
        </span>
        <span className="mt-2 font-mono text-[11px] leading-snug text-muted-foreground/70">
          {fontStack}
        </span>
        {family.googleFontsUrl && (
          <a
            href={family.googleFontsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground"
          >
            Google Fonts
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>

      {/* Center: Character sets */}
      <div className="flex flex-col justify-center p-5">
        <p
          className="text-lg font-semibold leading-relaxed tracking-wide"
          style={{ fontFamily: `"${family.name}", ${family.category}` }}
        >
          {CHARSET_UPPER}
        </p>
        <p
          className="text-lg leading-relaxed"
          style={{ fontFamily: `"${family.name}", ${family.category}` }}
        >
          {CHARSET_LOWER}
        </p>
        <p
          className="mt-1 text-base leading-relaxed text-muted-foreground"
          style={{ fontFamily: `"${family.name}", ${family.category}` }}
        >
          {CHARSET_NUMBERS}
        </p>
      </div>

      {/* Right: Weights */}
      <div className="flex flex-col justify-center border-l border-border/30 p-5">
        {weightLabels.map((label) => {
          const isBold =
            label === "Bold" ||
            label === "ExtraBold" ||
            label === "Black" ||
            label === "SemiBold"
          return (
            <span
              key={label}
              className={`text-xs leading-relaxed ${
                isBold
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          )
        })}
      </div>
    </div>
  )
}

function TypeScaleRow({ scale }: { scale: TypeScaleEntry[] }) {
  return (
    <div className="grid auto-cols-fr grid-flow-col border-t border-border/40">
      {scale.map((entry) => (
        <div key={entry.name} className="border-r border-border/30 p-4 last:border-r-0">
          <span className="block text-xs font-medium">{entry.name}</span>
          <span className="block font-mono text-[11px] text-muted-foreground">
            {entry.size}
          </span>
          {entry.usage && (
            <span className="mt-0.5 block text-[10px] text-muted-foreground/60">
              {entry.usage}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
