import type { ClientConfig } from "@/lib/schema"

export const xdofConfig: ClientConfig = {
  slug: "xdof",
  name: "XDOF",
  description:
    "XDOF is a creative studio building at the intersection of design, technology, and culture.",
  logoSrc: "/clients/xdof/logos/logo-dark.svg",
  logoLightSrc: "/clients/xdof/logos/logo-light.svg",
  wordmarkSrc: "/clients/xdof/logos/wordmark-dark.svg",
  wordmarkLightSrc: "/clients/xdof/logos/wordmark-light.svg",

  sections: [
    { id: "overview", label: "Overview" },
    { id: "logos", label: "Logo System" },
    { id: "mascot", label: "Mascot Mark" },
    { id: "colors", label: "Color Palette" },
    { id: "typography", label: "Typography" },
    { id: "social-assets", label: "Social & Accounts" },
    { id: "charts", label: "Charts" },
    { id: "templates", label: "Templates" },
    { id: "gallery", label: "Gallery" },
    { id: "guidance", label: "Usage Guidance" },
    { id: "contact", label: "Contact" },
  ],

  theme: {
    colors: {
      primary: "#121218",
      primaryForeground: "#D8D9E9",
      secondary: "#6C6DB0",
      secondaryForeground: "#FAFAFA",
      accent: "#9495C8",
      accentForeground: "#121218",
      background: "#FAFAFA",
      foreground: "#121218",
      muted: "#F0F0F4",
      mutedForeground: "#6B6B76",
      card: "#FFFFFF",
      cardForeground: "#121218",
      border: "#E4E4EC",
    },
    darkColors: {
      primary: "#D8D9E9",
      primaryForeground: "#121218",
      secondary: "#9495C8",
      secondaryForeground: "#121218",
      accent: "#6C6DB0",
      accentForeground: "#D8D9E9",
      background: "#0C0D17",
      foreground: "#D8D9E9",
      muted: "#161724",
      mutedForeground: "#8B8C9E",
      card: "#121320",
      cardForeground: "#D8D9E9",
      border: "#252638",
    },
    fonts: {
      heading: '"Inter", "Segoe UI", Arial, sans-serif',
      body: '"Inter", "Segoe UI", Arial, sans-serif',
      mono: '"Geist Mono", "IBM Plex Mono", Menlo, monospace',
    },
    radius: "0.625rem",
  },

  meta: {
    title: "XDOF — Brand Guidelines",
    description:
      "The official brand guidelines for XDOF. Logo system, color palette, typography, and downloadable assets.",
  },

  brand: {
    overview: {
      headline: "XDOF",
      description:
        "XDOF builds robotics foundation models for real-world work: systems that tackle physical tasks people should not have to do. This guide translates that mission into a production-ready brand system for product, web, social, and internal communications.",
      values: [
        {
          title: "Technical Clarity",
          description:
            "Our visual language should read like an instrument panel: precise, legible, and intentional. Typography, spacing, and hierarchy must make complex robotics work immediately understandable.",
        },
        {
          title: "Future-Built Aesthetic",
          description:
            "The brand should feel engineered for what comes next, not generic software trends. Use contrast, structure, and restraint to communicate advanced capability without visual noise.",
        },
        {
          title: "System-Level Consistency",
          description:
            "Every approved asset, token, and layout rule exists to keep execution consistent at scale. Apply the system rigorously so the brand remains coherent across every touchpoint.",
        },
      ],
    },

    logos: {
      variants: [
        {
          name: "Logo Mark",
          description:
            "Primary brand mark for hero placements, brand identity, and standalone use.",
          src: "/clients/xdof/logos/logo-dark.svg",
          backgrounds: ["light"],
          downloadUrl: "/clients/xdof/logos/logo-dark.svg",
          downloadFormats: ["SVG", "PNG"],
        },
        {
          name: "Logo Mark — Reversed",
          description: "Light mark for use on dark backgrounds.",
          src: "/clients/xdof/logos/logo-light.svg",
          backgrounds: ["dark"],
          downloadUrl: "/clients/xdof/logos/logo-light.svg",
          downloadFormats: ["SVG", "PNG"],
        },
        {
          name: "Wordmark",
          description:
            "Horizontal wordmark for headers, co-branding, and inline text contexts.",
          src: "/clients/xdof/logos/wordmark-dark.svg",
          backgrounds: ["light"],
          downloadUrl: "/clients/xdof/logos/wordmark-dark.svg",
          downloadFormats: ["SVG", "PNG"],
        },
        {
          name: "Wordmark — Reversed",
          description: "Light wordmark for dark backgrounds.",
          src: "/clients/xdof/logos/wordmark-light.svg",
          backgrounds: ["dark"],
          downloadUrl: "/clients/xdof/logos/wordmark-light.svg",
          downloadFormats: ["SVG", "PNG"],
        },
      ],
      buildDiagramSrc: "/clients/xdof/logos/wordmark-build.svg",
      guidelines: [
        "Always use the provided SVG files. Never recreate or redraw the logo.",
        "Maintain minimum clear space equal to the height of one grid square in the logo mark on all sides.",
        "Do not rotate, skew, stretch, or distort the logo or wordmark.",
        "Do not alter the logo fill colors outside of the approved dark (#121218) and light (#D8D9E9) variants.",
        "Do not place the logo on busy or low-contrast backgrounds without a solid or semi-transparent overlay.",
        "The wordmark and logo mark may be used independently, but should never be rearranged or combined in non-approved lockups.",
      ],
      clearSpace:
        "Maintain a minimum clear space equal to the height of one square module in the logo mark on all sides.",
      minimumSize:
        "The logo mark should not be reproduced smaller than 32px digitally or 10mm in print. The wordmark minimum is 100px wide / 25mm.",
    },

    mascot: {
      name: "D.O.I.D. Mascot Mark",
      description:
        "A tertiary character mark for team culture, internal moments, and community expression. It is never a replacement for the primary logo or wordmark.",
      funFact:
        "The character head is built from the O in the wordmark, and the eyes come from the small center square in the X.",
      variants: [
        {
          label: "Dark",
          src: "/clients/xdof/mascot/xdof-doid-dark.svg",
          backgrounds: ["light"],
          downloadUrl: "/clients/xdof/mascot/xdof-doid-dark.svg",
        },
        {
          label: "Light",
          src: "/clients/xdof/mascot/xdof-doid-light.svg",
          backgrounds: ["dark"],
          downloadUrl: "/clients/xdof/mascot/xdof-doid-light.svg",
        },
      ],
      guidelines: [
        "Do not use the mascot as the XDOF logo in signatures, lockups, website headers, or legal/official documents.",
        "Use the mascot for team culture initiatives, social moments, merch, and internal storytelling.",
        "Always use approved dark/light variants. Do not redraw or alter the proportions.",
      ],
    },

    colors: {
      groups: [
        {
          name: "Brand Core",
          description:
            "The primary brand palette — derived directly from the XDOF identity.",
          colors: [
            {
              name: "XDOF Black",
              hex: "#121218",
              usage:
                "Primary brand color — logo, headlines, key UI surfaces, and dark backgrounds.",
            },
            {
              name: "XDOF Lavender",
              hex: "#D8D9E9",
              usage:
                "Brand accent — reversed logo, light UI elements, and subtle brand moments.",
            },
          ],
        },
        {
          name: "Extended Palette",
          description: "Supporting colors for UI, emphasis, and secondary elements.",
          colors: [
            {
              name: "Indigo",
              hex: "#6C6DB0",
              usage: "Secondary accent — links, interactive elements, and highlights.",
            },
            {
              name: "Periwinkle",
              hex: "#9495C8",
              usage: "Tertiary accent — tags, badges, and decorative details.",
            },
            {
              name: "Slate",
              hex: "#3A3B4A",
              usage: "Dark UI surfaces and secondary text on light backgrounds.",
            },
          ],
        },
        {
          name: "Neutrals",
          description: "Tonal range for backgrounds, text, and structural elements.",
          colors: [
            {
              name: "White",
              hex: "#FAFAFA",
              usage: "Primary background layer for light pages, cards, and spacious layouts.",
            },
            {
              name: "Ghost",
              hex: "#F0F0F4",
              usage: "Muted background layer for panels, inset blocks, and soft separation.",
            },
            {
              name: "Silver",
              hex: "#E4E4EC",
              usage: "Structural line color for borders, rules, dividers, and subtle outlines.",
            },
            {
              name: "Gray",
              hex: "#6B6B76",
              usage: "Secondary text color for labels, helper notes, and supporting metadata.",
            },
            {
              name: "Charcoal",
              hex: "#2C2C35",
              usage: "Body copy color for paragraphs, product text, and long-form reading.",
            },
          ],
        },
        {
          name: "Status",
          description:
            "Semantic colors for UI feedback. Chosen at OKLCH C ≈ 0.16–0.18 for confident legibility in both light and dark modes. Hues are intentionally spread across the wheel — the only warm value (Amber) signals caution unambiguously.",
          colors: [
            {
              name: "Rose",
              hex: "#C24870",
              usage: "Error state for destructive and alert actions.",
            },
            {
              name: "Teal",
              hex: "#1E9E80",
              usage: "Success state for confirmation actions.",
            },
            {
              name: "Amber",
              hex: "#C4882A",
              usage: "Warning state for caution and attention actions.",
            },
            {
              name: "Cornflower",
              hex: "#5878CC",
              usage: "Info state for guidance and link actions.",
            },
          ],
        },
        {
          name: "Data Palette",
          description:
            "A telemetry-inspired visualization set calibrated for legibility in both light and dark modes, with hue spacing chosen for clear series differentiation.",
          colors: [
            {
              name: "Magenta",
              hex: "#C04488",
            },
            {
              name: "Violet",
              hex: "#7840CC",
            },
            {
              name: "Azure",
              hex: "#3888D4",
            },
            {
              name: "Seafoam",
              hex: "#20A88C",
            },
            {
              name: "Mauve",
              hex: "#70709A",
            },
          ],
        },
      ],
    },

    typography: {
      families: [
        {
          name: "Inter",
          category: "sans-serif",
          fontStackCss: "'Inter', 'Segoe UI', Arial, sans-serif",
          source: "Google Fonts",
          googleFontsUrl: "https://fonts.google.com/specimen/Inter",
          weights: [
            { label: "Regular", value: 400 },
            { label: "Medium", value: 500 },
            { label: "SemiBold", value: 600 },
            { label: "Bold", value: 700 },
          ],
          allWeightLabels: [
            "Thin",
            "ExtraLight",
            "Light",
            "Regular",
            "Medium",
            "SemiBold",
            "Bold",
            "ExtraBold",
            "Black",
          ],
          sampleText: "The quick brown fox jumps over the lazy dog",
        },
        {
          name: "Geist Mono",
          category: "monospace",
          fontStackCss: "'Geist Mono', 'IBM Plex Mono', Menlo, monospace",
          source: "Google Fonts",
          googleFontsUrl: "https://fonts.google.com/specimen/Geist+Mono",
          weights: [
            { label: "Regular", value: 400 },
            { label: "Medium", value: 500 },
            { label: "Bold", value: 700 },
          ],
          allWeightLabels: [
            "Thin",
            "ExtraLight",
            "Light",
            "Regular",
            "Medium",
            "SemiBold",
            "Bold",
          ],
          sampleText: "const xdof = { type: 'studio', year: 2024 }",
        },
      ],
      scale: [
        {
          name: "Panel Body",
          size: "12px",
          weight: 400,
          lineHeight: "18px",
          family: "Inter",
          usage: "text-xs",
        },
        {
          name: "Labels",
          size: "11px",
          weight: 500,
          lineHeight: "16px",
          family: "Inter",
          usage: "text (11px)",
        },
        {
          name: "Telemetry",
          size: "10px",
          weight: 400,
          lineHeight: "14px",
          family: "Geist Mono",
          usage: "xxl (10px)",
        },
        {
          name: "Micro",
          size: "8px",
          weight: 500,
          lineHeight: "12px",
          family: "Inter",
          usage: "text-[8px]",
        },
      ],
    },

    socialAssets: {
      avatars: [
        {
          label: "Dark",
          bgColor: "#121218",
          logoSrc: "/clients/xdof/logos/logo-light.svg",
        },
        {
          label: "Light",
          bgColor: "#FAFAFA",
          logoSrc: "/clients/xdof/logos/logo-dark.svg",
        },
        {
          label: "Lavender",
          bgColor: "#D8D9E9",
          logoSrc: "/clients/xdof/logos/logo-dark.svg",
        },
        {
          label: "Indigo",
          bgColor: "#6C6DB0",
          logoSrc: "/clients/xdof/logos/logo-light.svg",
        },
      ],
      banners: [
        {
          tab: "Twitter / X",
          label: "Grid — Dark",
          platform: "Twitter / X",
          width: 1500,
          height: 500,
          src: "/clients/xdof/social/twitter-header-dark.svg",
        },
        {
          tab: "Twitter / X",
          label: "Grid — Light",
          platform: "Twitter / X",
          width: 1500,
          height: 500,
          src: "/clients/xdof/social/twitter-header-light.svg",
        },
        {
          tab: "Twitter / X",
          label: "Wordmark — Dark",
          platform: "Twitter / X",
          width: 1500,
          height: 500,
          bgGradient: ["#121218", "#171725"],
          tileLogoSrc: "/clients/xdof/logos/logo-dark.svg",
          wordmarkSrc: "/clients/xdof/logos/wordmark-light.svg",
        },
        {
          tab: "Twitter / X",
          label: "Wordmark — Light",
          platform: "Twitter / X",
          width: 1500,
          height: 500,
          bgGradient: ["#D9D9EA", "#CAD5E1"],
          tileLogoSrc: "/clients/xdof/logos/logo-light.svg",
          wordmarkSrc: "/clients/xdof/logos/wordmark-dark.svg",
        },
        {
          tab: "LinkedIn",
          label: "Grid — Dark",
          platform: "LinkedIn",
          width: 1584,
          height: 396,
          src: "/clients/xdof/social/linkedin-grid-dark.svg",
        },
        {
          tab: "LinkedIn",
          label: "Grid — Light",
          platform: "LinkedIn",
          width: 1584,
          height: 396,
          src: "/clients/xdof/social/linkedin-grid-light.svg",
        },
        {
          tab: "LinkedIn",
          label: "Wordmark — Dark",
          platform: "LinkedIn",
          width: 1584,
          height: 396,
          bgGradient: ["#121218", "#171725"],
          wordmarkSrc: "/clients/xdof/logos/wordmark-light.svg",
        },
        {
          tab: "LinkedIn",
          label: "Wordmark — Light",
          platform: "LinkedIn",
          width: 1584,
          height: 396,
          bgGradient: ["#D9D9EA", "#CAD5E1"],
          wordmarkSrc: "/clients/xdof/logos/wordmark-dark.svg",
        },
        {
          tab: "YouTube",
          label: "Dark",
          platform: "YouTube",
          width: 2560,
          height: 1440,
          bgGradient: ["#121218", "#171725"],
          wordmarkSrc: "/clients/xdof/logos/wordmark-light.svg",
        },
      ],
    },

    charts: {
      heading: "Motion Telemetry",
      description: "Area, line, and bar chart examples for 3D robotics movement.",
    },

    assets: {
      groups: [
        {
          name: "Logo Pack",
          description: "All approved logo and wordmark variants in SVG format.",
          assets: [
            {
              name: "Logo Mark — Dark",
              format: "SVG",
              downloadUrl: "/clients/xdof/logos/logo-dark.svg",
            },
            {
              name: "Logo Mark — Light",
              format: "SVG",
              downloadUrl: "/clients/xdof/logos/logo-light.svg",
            },
            {
              name: "Wordmark — Dark",
              format: "SVG",
              downloadUrl: "/clients/xdof/logos/wordmark-dark.svg",
            },
            {
              name: "Wordmark — Light",
              format: "SVG",
              downloadUrl: "/clients/xdof/logos/wordmark-light.svg",
            },
          ],
        },
      ],
    },

    templates: {
      templates: [
        {
          name: "Presentation Template",
          description:
            "Standard deck layout with XDOF brand typography, colors, and slide masters.",
          type: "google-slides",
          url: "https://docs.google.com/presentation/d/example",
        },
        {
          name: "Design System",
          description:
            "Component library and style guide for digital product work.",
          type: "figma",
          url: "https://www.figma.com/file/example",
        },
      ],
    },

    gallery: {
      images: [
        {
          src: "/clients/xdof/gallery/XDOF_APPLICATION_BRAND_A.png",
          alt: "XDOF brand application A",
          caption: "Brand application A",
        },
        {
          src: "/clients/xdof/gallery/XDOF_APPLICATION_BRAND_B.png",
          alt: "XDOF brand application B",
          caption: "Brand application B",
        },
        {
          src: "/clients/xdof/gallery/XDOF_APPLICATION_BRAND_C.png",
          alt: "XDOF brand application C",
          caption: "Brand application C",
        },
        {
          src: "/clients/xdof/gallery/XDOF_APPLICATION_BRAND_D.png",
          alt: "XDOF brand application D",
          caption: "Brand application D",
        },
      ],
    },

    guidance: {
      rules: [
        {
          type: "do",
          label: "Use approved logo files",
          description:
            "Always use the provided SVG files. Never recreate, trace, or screenshot the logo.",
        },
        {
          type: "do",
          label: "Maintain clear space",
          description:
            "Keep the minimum clear space around the logo free of text, images, and other elements.",
        },
        {
          type: "do",
          label: "Use brand colors consistently",
          description:
            "Refer to the color palette for approved hex values. Use XDOF Black and Lavender as the primary pair.",
        },
        {
          type: "do",
          label: "Follow the type scale",
          description:
            "Use the documented type scale for headings, body, and captions to maintain hierarchy.",
        },
        {
          type: "dont",
          label: "Stretch or distort the logo",
          description:
            "Never change the logo proportions. Always scale uniformly.",
        },
        {
          type: "dont",
          label: "Change logo colors",
          description:
            "Do not apply custom colors, gradients, or effects. Use the approved dark and light variants only.",
        },
        {
          type: "dont",
          label: "Use below minimum size",
          description:
            "The logo mark should not appear smaller than 32px on screen or 10mm in print.",
        },
        {
          type: "dont",
          label: "Place on busy backgrounds",
          description:
            "Avoid placing the logo on complex imagery without a solid overlay.",
        },
      ],
    },

    contact: {
      heading: "Brand Support",
      description:
        "Questions about brand usage? Reach out for guidance, approvals, or asset requests.",
      email: "brand@xdof.com",
      links: [{ label: "xdof.com", url: "https://xdof.com" }],
    },
  },
}
