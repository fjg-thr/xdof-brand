"use client"

import { useState } from "react"
import { FileDown, Loader2, Menu } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { useActiveSection } from "@/hooks"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button, buttonVariants } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import type { ClientConfig, SectionMeta } from "@/lib/schema"

interface SidebarNavProps {
  client: ClientConfig
}

function ClientLogomark({ client }: { client: ClientConfig }) {
  if (client.logoSrc) {
    return (
      <>
        <img src={client.logoSrc} alt={client.name} className="h-6 w-auto dark:hidden lg:h-8" />
        {client.logoLightSrc && (
          <img
            src={client.logoLightSrc}
            alt={client.name}
            className="hidden h-6 w-auto dark:block lg:h-8"
          />
        )}
      </>
    )
  }

  return (
    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
      {client.name}
    </span>
  )
}

export function SidebarNav({ client }: SidebarNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const sectionIds = client.sections
    .filter((s) => s.enabled !== false)
    .map((s) => s.id)
  const activeId = useActiveSection(sectionIds)

  const handleNavClick = (id: string) => {
    setMobileOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const branding = (
    <div className="flex items-center justify-between px-6 py-8">
      <div>
        <ClientLogomark client={client} />
        {client.tagline && (
          <p className="mt-2 text-xs text-muted-foreground lg:hidden">
            {client.tagline}
          </p>
        )}
      </div>
      <div className="hidden lg:block">
        <ThemeToggle />
      </div>
    </div>
  )

  const navLinks = (
    <nav className="px-3 py-4" role="navigation" aria-label="Brand sections">
      {client.sections
        .filter((s) => s.enabled !== false)
        .map((section) => (
          <NavLink
            key={section.id}
            section={section}
            isActive={activeId === section.id}
            onClick={() => handleNavClick(section.id)}
          />
        ))}
    </nav>
  )

  const sidebarGradientClass =
    "bg-[linear-gradient(180deg,_#D9D9EA_0%,_#CAD5E1_100%)] dark:bg-[linear-gradient(180deg,_#121218_0%,_#171725_100%)]"
  const downloadButtonClass = cn(
    buttonVariants({ variant: "outline", size: "lg" }),
    "w-full justify-center border-border/70 bg-background/70 text-foreground backdrop-blur-sm transition-colors duration-200 hover:bg-background/90"
  )

  return (
    <>
      {/* Desktop */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden w-[280px] flex-col border-r border-border lg:flex",
          sidebarGradientClass
        )}
      >
        {branding}
        <Separator />
        <ScrollArea className="flex-1 **:data-[slot=scroll-area-scrollbar]:hidden">
          {navLinks}
        </ScrollArea>
        <Separator />
        <div className="px-3 py-4">
          <AgentSkillDownloadButton
            clientSlug={client.slug}
            clientName={client.name}
            className={cn(downloadButtonClass, "mb-2")}
          />
          <PdfDownloadButton
            clientSlug={client.slug}
            clientName={client.name}
            className={downloadButtonClass}
          />
        </div>
      </aside>

      {/* Mobile */}
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex h-14 items-center border-b border-border px-4 backdrop-blur-sm lg:hidden",
          sidebarGradientClass
        )}
      >
        <div className="flex items-center">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  aria-label="Open navigation"
                />
              }
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent
              side="left"
              className={cn("flex w-[280px] flex-col p-0", sidebarGradientClass)}
            >
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              {branding}
              <Separator />
              <ScrollArea className="flex-1 **:data-[slot=scroll-area-scrollbar]:hidden">
                {navLinks}
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2">
          <ClientLogomark client={client} />
        </div>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
    </>
  )
}

function PdfDownloadButton({
  clientSlug,
  clientName,
  className,
}: {
  clientSlug: string
  clientName: string
  className?: string
}) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    if (isDownloading) return
    setIsDownloading(true)

    try {
      const response = await fetch(`/api/clients/${clientSlug}/pdf`)
      if (!response.ok) {
        const fallback = "Could not generate PDF"
        const json = (await response.json().catch(() => null)) as
          | { error?: string; details?: string }
          | null
        throw new Error(
          [json?.error, json?.details].filter(Boolean).join(" — ") || fallback
        )
      }

      const blob = await response.blob()
      const href = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = href
      link.download = getFileNameFromHeaders(response.headers) ?? `${clientSlug}-brand-guidelines.pdf`
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(href)
      toast.success("Brand guidelines PDF download started")
    } catch (error) {
      const message = error instanceof Error ? error.message : "PDF generation failed"
      toast.error(message)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Button
      onClick={handleDownload}
      className={className}
      disabled={isDownloading}
      aria-label={`Download ${clientName} brand guidelines PDF`}
    >
      <span className="flex w-full items-center justify-between">
        <span>{isDownloading ? "Preparing PDF..." : "Download PDF"}</span>
        {isDownloading ? <Loader2 className="size-4 animate-spin" /> : <FileDown className="size-4" />}
      </span>
    </Button>
  )
}

function AgentSkillDownloadButton({
  clientSlug,
  clientName,
  className,
}: {
  clientSlug: string
  clientName: string
  className?: string
}) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    if (isDownloading) return
    setIsDownloading(true)

    try {
      const response = await fetch(`/api/clients/${clientSlug}/skill`)
      if (!response.ok) {
        const fallback = "Could not generate agent package"
        const json = (await response.json().catch(() => null)) as
          | { error?: string; details?: string }
          | null
        throw new Error(
          [json?.error, json?.details].filter(Boolean).join(" — ") || fallback
        )
      }

      const blob = await response.blob()
      const href = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = href
      link.download = getFileNameFromHeaders(response.headers) ?? `${clientSlug}-brand-guidelines-skill-package.zip`
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(href)
      toast.success("Agent package download started")
    } catch (error) {
      const message = error instanceof Error ? error.message : "Agent package generation failed"
      toast.error(message)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Button
      onClick={handleDownload}
      className={className}
      disabled={isDownloading}
      aria-label={`Download ${clientName} brand guidelines skill package for coding agents`}
    >
      <span className="flex w-full items-center justify-between">
        <span>{isDownloading ? "Preparing Package..." : "Download Agent Package"}</span>
        {isDownloading ? <Loader2 className="size-4 animate-spin" /> : <FileDown className="size-4" />}
      </span>
    </Button>
  )
}

function getFileNameFromHeaders(headers: Headers): string | null {
  const contentDisposition = headers.get("content-disposition")
  if (!contentDisposition) return null
  const match = /filename="?([^"]+)"?/i.exec(contentDisposition)
  return match?.[1] ?? null
}

function NavLink({
  section,
  isActive,
  onClick,
}: {
  section: SectionMeta
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full rounded-md px-3 py-2 text-left text-sm transition-colors",
        isActive
          ? "bg-muted/60 font-medium text-foreground"
          : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
      )}
    >
      {section.label}
    </button>
  )
}
