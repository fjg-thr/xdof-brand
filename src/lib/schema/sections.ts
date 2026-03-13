import type { SectionMeta } from "./types"

export const SECTION_IDS = {
  OVERVIEW: "overview",
  LOGOS: "logos",
  MASCOT: "mascot",
  COLORS: "colors",
  TYPOGRAPHY: "typography",
  SOCIAL_ASSETS: "social-assets",
  CHARTS: "charts",
  ASSETS: "assets",
  TEMPLATES: "templates",
  GALLERY: "gallery",
  GUIDANCE: "guidance",
  CONTACT: "contact",
} as const

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS]

export const DEFAULT_SECTIONS: SectionMeta[] = [
  { id: SECTION_IDS.OVERVIEW, label: "Overview" },
  { id: SECTION_IDS.LOGOS, label: "Logo System" },
  { id: SECTION_IDS.COLORS, label: "Color Palette" },
  { id: SECTION_IDS.TYPOGRAPHY, label: "Typography" },
  { id: SECTION_IDS.ASSETS, label: "Assets" },
  { id: SECTION_IDS.TEMPLATES, label: "Templates" },
  { id: SECTION_IDS.GALLERY, label: "Gallery" },
  { id: SECTION_IDS.GUIDANCE, label: "Usage Guidance" },
  { id: SECTION_IDS.CONTACT, label: "Contact" },
]
