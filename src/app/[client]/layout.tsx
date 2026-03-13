import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getClient } from "@/lib/clients"
import { themeToStyleTag } from "@/lib/tokens"
import { SidebarNav, FontProvider } from "@/components/brand"

interface ClientLayoutProps {
  children: React.ReactNode
  params: Promise<{ client: string }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ client: string }>
}): Promise<Metadata> {
  const { client: slug } = await params
  const config = getClient(slug)
  if (!config) return {}

  return {
    title: config.meta?.title ?? `${config.name} — Brand Guidelines`,
    description: config.meta?.description ?? config.description,
  }
}

export default async function ClientLayout({
  children,
  params,
}: ClientLayoutProps) {
  const { client: slug } = await params
  const config = getClient(slug)
  if (!config) notFound()

  const fontFamilies = config.brand.typography.families.map((f) => f.name)

  return (
    <>
      <FontProvider families={fontFamilies} />
      <style dangerouslySetInnerHTML={{ __html: themeToStyleTag(config.theme) }} />
      <SidebarNav client={config} />
      <main className="lg:pl-[280px]">
        <div className="mx-auto max-w-4xl px-6 pb-24 pt-20 lg:px-12 lg:pt-8">
          {children}
        </div>
      </main>
    </>
  )
}
