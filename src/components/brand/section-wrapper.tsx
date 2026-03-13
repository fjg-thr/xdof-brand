import { cn } from "@/lib/utils"

interface SectionWrapperProps {
  id: string
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function SectionWrapper({
  id,
  title,
  description,
  children,
  className,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-14 md:scroll-mt-16 py-16 md:py-24", className)}
    >
      {title && (
        <div className="mb-10 md:mb-14">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            {title}
          </h2>
          {description && (
            <p className="mt-3 max-w-2xl text-base text-muted-foreground leading-relaxed md:text-lg">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  )
}
