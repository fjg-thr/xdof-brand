import { ExternalLink } from "lucide-react"
import type { TemplateCollection, TemplateItem } from "@/lib/schema"

interface TemplateLinkGridProps {
  templates: TemplateCollection
}

const TYPE_LABELS: Record<TemplateItem["type"], string> = {
  "google-slides": "Google Slides",
  "google-docs": "Google Docs",
  canva: "Canva",
  figma: "Figma",
  other: "Template",
}

export function TemplateLinkGrid({ templates }: TemplateLinkGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {templates.templates.map((template) => (
        <TemplateCard key={template.url} template={template} />
      ))}
    </div>
  )
}

function TemplateCard({ template }: { template: TemplateItem }) {
  return (
    <a
      href={template.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg border border-border/50 p-5 transition-colors hover:border-border"
    >
      {template.previewUrl && (
        <div className="mb-4 aspect-video overflow-hidden rounded bg-muted">
          <img
            src={template.previewUrl}
            alt={template.name}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium transition-colors group-hover:text-primary">
            {template.name}
          </p>
          <span className="text-xs text-muted-foreground">
            {TYPE_LABELS[template.type]}
          </span>
          {template.description && (
            <p className="mt-1 text-xs text-muted-foreground">
              {template.description}
            </p>
          )}
        </div>
        <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
      </div>
    </a>
  )
}
