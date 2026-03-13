"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
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
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import type { ClientConfig, SectionMeta } from "@/lib/schema"

interface SidebarNavProps {
  client: ClientConfig
}

function ClientWordmark({ client }: { client: ClientConfig }) {
  if (client.wordmarkSrc) {
    return (
      <>
        <img
          src={client.wordmarkSrc}
          alt={client.name}
          className="h-5 w-auto dark:hidden"
        />
        {client.wordmarkLightSrc && (
          <img
            src={client.wordmarkLightSrc}
            alt={client.name}
            className="hidden h-5 w-auto dark:block"
          />
        )}
      </>
    )
  }

  if (client.logoSrc) {
    return <img src={client.logoSrc} alt={client.name} className="h-8 w-auto" />
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
        <ClientWordmark client={client} />
        {client.tagline && (
          <p className="mt-2 text-xs text-muted-foreground lg:hidden">
            {client.tagline}
          </p>
        )}
      </div>
      <ThemeToggle />
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

  return (
    <>
      {/* Desktop */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[280px] flex-col border-r border-border bg-card lg:flex">
        {branding}
        <Separator />
        <ScrollArea className="flex-1 **:data-[slot=scroll-area-scrollbar]:hidden">
          {navLinks}
        </ScrollArea>
      </aside>

      {/* Mobile */}
      <div className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-card/95 px-4 backdrop-blur-sm lg:hidden">
        <div className="flex items-center">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-3"
                  aria-label="Open navigation"
                />
              }
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left" className="flex w-[280px] flex-col p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              {branding}
              <Separator />
              <ScrollArea className="flex-1 **:data-[slot=scroll-area-scrollbar]:hidden">
                {navLinks}
              </ScrollArea>
            </SheetContent>
          </Sheet>
          <ClientWordmark client={client} />
        </div>
        <ThemeToggle />
      </div>
    </>
  )
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
