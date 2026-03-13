"use client"

import { useCallback } from "react"

export function useSvgToPng() {
  const downloadAsPng = useCallback(
    async (svgUrl: string, filename: string, size: number) => {
      const response = await fetch(svgUrl)
      const svgText = await response.text()
      const svgBlob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" })
      const url = URL.createObjectURL(svgBlob)

      const img = new Image()
      img.crossOrigin = "anonymous"

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = reject
        img.src = url
      })

      const canvas = document.createElement("canvas")
      canvas.width = size
      canvas.height = size * (img.naturalHeight / img.naturalWidth)
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(url)

      const pngBlob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png")
      )
      if (!pngBlob) return

      const pngUrl = URL.createObjectURL(pngBlob)
      const link = document.createElement("a")
      link.href = pngUrl
      link.download = `${filename}-${size}w.png`
      link.click()
      URL.revokeObjectURL(pngUrl)
    },
    []
  )

  return { downloadAsPng }
}
