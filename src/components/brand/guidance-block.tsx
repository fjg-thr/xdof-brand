import { Check, X } from "lucide-react"
import type { GuidanceConfig, GuidanceRule } from "@/lib/schema"

interface GuidanceBlockProps {
  guidance: GuidanceConfig
}

export function GuidanceBlock({ guidance }: GuidanceBlockProps) {
  if (!guidance.rules || guidance.rules.length === 0) return null

  const dos = guidance.rules.filter((r) => r.type === "do")
  const donts = guidance.rules.filter((r) => r.type === "dont")

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
      <RuleColumn
        heading="Do"
        icon={<Check className="h-4 w-4" />}
        accentClass="text-emerald-700"
        rules={dos}
      />
      <RuleColumn
        heading="Don&rsquo;t"
        icon={<X className="h-4 w-4" />}
        accentClass="text-red-600"
        rules={donts}
      />
    </div>
  )
}

function RuleColumn({
  heading,
  icon,
  accentClass,
  rules,
}: {
  heading: string
  icon: React.ReactNode
  accentClass: string
  rules: GuidanceRule[]
}) {
  if (rules.length === 0) return null

  return (
    <div>
      <h3 className={`mb-5 flex items-center gap-2 text-base font-semibold ${accentClass}`}>
        {icon}
        {heading}
      </h3>
      <div className="grid auto-rows-fr gap-4">
        {rules.map((rule) => (
          <RuleCard key={rule.label} rule={rule} />
        ))}
      </div>
    </div>
  )
}

function RuleCard({ rule }: { rule: GuidanceRule }) {
  return (
    <div className="flex h-full min-h-28 flex-col rounded-lg border border-border/50 bg-card p-4">
      {rule.imageSrc && (
        <div className="mb-3 overflow-hidden rounded">
          <img src={rule.imageSrc} alt={rule.label} className="w-full" />
        </div>
      )}
      <p className="text-sm font-medium">{rule.label}</p>
      {rule.description && (
        <p className="mt-1 text-xs text-muted-foreground">
          {rule.description}
        </p>
      )}
    </div>
  )
}
