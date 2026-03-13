import { notFound } from "next/navigation"
import { getClient, getAllClientSlugs } from "@/lib/clients"
import { SECTION_IDS } from "@/lib/schema"
import type { BrandContent } from "@/lib/schema"
import {
  SectionWrapper,
  BrandHeader,
  LogoPreviewBlock,
  MascotPreviewBlock,
  ColorSwatchGrid,
  TypographySpecimen,
  SocialAssetsGrid,
  ChartsShowcase,
  AssetDownloadGrid,
  TemplateLinkGrid,
  ImageGallery,
  GuidanceBlock,
  ContactSection,
} from "@/components/brand"

export async function generateStaticParams() {
  return getAllClientSlugs().map((slug) => ({ client: slug }))
}

interface ClientPageProps {
  params: Promise<{ client: string }>
}

const sectionComponent = (id: string, brand: BrandContent) => {
  switch (id) {
    case SECTION_IDS.OVERVIEW:
      return <BrandHeader overview={brand.overview} />
    case SECTION_IDS.LOGOS:
      return <LogoPreviewBlock logos={brand.logos} />
    case SECTION_IDS.MASCOT:
      return brand.mascot ? <MascotPreviewBlock mascot={brand.mascot} /> : null
    case SECTION_IDS.COLORS:
      return <ColorSwatchGrid palette={brand.colors} />
    case SECTION_IDS.TYPOGRAPHY:
      return <TypographySpecimen typography={brand.typography} />
    case SECTION_IDS.SOCIAL_ASSETS:
      return brand.socialAssets ? (
        <SocialAssetsGrid socialAssets={brand.socialAssets} />
      ) : null
    case SECTION_IDS.CHARTS:
      return brand.charts ? <ChartsShowcase palette={brand.colors} /> : null
    case SECTION_IDS.ASSETS:
      return <AssetDownloadGrid assets={brand.assets} />
    case SECTION_IDS.TEMPLATES:
      return <TemplateLinkGrid templates={brand.templates} />
    case SECTION_IDS.GALLERY:
      return <ImageGallery gallery={brand.gallery} />
    case SECTION_IDS.GUIDANCE:
      return brand.guidance ? (
        <GuidanceBlock guidance={brand.guidance} />
      ) : null
    case SECTION_IDS.CONTACT:
      return <ContactSection contact={brand.contact} />
    default:
      return null
  }
}

export default async function ClientPage({ params }: ClientPageProps) {
  const { client: slug } = await params
  const config = getClient(slug)
  if (!config) notFound()

  const { brand } = config

  return (
    <>
      {config.sections
        .filter((s) => s.enabled !== false)
        .map((section) => {
          const content = sectionComponent(section.id, brand)
          if (!content) return null

          const isOverview = section.id === SECTION_IDS.OVERVIEW

          return (
            <SectionWrapper
              key={section.id}
              id={section.id}
              title={isOverview ? undefined : section.label}
            >
              {content}
            </SectionWrapper>
          )
        })}
    </>
  )
}
