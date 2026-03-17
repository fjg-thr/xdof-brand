import JSZip from "jszip"
import { NextResponse } from "next/server"
import type { ClientConfig, ColorEntry, GuidanceRule, LogoVariant, TypeScaleEntry } from "@/lib/schema"
import { getClient } from "@/lib/clients"

interface RouteContext {
  params: Promise<{ client: string }>
}

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function normalizeName(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-")
}

function toAbsoluteUrl(pathOrUrl: string, origin: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  const normalizedPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`
  return `${origin}${normalizedPath}`
}

function pickDownloadableLogoVariants(variants: LogoVariant[]): LogoVariant[] {
  return variants.filter((variant) => Boolean(variant.downloadUrl))
}

function flattenColors(config: ClientConfig): ColorEntry[] {
  return config.brand.colors.groups.flatMap((group) => group.colors)
}

function flattenUsageRules(config: ClientConfig): GuidanceRule[] {
  return config.brand.guidance?.rules ?? []
}

function formatTypeScale(scale: TypeScaleEntry[] | undefined): string {
  if (!scale?.length) return "- Use documented typography hierarchy from this brand guide.\n"
  return scale
    .map((entry) => {
      const parts = [
        `size ${entry.size}`,
        `weight ${entry.weight}`,
        `line-height ${entry.lineHeight}`,
      ]
      if (entry.family) parts.push(`family ${entry.family}`)
      if (entry.usage) parts.push(`usage ${entry.usage}`)
      return `- ${entry.name}: ${parts.join(", ")}.`
    })
    .join("\n")
}

function buildHeader(config: ClientConfig, origin: string): string {
  const sectionLabels = config.sections
    .filter((section) => section.enabled !== false)
    .map((section) => section.label)
    .join(", ")

  return [
    `- Brand guide URL: ${origin}/${config.slug}`,
    `- Printable PDF endpoint: ${origin}/api/clients/${config.slug}/pdf`,
    `- Available sections: ${sectionLabels}`,
  ].join("\n")
}

function buildSkillMarkdown(config: ClientConfig, origin: string, packageName: string): string {
  const slug = normalizeName(config.slug)
  const overview = config.brand.overview

  return `---
name: ${slug}-brand-guidelines
description: Apply ${config.name} brand guidelines to product UI and marketing surfaces. Use when implementing layouts, tokens, assets, or components that must follow ${config.name} brand standards.
---

# ${config.name} Brand Guidelines Skill

## Package contents
- This zip package should be stored at \`.cursor/skills/${packageName}/\`.
- Read \`reference.md\` for full standards and \`examples.md\` for implementation patterns.
- Use \`quick-checklist.md\` as final QA before shipping.

## Source of truth
${buildHeader(config, origin)}

## Mission and voice
- Headline: ${overview.headline}
- Description: ${overview.description}

## Implementation workflow for agents
1. Load this skill package before proposing UI changes.
2. Ground implementation choices in \`reference.md\`.
3. Follow \`examples.md\` for component-level execution patterns.
4. Enforce all Do/Don't rules and exact tokens listed in \`assets-manifest.json\`.
5. Complete every check in \`quick-checklist.md\` before final output.
`
}

function buildReferenceMarkdown(config: ClientConfig, origin: string): string {
  const logoVariants = pickDownloadableLogoVariants(config.brand.logos.variants)
  const colors = flattenColors(config)
  const guidanceRules = flattenUsageRules(config)
  const doRules = guidanceRules.filter((rule) => rule.type === "do")
  const dontRules = guidanceRules.filter((rule) => rule.type === "dont")
  const logoGuidelines = config.brand.logos.guidelines?.length
    ? config.brand.logos.guidelines.map((guideline) => `- ${guideline}`).join("\n")
    : "- Follow approved logo usage and spacing constraints.\n"

  const downloadableLogos = logoVariants.length
    ? logoVariants
        .map((variant) => `- ${variant.name}: ${toAbsoluteUrl(variant.downloadUrl!, origin)}`)
        .join("\n")
    : "- No logo download URLs are currently configured.\n"

  const colorTokens = colors.length
    ? colors.map((color) => `- ${color.name}: ${color.hex}${color.usage ? ` (${color.usage})` : ""}`).join("\n")
    : "- No color tokens are currently configured.\n"

  const typeFamilies = config.brand.typography.families.length
    ? config.brand.typography.families
        .map((family) => {
          const weights = family.weights.map((weight) => weight.value).join(", ")
          const stack = family.fontStackCss ? ` stack ${family.fontStackCss}` : ""
          return `- ${family.name} (${family.category}) weights ${weights}.${stack}`
        })
        .join("\n")
    : "- No font families are currently configured.\n"

  const doList = doRules.length
    ? doRules.map((rule) => `- ${rule.label}${rule.description ? `: ${rule.description}` : ""}`).join("\n")
    : "- Keep implementation consistent with approved brand system.\n"

  const dontList = dontRules.length
    ? dontRules.map((rule) => `- ${rule.label}${rule.description ? `: ${rule.description}` : ""}`).join("\n")
    : "- Avoid ad-hoc visual treatments not present in the guidelines.\n"

  return `# ${config.name} Reference

## Source of truth
${buildHeader(config, origin)}

## Mandatory logo rules
${logoGuidelines}

### Clear space
- ${config.brand.logos.clearSpace ?? "Use default clear-space proportional spacing around logos."}

### Minimum size
- ${config.brand.logos.minimumSize ?? "Respect platform-specific logo minimums to maintain legibility."}

## Approved logo assets
${downloadableLogos}

## Color tokens (exact hex values)
${colorTokens}

## Typography system
### Families
${typeFamilies}

### Type scale
${formatTypeScale(config.brand.typography.scale)}

## Usage guidance
### Do
${doList}

### Don't
${dontList}
`
}

function buildExamplesMarkdown(config: ClientConfig): string {
  const primary = config.theme.colors.primary
  const background = config.theme.colors.background
  const foreground = config.theme.colors.foreground

  return `# ${config.name} Implementation Examples

## Prompt snippet: create a new component
\`\`\`
Implement this UI using the ${config.name} brand guidelines skill package.
- Keep layout structure and semantics unchanged.
- Use approved tokens only from assets-manifest.json.
- Follow logo clear-space and minimum-size constraints.
- Ensure accessible contrast and keyboard interaction.
\`\`\`

## Example: button styling guidance
- Base background token should map to brand primary ${primary} for key actions.
- Base page/background token should map to ${background}.
- Default foreground text should map to ${foreground}.
- Use a single accent color for highlights; do not introduce ad-hoc gradients.

## Example: logo placement
- Use only approved downloadable files from assets manifest.
- Never stretch, distort, rotate, recolor, or apply effects to logos.
- Maintain clear space in dense layouts (headers, cards, hero blocks).

## Example: typography usage
- Headings must use approved heading family stack from reference.
- Body and metadata should follow the documented type scale hierarchy.
- Monospace usage should be limited to telemetry, code-like labels, and data contexts.
`
}

function buildChecklistMarkdown(config: ClientConfig): string {
  return `# ${config.name} Quick Checklist

- [ ] Only approved logo files are used (no edits, no redraws, no recolors).
- [ ] Logo minimum size and clear space rules are respected.
- [ ] All colors map to approved brand tokens; no ad-hoc hex values.
- [ ] Typography families and scale match the documented hierarchy.
- [ ] Components align with Do/Don't guidance from reference.md.
- [ ] Contrast and accessibility checks pass for interactive UI.
`
}

function buildAssetsManifest(config: ClientConfig, origin: string) {
  return {
    client: config.slug,
    clientName: config.name,
    brandGuideUrl: `${origin}/${config.slug}`,
    pdfUrl: `${origin}/api/clients/${config.slug}/pdf`,
    logos: config.brand.logos.variants
      .filter((variant) => Boolean(variant.downloadUrl))
      .map((variant) => ({
        name: variant.name,
        url: toAbsoluteUrl(variant.downloadUrl!, origin),
      })),
    mascot: (config.brand.mascot?.variants ?? [])
      .filter((variant) => Boolean(variant.downloadUrl))
      .map((variant) => ({
        name: variant.label,
        url: toAbsoluteUrl(variant.downloadUrl!, origin),
      })),
    assets: config.brand.assets.groups.flatMap((group) =>
      group.assets.map((asset) => ({
        group: group.name,
        name: asset.name,
        format: asset.format,
        url: toAbsoluteUrl(asset.downloadUrl, origin),
      }))
    ),
    socialBanners: (config.brand.socialAssets?.banners ?? [])
      .filter((banner) => Boolean(banner.src))
      .map((banner) => ({
        tab: banner.tab,
        label: banner.label,
        platform: banner.platform,
        width: banner.width,
        height: banner.height,
        url: toAbsoluteUrl(banner.src!, origin),
      })),
    gallery: config.brand.gallery.images.map((image) => ({
      alt: image.alt,
      caption: image.caption ?? null,
      url: toAbsoluteUrl(image.src, origin),
    })),
  }
}

function buildFileName(clientSlug: string): string {
  return `${normalizeName(clientSlug)}-brand-guidelines-skill-package.zip`
}

export async function GET(request: Request, context: RouteContext) {
  const { client } = await context.params
  const config = getClient(client)
  if (!config) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 })
  }

  const origin = new URL(request.url).origin
  const packageName = `${normalizeName(config.slug)}-brand-guidelines`
  const zip = new JSZip()
  const folder = zip.folder(packageName)

  if (!folder) {
    return NextResponse.json({ error: "Could not create package folder" }, { status: 500 })
  }

  folder.file("SKILL.md", buildSkillMarkdown(config, origin, packageName))
  folder.file("reference.md", buildReferenceMarkdown(config, origin))
  folder.file("examples.md", buildExamplesMarkdown(config))
  folder.file("quick-checklist.md", buildChecklistMarkdown(config))
  folder.file(
    "assets-manifest.json",
    JSON.stringify(buildAssetsManifest(config, origin), null, 2)
  )

  const zipBuffer = await zip.generateAsync({
    type: "arraybuffer",
    compression: "DEFLATE",
    compressionOptions: { level: 9 },
  })
  const fileName = buildFileName(config.slug)

  return new NextResponse(zipBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Cache-Control": "no-store",
    },
  })
}
