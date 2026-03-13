// ---------------------------------------------------------------------------
// Content schema: strongly typed domain model for brand guideline sites.
// All editable content flows through these types. UI never hardcodes client
// copy — it always receives data conforming to these interfaces.
// ---------------------------------------------------------------------------

export interface ClientConfig {
  slug: string
  name: string
  tagline?: string
  description?: string
  logoSrc?: string
  wordmarkSrc?: string
  wordmarkLightSrc?: string
  sections: SectionMeta[]
  brand: BrandContent
  theme: ThemeConfig
  meta?: SiteMeta
}

export interface SiteMeta {
  title?: string
  description?: string
  ogImage?: string
}

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

export interface SectionMeta {
  id: string
  label: string
  enabled?: boolean
}

// ---------------------------------------------------------------------------
// Brand content
// ---------------------------------------------------------------------------

export interface BrandContent {
  overview: BrandOverview
  logos: LogoSystem
  mascot?: MascotSystem
  colors: ColorPalette
  typography: TypographySystem
  socialAssets?: SocialAssets
  charts?: ChartShowcase
  assets: AssetCollection
  templates: TemplateCollection
  gallery: GalleryCollection
  guidance?: GuidanceConfig
  contact: ContactInfo
}

export interface BrandOverview {
  headline: string
  description: string
  values?: BrandValue[]
  storyMdxPath?: string
}

export interface BrandValue {
  title: string
  description: string
}

// ---------------------------------------------------------------------------
// Logo system
// ---------------------------------------------------------------------------

export interface LogoSystem {
  variants: LogoVariant[]
  buildDiagramSrc?: string
  guidelines?: string[]
  clearSpace?: string
  minimumSize?: string
}

export interface LogoVariant {
  name: string
  description?: string
  src: string
  backgrounds: LogoBackground[]
  downloadUrl?: string
  downloadFormats?: string[]
}

export type LogoBackground = "light" | "dark" | "brand"

export interface MascotSystem {
  name: string
  description?: string
  funFact?: string
  variants: MascotVariant[]
  guidelines?: string[]
}

export interface MascotVariant {
  label: string
  src: string
  backgrounds: LogoBackground[]
  downloadUrl?: string
}

// ---------------------------------------------------------------------------
// Color palette
// ---------------------------------------------------------------------------

export interface ColorPalette {
  groups: ColorGroup[]
}

export interface ColorGroup {
  name: string
  description?: string
  colors: ColorEntry[]
}

export interface ColorEntry {
  name: string
  hex: string
  usage?: string
}

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

export interface TypographySystem {
  families: FontFamily[]
  scale?: TypeScaleEntry[]
}

export interface FontFamily {
  name: string
  category: "sans-serif" | "serif" | "monospace" | "display"
  weights: FontWeight[]
  allWeightLabels?: string[]
  fontStackCss?: string
  sampleText?: string
  downloadUrl?: string
  googleFontsUrl?: string
  source?: string
}

export interface FontWeight {
  label: string
  value: number
  style?: "normal" | "italic"
}

export interface TypeScaleEntry {
  name: string
  size: string
  weight: number
  lineHeight: string
  letterSpacing?: string
  family?: string
  usage?: string
}

// ---------------------------------------------------------------------------
// Assets & templates
// ---------------------------------------------------------------------------

export interface AssetCollection {
  groups: AssetGroup[]
}

export interface AssetGroup {
  name: string
  description?: string
  assets: AssetItem[]
}

export interface AssetItem {
  name: string
  description?: string
  format: string
  fileSize?: string
  downloadUrl: string
  previewUrl?: string
}

export interface TemplateCollection {
  templates: TemplateItem[]
}

export interface TemplateItem {
  name: string
  description?: string
  type: "google-slides" | "google-docs" | "canva" | "figma" | "other"
  url: string
  previewUrl?: string
}

// ---------------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------------

export interface GalleryCollection {
  categories?: string[]
  images: GalleryImage[]
}

export interface GalleryImage {
  src: string
  alt: string
  caption?: string
  category?: string
}

// ---------------------------------------------------------------------------
// Usage guidance (dos & don'ts)
// ---------------------------------------------------------------------------

export interface GuidanceConfig {
  mdxPath?: string
  rules?: GuidanceRule[]
}

export interface GuidanceRule {
  type: "do" | "dont"
  label: string
  description?: string
  imageSrc?: string
}

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------

export interface ContactInfo {
  heading?: string
  description?: string
  email?: string
  phone?: string
  links?: ContactLink[]
}

export interface ContactLink {
  label: string
  url: string
  icon?: string
}

// ---------------------------------------------------------------------------
// Theme
// ---------------------------------------------------------------------------

export interface ThemeColors {
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  accent: string
  accentForeground: string
  background: string
  foreground: string
  muted: string
  mutedForeground: string
  card: string
  cardForeground: string
  border: string
}

// ---------------------------------------------------------------------------
// Social assets (avatars + banners)
// ---------------------------------------------------------------------------

export interface SocialAssets {
  avatars: AvatarVariant[]
  banners: BannerVariant[]
}

export interface AvatarVariant {
  label: string
  bgColor: string
  logoSrc: string
}

export interface BannerVariant {
  platform: string
  tab: string
  label: string
  width: number
  height: number
  src?: string
  bgGradient?: [string, string]
  wordmarkSrc?: string
  tileLogoSrc?: string
}

export interface ChartShowcase {
  heading?: string
  description?: string
}

// ---------------------------------------------------------------------------
// Theme
// ---------------------------------------------------------------------------

export interface ThemeConfig {
  colors: ThemeColors
  darkColors?: ThemeColors
  fonts: {
    heading: string
    body: string
    mono?: string
  }
  radius?: string
}
