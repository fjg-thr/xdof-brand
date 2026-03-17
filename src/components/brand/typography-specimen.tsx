import { ExternalLink } from "lucide-react"
import type { TypographySystem, FontFamily, TypeScaleEntry } from "@/lib/schema"

interface TypographySpecimenProps {
  typography: TypographySystem
  printMode?: boolean
}

const CHARSET_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const CHARSET_LOWER = "abcdefghijklmnopqrstuvwxyz"
const CHARSET_NUMBERS = "0123456789 !@#$%^&*()_+-=[]{}|;':\",./<>?"

export function TypographySpecimen({
  typography,
  printMode = false,
}: TypographySpecimenProps) {
  const primaryFamily = typography.families[0]
  const technicalFamilies = typography.families.slice(1)
  const scale = typography.scale ?? []

  const primaryScale = primaryFamily
    ? scale.filter((entry) => entry.family === primaryFamily.name)
    : []
  const technicalScale = scale.filter((entry) =>
    technicalFamilies.some((family) => family.name === entry.family)
  )

  return (
    <div className="space-y-16">
      {primaryFamily && (
        <TypographySection
          title="Primary Typography"
          description="Core voice for brand headlines, UI copy, and editorial text."
          families={[primaryFamily]}
          scale={primaryScale.length > 0 ? primaryScale : scale}
          printMode={printMode}
        />
      )}
      {technicalFamilies.length > 0 && (
        <TypographySection
          title="Technical Typography"
          description="Monospace and utility styles for code, telemetry, and compact metadata."
          families={technicalFamilies}
          scale={technicalScale}
          printMode={printMode}
        />
      )}
    </div>
  )
}

function TypographySection({
  title,
  description,
  families,
  scale,
  printMode,
}: {
  title: string
  description: string
  families: FontFamily[]
  scale: TypeScaleEntry[]
  printMode: boolean
}) {
  return (
    <div className={printMode ? "pdf-subsection-page space-y-4" : "space-y-4"}>
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
        {families.map((family, index) => (
          <FontSpecimenPanel
            key={family.name}
            family={family}
            printMode={printMode}
            isLast={index === families.length - 1 && scale.length === 0}
          />
        ))}
        {scale.length > 0 && <TypeScaleRow scale={scale} printMode={printMode} />}
      </div>
    </div>
  )
}

function FontSpecimenPanel({
  family,
  printMode,
  isLast,
}: {
  family: FontFamily
  printMode: boolean
  isLast: boolean
}) {
  const fontStack =
    family.fontStackCss ??
    `'${family.name}', ${family.category}`
  const weightLabels =
    family.allWeightLabels ??
    family.weights.map((w) => w.label)

  return (
    <div
      className={`border-b border-border/40 ${isLast ? "border-b-0" : ""}`}
    >
      <div
        className={`flex flex-wrap items-start justify-between border-b border-border/40 ${printMode ? "gap-3 p-4" : "gap-4 p-6"}`}
      >
        <div className="space-y-3">
          <div>
            <p className={printMode ? "text-3xl font-semibold leading-none" : "text-4xl font-semibold leading-none"}>
              {family.name}
            </p>
            <p
              className={printMode
                ? "mt-1.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
                : "mt-2 text-[14px] uppercase tracking-[0.12em] text-muted-foreground"}
            >
              {family.category}
            </p>
          </div>
          <span className={printMode ? "block font-mono text-[10px] leading-snug text-muted-foreground/80" : "block font-mono text-[11px] leading-snug text-muted-foreground/80"}>
            {fontStack}
          </span>
        </div>
        {family.googleFontsUrl && !printMode && (
          <a
            href={family.googleFontsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted/60"
          >
            <ExternalLink className="h-3 w-3" />
            Google Fonts
          </a>
        )}
      </div>

      <div
        className={
          printMode
            ? "grid gap-4 p-4 grid-cols-[3fr_2fr]"
            : "grid gap-6 p-6 lg:grid-cols-[1fr_170px]"
        }
      >
        <div className={printMode ? "space-y-1.5" : "space-y-2"}>
          {printMode && (
            <p
              className="text-sm leading-relaxed text-foreground/90"
              style={{ fontFamily: `"${family.name}", ${family.category}` }}
            >
              {family.sampleText ?? "The quick brown fox jumps over the lazy dog"}
            </p>
          )}
          <p
            className={
              printMode
                ? "text-[2.15rem] font-semibold leading-[1.26] tracking-wide lg:text-[2.25rem]"
                : "text-2xl font-semibold leading-relaxed tracking-wide lg:text-3xl"
            }
            style={{ fontFamily: `"${family.name}", ${family.category}` }}
          >
            {CHARSET_UPPER}
          </p>
          <p
            className={
              printMode
                ? "text-[2.15rem] leading-[1.26] lg:text-[2.25rem]"
                : "text-2xl leading-relaxed lg:text-3xl"
            }
            style={{ fontFamily: `"${family.name}", ${family.category}` }}
          >
            {CHARSET_LOWER}
          </p>
          <p
            className={
              printMode
                ? "pt-1 text-lg leading-relaxed text-muted-foreground lg:text-xl"
                : "pt-2 text-lg leading-relaxed text-muted-foreground lg:text-xl"
            }
            style={{ fontFamily: `"${family.name}", ${family.category}` }}
          >
            {CHARSET_NUMBERS}
          </p>
        </div>

        <div className={printMode ? "flex flex-col justify-center gap-0.5 lg:border-l lg:border-border/30 lg:pl-4" : "flex flex-col justify-center gap-0.5 lg:border-l lg:border-border/30 lg:pl-5"}>
          {weightLabels.map((label) => {
            const isBold =
              label === "Bold" ||
              label === "ExtraBold" ||
              label === "Black" ||
              label === "SemiBold"
            return (
              <span
                key={label}
                className={`${printMode ? "text-xs" : "text-xs"} leading-relaxed ${
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
    </div>
  )
}

function TypeScaleRow({
  scale,
  printMode,
}: {
  scale: TypeScaleEntry[]
  printMode: boolean
}) {
  return (
    <div className="grid auto-cols-fr grid-flow-col border-t border-border/40">
      {scale.map((entry) => (
        <div
          key={entry.name}
          className={`border-r border-border/30 last:border-r-0 ${printMode ? "p-2.5" : "p-4"}`}
        >
          <span className={printMode ? "block text-[10px] font-medium" : "block text-xs font-medium"}>
            {entry.name}
          </span>
          <span
            className={
              printMode
                ? "block font-mono text-[11px] text-muted-foreground"
                : "block font-mono text-[11px] text-muted-foreground"
            }
          >
            {entry.size}
          </span>
          {entry.usage && (
            <span className={printMode ? "mt-0.5 block text-[10px] text-muted-foreground/60" : "mt-0.5 block text-[10px] text-muted-foreground/60"}>
              {entry.usage}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
