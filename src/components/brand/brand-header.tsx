import type { BrandOverview } from "@/lib/schema"

interface BrandHeaderProps {
  overview: BrandOverview
}

export function BrandHeader({ overview }: BrandHeaderProps) {
  return (
    <div>
      <div className="max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          Brand Guidelines
        </p>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          {overview.headline}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
          {overview.description}
        </p>
      </div>

      {overview.values && overview.values.length > 0 && (
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {overview.values.map((value) => (
            <div key={value.title}>
              <h3 className="font-semibold">{value.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
