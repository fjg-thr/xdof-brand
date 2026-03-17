"use client"

import { useState, useEffect } from "react"

export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "")

  useEffect(() => {
    if (sectionIds.length === 0) return

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)

    if (sections.length === 0) return

    const updateActiveSection = () => {
      const scrollBottom = window.scrollY + window.innerHeight
      const pageBottom = document.documentElement.scrollHeight - 2

      // Ensure the final section can become active at the bottom of the page.
      if (scrollBottom >= pageBottom) {
        const lastSection = sections[sections.length - 1]
        setActiveId(lastSection.id)
        return
      }

      const threshold = window.innerHeight * 0.35
      let nextActiveId = sections[0].id

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= threshold) {
          nextActiveId = section.id
          continue
        }
        break
      }

      setActiveId(nextActiveId)
    }

    updateActiveSection()
    window.addEventListener("scroll", updateActiveSection, { passive: true })
    window.addEventListener("resize", updateActiveSection)

    return () => {
      window.removeEventListener("scroll", updateActiveSection)
      window.removeEventListener("resize", updateActiveSection)
    }
  }, [sectionIds])

  return activeId
}
