import { notFound } from "next/navigation"
import { getClient } from "@/lib/clients"
import { SECTION_IDS } from "@/lib/schema"
import type { BrandContent } from "@/lib/schema"
import {
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
  FontProvider,
} from "@/components/brand"
import { themeToStyleTag } from "@/lib/tokens"

interface PrintClientPageProps {
  params: Promise<{ client: string }>
}

const sectionComponent = (
  id: string,
  brand: BrandContent,
  branding: { name: string; wordmarkSrc?: string; wordmarkLightSrc?: string }
) => {
  switch (id) {
    case SECTION_IDS.OVERVIEW:
      return (
        <BrandHeader
          overview={brand.overview}
          brandName={branding.name}
          wordmarkSrc={branding.wordmarkSrc}
          wordmarkLightSrc={branding.wordmarkLightSrc}
        />
      )
    case SECTION_IDS.LOGOS:
      return <LogoPreviewBlock logos={brand.logos} printMode />
    case SECTION_IDS.MASCOT:
      return brand.mascot ? <MascotPreviewBlock mascot={brand.mascot} printMode /> : null
    case SECTION_IDS.COLORS:
      return <ColorSwatchGrid palette={brand.colors} readOnly printMode />
    case SECTION_IDS.TYPOGRAPHY:
      return <TypographySpecimen typography={brand.typography} printMode />
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
      return <ImageGallery gallery={brand.gallery} printMode />
    case SECTION_IDS.GUIDANCE:
      return brand.guidance ? <GuidanceBlock guidance={brand.guidance} /> : null
    case SECTION_IDS.CONTACT:
      return <ContactSection contact={brand.contact} />
    default:
      return null
  }
}

function buildPdfTocEntries(
  sections: Array<{ id: string; label: string }>,
  brand: BrandContent
) {
  const entries: Array<{ id: string; label: string; page: number }> = []
  let currentPage = 3

  for (const section of sections) {
    entries.push({ id: section.id, label: section.label, page: currentPage++ })

    if (section.id === SECTION_IDS.LOGOS) {
      const pairCount = Math.ceil(brand.logos.variants.length / 2)
      const instructionCount = brand.logos.buildDiagramSrc ? 1 : 0
      currentPage += Math.max(0, pairCount + instructionCount - 1)
    } else if (section.id === SECTION_IDS.COLORS) {
      currentPage += Math.max(0, brand.colors.groups.length - 1)
    } else if (section.id === SECTION_IDS.GALLERY) {
      currentPage += Math.max(0, brand.gallery.images.length - 1)
    } else if (section.id === SECTION_IDS.TYPOGRAPHY) {
      const typographyPages = brand.typography.families.slice(1).length > 0 ? 2 : 1
      currentPage += Math.max(0, typographyPages - 1)
    }
  }

  return entries
}

export default async function PrintClientPage({ params }: PrintClientPageProps) {
  const { client: slug } = await params
  const config = getClient(slug)
  if (!config) notFound()

  const excludedPdfSections: Set<string> = new Set([
    SECTION_IDS.SOCIAL_ASSETS,
    SECTION_IDS.CHARTS,
    SECTION_IDS.TEMPLATES,
  ])
  const sections = config.sections.filter(
    (section) => section.enabled !== false && !excludedPdfSections.has(section.id)
  )
  const formattedDate = new Date().toLocaleDateString("en-US").replaceAll("/", ".")
  const fontFamilies = config.brand.typography.families.map((family) => family.name)
  const tocEntries = buildPdfTocEntries(sections, config.brand)

  return (
    <>
      <FontProvider families={fontFamilies} />
      <style dangerouslySetInnerHTML={{ __html: themeToStyleTag(config.theme) }} />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @page {
              size: 13.333in 7.5in;
              margin: 0.45in;
            }
            html, body {
              background: hsl(var(--background));
              color: hsl(var(--foreground));
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .pdf-document {
              width: 100%;
            }
            .pdf-cover {
              break-after: page;
              min-height: calc(7.5in - 1.1in);
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              border: 1px solid hsl(var(--border));
              border-radius: 12px;
              padding: 0.4in;
              background: linear-gradient(180deg, #D9D9EA 0%, #CAD5E1 100%);
            }
            .dark .pdf-cover {
              background: linear-gradient(180deg, #121218 0%, #171725 100%);
            }
            .pdf-section {
              break-before: page;
              min-height: calc(7.5in - 1.1in);
            }
            .pdf-section > * {
              break-inside: avoid;
              page-break-inside: avoid;
            }
            .pdf-section-body {
              margin-top: 0.2in;
            }
            .pdf-section-body > * {
              break-inside: avoid;
              page-break-inside: avoid;
            }
            .pdf-toc {
              break-before: page;
              min-height: calc(7.5in - 1.1in);
              border: 1px solid hsl(var(--border));
              border-radius: 12px;
              padding: 0.32in;
              background: hsl(var(--card));
            }
            .pdf-toc-row {
              display: grid;
              grid-template-columns: 1fr auto;
              align-items: center;
              gap: 0.25in;
              border-bottom: 1px solid hsl(var(--border) / 0.55);
              padding: 0.09in 0;
              color: inherit;
              text-decoration: none;
            }
            .pdf-toc-row:last-child {
              border-bottom: 0;
            }
            .pdf-subsection-page {
              break-before: page;
              min-height: calc(7.5in - 1.1in);
            }
            .pdf-subsection-page:first-child {
              break-before: auto;
            }
            .pdf-document button,
            .pdf-document [data-slot="button"],
            .pdf-document [role="button"] {
              display: none !important;
            }
          `,
        }}
      />
      <main className="pdf-document p-0">
        <section className="pdf-cover">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Brand Guidelines
            </p>
            <div className="mt-6">
              {config.wordmarkSrc ? (
                <>
                  <img src={config.wordmarkSrc} alt={config.name} className="h-16 w-auto dark:hidden" />
                  {config.wordmarkLightSrc && (
                    <img
                      src={config.wordmarkLightSrc}
                      alt={config.name}
                      className="hidden h-16 w-auto dark:block"
                    />
                  )}
                </>
              ) : (
                <h1 className="text-5xl font-bold tracking-tight">{config.name}</h1>
              )}
            </div>
            {config.description && (
              <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
                {config.brand.overview.description}
              </p>
            )}
          </div>
          <div className="flex items-end justify-between text-sm text-muted-foreground">
            <span>Robotics foundation models for real-world work.</span>
            <span>{formattedDate}</span>
          </div>
        </section>

        <section className="pdf-toc">
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Table of Contents
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Contents</h2>
          </header>
          <div className="mt-4">
            {tocEntries.map((entry) => (
              <a
                key={`${entry.id}-${entry.page}`}
                href={`#pdf-section-${entry.id}`}
                className="pdf-toc-row"
              >
                <span className="text-[15px] font-medium">{entry.label}</span>
                <span className="font-mono text-xs text-muted-foreground">{entry.page}</span>
              </a>
            ))}
          </div>
        </section>

        {sections.map((section) => {
          const content = sectionComponent(section.id, config.brand, {
            name: config.name,
            wordmarkSrc: config.wordmarkSrc,
            wordmarkLightSrc: config.wordmarkLightSrc,
          })
          if (!content) return null

          const hasSubsectionPaging =
            section.id === SECTION_IDS.LOGOS ||
            section.id === SECTION_IDS.COLORS ||
            section.id === SECTION_IDS.TYPOGRAPHY ||
            section.id === SECTION_IDS.GALLERY

          if (hasSubsectionPaging) {
            return (
              <div key={section.id} id={`pdf-section-${section.id}`} className="pdf-section-start">
                {content}
              </div>
            )
          }

          const isOverview = section.id === SECTION_IDS.OVERVIEW

          return (
            <section key={section.id} className="pdf-section">
              <div id={`pdf-section-${section.id}`} />
              {!isOverview && (
                <header>
                  <h2 className="text-2xl font-semibold tracking-tight">{section.label}</h2>
                </header>
              )}
              <div className="pdf-section-body">{content}</div>
            </section>
          )
        })}
      </main>
    </>
  )
}
