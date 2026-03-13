import type { ClientConfig } from "@/lib/schema"

/**
 * Client template — duplicate this folder and replace with real content.
 *
 * Steps to create a new client:
 *   1. Copy `clients/_template` to `clients/<slug>`
 *   2. Rename the export below and update all fields
 *   3. Add logo SVGs/PNGs to `public/clients/<slug>/logos/`
 *   4. Add gallery images to `public/clients/<slug>/gallery/`
 *   5. Add downloadable assets to `public/clients/<slug>/downloads/`
 *   6. Register the client in `src/lib/clients.ts`
 *   7. Run the dev server and visit `/<slug>`
 */
export const templateConfig: ClientConfig = {
  slug: "your-client",
  name: "Client Name",
  tagline: "Client tagline",
  description: "One-sentence brand description.",
  logoSrc: "/clients/your-client/logos/icon.svg",

  sections: [
    { id: "overview", label: "Overview" },
    { id: "logos", label: "Logo System" },
    { id: "colors", label: "Color Palette" },
    { id: "typography", label: "Typography" },
    { id: "assets", label: "Assets" },
    { id: "templates", label: "Templates" },
    { id: "gallery", label: "Gallery" },
    { id: "guidance", label: "Usage Guidance" },
    { id: "contact", label: "Contact" },
  ],

  theme: {
    colors: {
      primary: "#000000",
      primaryForeground: "#FFFFFF",
      secondary: "#666666",
      secondaryForeground: "#FFFFFF",
      accent: "#0066CC",
      accentForeground: "#FFFFFF",
      background: "#FFFFFF",
      foreground: "#111111",
      muted: "#F5F5F5",
      mutedForeground: "#666666",
      card: "#FFFFFF",
      cardForeground: "#111111",
      border: "#E5E5E5",
    },
    fonts: {
      heading: '"Inter", sans-serif',
      body: '"Inter", sans-serif',
      mono: '"JetBrains Mono", monospace',
    },
    radius: "0.5rem",
  },

  meta: {
    title: "Client Name — Brand Guidelines",
    description: "Brand guidelines for Client Name.",
  },

  brand: {
    overview: {
      headline: "Client Name",
      description: "Replace with a description of the brand and the purpose of this guidelines document.",
      values: [
        { title: "Value One", description: "Describe the first brand value." },
        { title: "Value Two", description: "Describe the second brand value." },
        { title: "Value Three", description: "Describe the third brand value." },
      ],
    },

    logos: {
      variants: [
        {
          name: "Primary Logo",
          description: "Full horizontal lockup.",
          src: "/clients/your-client/logos/primary.svg",
          backgrounds: ["light"],
        },
      ],
      guidelines: ["Maintain minimum clear space around the logo."],
    },

    colors: {
      groups: [
        {
          name: "Primary",
          colors: [
            { name: "Black", hex: "#000000", usage: "Primary brand color." },
            { name: "Accent", hex: "#0066CC", usage: "Accent and CTAs." },
          ],
        },
        {
          name: "Neutrals",
          colors: [
            { name: "White", hex: "#FFFFFF", usage: "Backgrounds." },
            { name: "Gray", hex: "#666666", usage: "Secondary text." },
          ],
        },
      ],
    },

    typography: {
      families: [
        {
          name: "Inter",
          category: "sans-serif",
          source: "Google Fonts",
          weights: [
            { label: "Regular", value: 400 },
            { label: "Medium", value: 500 },
            { label: "Bold", value: 700 },
          ],
        },
      ],
      scale: [
        { name: "Heading 1", size: "36px", weight: 700, lineHeight: "44px" },
        { name: "Body", size: "16px", weight: 400, lineHeight: "26px" },
      ],
    },

    assets: {
      groups: [
        {
          name: "Logo Pack",
          assets: [
            {
              name: "Primary Logo",
              format: "SVG",
              downloadUrl: "/clients/your-client/logos/primary.svg",
            },
          ],
        },
      ],
    },

    templates: { templates: [] },

    gallery: { images: [] },

    guidance: {
      rules: [
        { type: "do", label: "Use approved logo files" },
        { type: "dont", label: "Stretch or distort the logo" },
      ],
    },

    contact: {
      heading: "Brand Support",
      description: "Questions about brand usage? Reach out to the brand team.",
      email: "brand@example.com",
    },
  },
}
