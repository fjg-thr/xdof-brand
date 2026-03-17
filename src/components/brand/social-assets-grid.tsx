"use client"

import { useCallback, useMemo, useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { SocialAssets, BannerVariant } from "@/lib/schema"

interface SocialAssetsGridProps {
  socialAssets: SocialAssets
}

const AVATAR_SIZES = [200, 400, 800]

export function SocialAssetsGrid({ socialAssets }: SocialAssetsGridProps) {
  const tabs = useMemo(() => {
    const seen = new Set<string>()
    return socialAssets.banners
      .map((b) => b.tab)
      .filter((t) => {
        if (seen.has(t)) return false
        seen.add(t)
        return true
      })
  }, [socialAssets.banners])

  const [activeTab, setActiveTab] = useState(tabs[0] ?? "")

  const filteredBanners = useMemo(
    () => socialAssets.banners.filter((b) => b.tab === activeTab),
    [socialAssets.banners, activeTab]
  )

  return (
    <div className="space-y-16">
      {socialAssets.avatars.length > 0 && (
        <div>
          <h3 className="text-lg font-medium">Profile Avatars</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Square profile images for Slack, X, LinkedIn, Instagram, and other
            accounts. Hover to download at various sizes.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            {socialAssets.avatars.map((avatar) => (
              <div key={avatar.label} className="space-y-2">
                <div
                  className="group relative flex h-28 w-28 items-center justify-center rounded-xl ring-1 ring-border/30"
                  style={{ backgroundColor: avatar.bgColor }}
                >
                  <img
                    src={avatar.logoSrc}
                    alt={`Avatar — ${avatar.label}`}
                    className="h-12 w-12 object-contain"
                  />
                  <div className="absolute inset-0 flex items-end justify-center rounded-xl opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                    <div className="mb-2">
                      <AvatarDownloadButton
                        bgColor={avatar.bgColor}
                        logoSrc={avatar.logoSrc}
                        label={avatar.label}
                      />
                    </div>
                  </div>
                </div>
                <span className="block text-center text-[11px] text-muted-foreground">
                  {avatar.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {socialAssets.banners.length > 0 && (
        <div>
          <h3 className="text-lg font-medium">Cover Images</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Banner and cover images sized for major social platforms. Hover to
            download.
          </p>

          {tabs.length > 1 && (
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mt-6"
            >
              <TabsList className="w-full">
                {tabs.map((tab) => (
                  <TabsTrigger key={tab} value={tab} className="flex-1">
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}

          <div className="mt-6 space-y-6">
            {filteredBanners.map((banner, i) => (
              <BannerPreview key={`${banner.label}-${i}`} banner={banner} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function AvatarDownloadButton({
  bgColor,
  logoSrc,
  label,
}: {
  bgColor: string
  logoSrc: string
  label: string
}) {
  const slug = `xdof-avatar-${label.toLowerCase()}`

  const downloadAvatar = useCallback(
    async (size: number) => {
      const canvas = document.createElement("canvas")
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, size, size)

      const img = new Image()
      img.crossOrigin = "anonymous"
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = reject
        img.src = logoSrc
      })

      const logoSize = size * 0.45
      const offset = (size - logoSize) / 2
      ctx.drawImage(img, offset, offset, logoSize, logoSize)

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png")
      )
      if (!blob) return

      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${slug}-${size}x${size}.png`
      link.click()
      URL.revokeObjectURL(url)
    },
    [bgColor, logoSrc, slug]
  )

  return (
    <div className="flex gap-1">
      {AVATAR_SIZES.map((size) => (
        <button
          key={size}
          onClick={() => downloadAvatar(size)}
          className="rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm hover:bg-black/80"
        >
          {size}
        </button>
      ))}
    </div>
  )
}

function BannerPreview({ banner }: { banner: BannerVariant }) {
  const hasSrc = !!banner.src
  const ratio = banner.width / banner.height

  return (
    <div className="space-y-2">
      <div className="flex items-baseline gap-2">
        <span className="text-sm font-medium">{banner.label}</span>
        <span className="font-mono text-[11px] text-muted-foreground">
          {banner.width} &times; {banner.height}
        </span>
      </div>
      <div
        className="group relative overflow-hidden rounded-lg ring-1 ring-border/30"
        style={{ aspectRatio: `${ratio}` }}
      >
        {hasSrc ? (
          <img
            src={banner.src}
            alt={`${banner.platform} — ${banner.label}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <GeneratedBannerPreview banner={banner} />
        )}
        <div className="absolute bottom-3 right-3 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
          {hasSrc ? (
            <SourceBannerDownload banner={banner} />
          ) : (
            <GeneratedBannerDownload banner={banner} />
          )}
        </div>
      </div>
    </div>
  )
}

function GeneratedBannerPreview({ banner }: { banner: BannerVariant }) {
  const [from, to] = banner.bgGradient ?? ["#121218", "#171725"]

  return (
    <div
      className="relative flex h-full w-full items-center justify-center"
      style={{
        background: `linear-gradient(180deg, ${from} 0%, ${to} 100%)`,
      }}
    >
      {banner.tileLogoSrc && (
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url(${banner.tileLogoSrc})`,
            backgroundSize: "28px 28px",
            backgroundRepeat: "repeat",
            backgroundPosition: "4px 4px",
            mixBlendMode: "soft-light",
          }}
        />
      )}
      {banner.wordmarkSrc && (
        <img
          src={banner.wordmarkSrc}
          alt=""
          className="relative z-10 w-1/5 max-w-[200px] object-contain"
        />
      )}
    </div>
  )
}

function SourceBannerDownload({ banner }: { banner: BannerVariant }) {
  const slug = `xdof-${banner.tab.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${banner.label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`

  const download = useCallback(async () => {
    if (!banner.src) return

    const img = new Image()
    img.crossOrigin = "anonymous"
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve()
      img.onerror = reject
      img.src = banner.src!
    })

    const canvas = document.createElement("canvas")
    canvas.width = banner.width
    canvas.height = banner.height
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.drawImage(img, 0, 0, banner.width, banner.height)

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/png")
    )
    if (!blob) return

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${slug}-${banner.width}x${banner.height}.png`
    link.click()
    URL.revokeObjectURL(url)
  }, [banner, slug])

  return (
    <button
      onClick={download}
      className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-3 py-1.5 text-sm font-medium text-black shadow-md transition-colors hover:bg-gray-50"
    >
      Download PNG
    </button>
  )
}

function GeneratedBannerDownload({ banner }: { banner: BannerVariant }) {
  const slug = `xdof-${banner.tab.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${banner.label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`
  const [from, to] = banner.bgGradient ?? ["#121218", "#171725"]

  const loadImg = useCallback(async (src: string) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve()
      img.onerror = reject
      img.src = src
    })
    return img
  }, [])

  const download = useCallback(async () => {
    const canvas = document.createElement("canvas")
    canvas.width = banner.width
    canvas.height = banner.height
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const grad = ctx.createLinearGradient(0, 0, 0, banner.height)
    grad.addColorStop(0, from)
    grad.addColorStop(1, to)
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, banner.width, banner.height)

    if (banner.tileLogoSrc) {
      const tileImg = await loadImg(banner.tileLogoSrc)
      const tileSize = 28
      const gap = 8
      ctx.globalAlpha = 0.05
      for (let y = 4; y < banner.height; y += tileSize + gap) {
        for (let x = 4; x < banner.width; x += tileSize + gap) {
          ctx.drawImage(tileImg, x, y, tileSize, tileSize)
        }
      }
      ctx.globalAlpha = 1.0
    }

    if (banner.wordmarkSrc) {
      const img = await loadImg(banner.wordmarkSrc)
      const wmWidth = banner.width * 0.18
      const wmHeight = wmWidth * (img.naturalHeight / img.naturalWidth)
      const x = (banner.width - wmWidth) / 2
      const y = (banner.height - wmHeight) / 2
      ctx.drawImage(img, x, y, wmWidth, wmHeight)
    }

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/png")
    )
    if (!blob) return

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${slug}-${banner.width}x${banner.height}.png`
    link.click()
    URL.revokeObjectURL(url)
  }, [banner, from, to, slug, loadImg])

  return (
    <button
      onClick={download}
      className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-3 py-1.5 text-sm font-medium text-black shadow-md transition-colors hover:bg-gray-50"
    >
      Download PNG
    </button>
  )
}
