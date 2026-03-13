"use client"

import { useState, useEffect, useRef } from "react"

export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "")
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (sectionIds.length === 0) return

    observer.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible[0]) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: "-10% 0px -80% 0px" }
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.current.observe(el)
    }

    return () => observer.current?.disconnect()
  }, [sectionIds])

  return activeId
}
