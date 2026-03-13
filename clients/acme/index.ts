import type { ClientConfig } from "@/lib/schema"

export const acmeConfig: ClientConfig = {
  slug: "acme",
  name: "Acme Studio",
  tagline: "Design with intention",
  description:
    "Acme Studio is an architecture and interior design practice based in Brooklyn, New York, focused on creating spaces that balance beauty, function, and sustainability.",
  logoSrc: "/clients/acme/logos/icon-dark.svg",

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
      primary: "#1B2B4B",
      primaryForeground: "#FAFAF8",
      secondary: "#C4964A",
      secondaryForeground: "#1A1A1A",
      accent: "#7C9082",
      accentForeground: "#FAFAF8",
      background: "#FAFAF8",
      foreground: "#1A1A1A",
      muted: "#F0EDE8",
      mutedForeground: "#71706E",
      card: "#FFFFFF",
      cardForeground: "#1A1A1A",
      border: "#E8E5E0",
    },
    fonts: {
      heading: '"Plus Jakarta Sans", sans-serif',
      body: '"Plus Jakarta Sans", sans-serif',
      mono: '"JetBrains Mono", monospace',
    },
    radius: "0.5rem",
  },

  meta: {
    title: "Acme Studio — Brand Guidelines",
    description:
      "The official brand guidelines for Acme Studio. Color palette, typography, logo usage, and downloadable assets.",
  },

  brand: {
    overview: {
      headline: "Acme Studio",
      description:
        "A complete guide to our visual identity. This document outlines the core elements of the Acme Studio brand — from our color palette and typography to our logo system and usage guidelines. Use this as your single source of truth for all brand-related work.",
      values: [
        {
          title: "Intentional Design",
          description:
            "Every decision serves a purpose. We design with clarity, restraint, and deep consideration for the people who will inhabit the spaces we create.",
        },
        {
          title: "Timeless Craft",
          description:
            "We favor materials, forms, and details that age gracefully. Our work is built to endure — visually and structurally.",
        },
        {
          title: "Human Scale",
          description:
            "Architecture should serve people, not impress them. We design environments that feel welcoming, functional, and proportioned to daily life.",
        },
      ],
    },

    logos: {
      variants: [
        {
          name: "Primary Logo",
          description: "Full horizontal lockup for primary brand use.",
          src: "/clients/acme/logos/primary-dark.svg",
          backgrounds: ["light"],
          downloadUrl: "/clients/acme/logos/primary-dark.svg",
          downloadFormats: ["SVG"],
        },
        {
          name: "Primary Logo — Reversed",
          description: "For use on dark or brand-colored backgrounds.",
          src: "/clients/acme/logos/primary-light.svg",
          backgrounds: ["dark", "brand"],
          downloadUrl: "/clients/acme/logos/primary-light.svg",
          downloadFormats: ["SVG"],
        },
        {
          name: "Wordmark",
          description: "Text-only mark for secondary applications.",
          src: "/clients/acme/logos/wordmark-dark.svg",
          backgrounds: ["light"],
          downloadUrl: "/clients/acme/logos/wordmark-dark.svg",
          downloadFormats: ["SVG"],
        },
        {
          name: "Wordmark — Reversed",
          description: "Light wordmark for dark backgrounds.",
          src: "/clients/acme/logos/wordmark-light.svg",
          backgrounds: ["dark"],
          downloadUrl: "/clients/acme/logos/wordmark-light.svg",
          downloadFormats: ["SVG"],
        },
        {
          name: "Icon Mark",
          description:
            "Standalone monogram for favicons, social avatars, and compact applications.",
          src: "/clients/acme/logos/icon-dark.svg",
          backgrounds: ["light"],
          downloadUrl: "/clients/acme/logos/icon-dark.svg",
          downloadFormats: ["SVG"],
        },
        {
          name: "Icon Mark — Reversed",
          description: "Light icon for dark or brand-colored backgrounds.",
          src: "/clients/acme/logos/icon-light.svg",
          backgrounds: ["dark", "brand"],
          downloadUrl: "/clients/acme/logos/icon-light.svg",
          downloadFormats: ["SVG"],
        },
      ],
      guidelines: [
        "Always maintain the minimum clear space around the logo, equal to the height of the icon mark.",
        "Do not rotate, skew, or distort the logo in any way.",
        "Do not alter the logo colors outside of the approved light and dark variants.",
        "Do not place the logo on busy photographic backgrounds without a solid or semi-transparent overlay.",
        "The wordmark should never appear without adequate contrast against its background.",
      ],
      clearSpace:
        "Maintain a minimum clear space equal to the height of the triangular icon mark on all sides.",
      minimumSize:
        "The primary logo should not be reproduced smaller than 120px wide digitally, or 30mm in print. The icon mark minimum is 24px / 8mm.",
    },

    colors: {
      groups: [
        {
          name: "Primary Palette",
          description: "Core brand colors used across all primary touchpoints.",
          colors: [
            {
              name: "Navy",
              hex: "#1B2B4B",
              usage: "Primary brand color — headlines, key UI elements, and brand surfaces.",
            },
            {
              name: "Gold",
              hex: "#C4964A",
              usage: "Accent and emphasis — calls to action, highlights, and decorative details.",
            },
            {
              name: "Sage",
              hex: "#7C9082",
              usage: "Supporting accent — nature references, secondary highlights, and tags.",
            },
          ],
        },
        {
          name: "Neutral Palette",
          description: "Tonal range for backgrounds, text, and structural elements.",
          colors: [
            { name: "Ivory", hex: "#FAFAF8", usage: "Primary light background." },
            { name: "Stone", hex: "#E8E5E0", usage: "Borders, dividers, and subtle separators." },
            { name: "Warm Gray", hex: "#8A8885", usage: "Secondary text and icons." },
            { name: "Charcoal", hex: "#3A3A38", usage: "Body text and paragraph copy." },
            { name: "Black", hex: "#1A1A1A", usage: "Headlines and maximum emphasis." },
          ],
        },
        {
          name: "Extended Palette",
          description: "Functional colors for UI states and feedback.",
          colors: [
            { name: "Coral", hex: "#C75C5C", usage: "Error and destructive actions." },
            { name: "Moss", hex: "#5C8A5C", usage: "Success and confirmation." },
            { name: "Amber", hex: "#C9943A", usage: "Warnings and caution." },
            { name: "Sky", hex: "#5C7FA5", usage: "Informational and links." },
          ],
        },
      ],
    },

    typography: {
      families: [
        {
          name: "Plus Jakarta Sans",
          category: "sans-serif",
          source: "Google Fonts",
          weights: [
            { label: "Regular", value: 400 },
            { label: "Medium", value: 500 },
            { label: "Semi Bold", value: 600 },
            { label: "Bold", value: 700 },
          ],
          sampleText: "The quick brown fox jumps over the lazy dog",
        },
        {
          name: "DM Serif Display",
          category: "serif",
          source: "Google Fonts",
          weights: [{ label: "Regular", value: 400 }],
          sampleText: "Architecture is the thoughtful making of space",
        },
        {
          name: "JetBrains Mono",
          category: "monospace",
          source: "Google Fonts",
          weights: [
            { label: "Regular", value: 400 },
            { label: "Medium", value: 500 },
          ],
          sampleText: "const studio = { founded: 2018, city: 'Brooklyn' }",
        },
      ],
      scale: [
        {
          name: "Display",
          size: "48px",
          weight: 400,
          lineHeight: "56px",
          letterSpacing: "-0.02em",
          family: "DM Serif Display",
          usage: "Hero headlines and feature moments",
        },
        {
          name: "Heading 1",
          size: "36px",
          weight: 700,
          lineHeight: "44px",
          letterSpacing: "-0.01em",
          family: "Plus Jakarta Sans",
          usage: "Page titles",
        },
        {
          name: "Heading 2",
          size: "28px",
          weight: 600,
          lineHeight: "36px",
          family: "Plus Jakarta Sans",
          usage: "Section headings",
        },
        {
          name: "Heading 3",
          size: "22px",
          weight: 600,
          lineHeight: "30px",
          family: "Plus Jakarta Sans",
          usage: "Subsection headings",
        },
        {
          name: "Body Large",
          size: "18px",
          weight: 400,
          lineHeight: "28px",
          family: "Plus Jakarta Sans",
          usage: "Lead paragraphs and intros",
        },
        {
          name: "Body",
          size: "16px",
          weight: 400,
          lineHeight: "26px",
          family: "Plus Jakarta Sans",
          usage: "Default body copy",
        },
        {
          name: "Caption",
          size: "14px",
          weight: 400,
          lineHeight: "22px",
          family: "Plus Jakarta Sans",
          usage: "Labels, captions, and metadata",
        },
        {
          name: "Small",
          size: "12px",
          weight: 500,
          lineHeight: "18px",
          letterSpacing: "0.02em",
          family: "Plus Jakarta Sans",
          usage: "Fine print and legal text",
        },
      ],
    },

    assets: {
      groups: [
        {
          name: "Logo Pack",
          description: "All logo variants in vector and raster formats.",
          assets: [
            {
              name: "Primary Logo — Dark",
              format: "SVG",
              downloadUrl: "/clients/acme/logos/primary-dark.svg",
            },
            {
              name: "Primary Logo — Light",
              format: "SVG",
              downloadUrl: "/clients/acme/logos/primary-light.svg",
            },
            {
              name: "Wordmark — Dark",
              format: "SVG",
              downloadUrl: "/clients/acme/logos/wordmark-dark.svg",
            },
            {
              name: "Wordmark — Light",
              format: "SVG",
              downloadUrl: "/clients/acme/logos/wordmark-light.svg",
            },
            {
              name: "Icon Mark — Dark",
              format: "SVG",
              downloadUrl: "/clients/acme/logos/icon-dark.svg",
            },
            {
              name: "Icon Mark — Light",
              format: "SVG",
              downloadUrl: "/clients/acme/logos/icon-light.svg",
            },
          ],
        },
      ],
    },

    templates: {
      templates: [
        {
          name: "Presentation Template",
          description: "Standard deck layout with brand typography, colors, and slide masters.",
          type: "google-slides",
          url: "https://docs.google.com/presentation/d/example",
        },
        {
          name: "Letterhead",
          description: "Pre-formatted document with brand header and footer.",
          type: "google-docs",
          url: "https://docs.google.com/document/d/example",
        },
        {
          name: "Social Media Kit",
          description: "Story and post templates for Instagram, LinkedIn, and Twitter.",
          type: "canva",
          url: "https://www.canva.com/design/example",
        },
        {
          name: "Design System",
          description: "Component library and style guide for digital product work.",
          type: "figma",
          url: "https://www.figma.com/file/example",
        },
      ],
    },

    gallery: {
      categories: ["Digital", "Print", "Environmental"],
      images: [
        {
          src: "/clients/acme/gallery/website.svg",
          alt: "Acme Studio website design",
          caption: "Website — responsive desktop layout",
          category: "Digital",
        },
        {
          src: "/clients/acme/gallery/social.svg",
          alt: "Social media post design",
          caption: "Instagram post template",
          category: "Digital",
        },
        {
          src: "/clients/acme/gallery/business-cards.svg",
          alt: "Business card design",
          caption: "Business cards — front and back",
          category: "Print",
        },
        {
          src: "/clients/acme/gallery/stationery.svg",
          alt: "Letterhead and stationery",
          caption: "Branded letterhead",
          category: "Print",
        },
        {
          src: "/clients/acme/gallery/packaging.svg",
          alt: "Branded packaging",
          caption: "Material sample packaging",
          category: "Print",
        },
        {
          src: "/clients/acme/gallery/signage.svg",
          alt: "Office signage",
          caption: "Environmental signage — studio entrance",
          category: "Environmental",
        },
      ],
    },

    guidance: {
      rules: [
        {
          type: "do",
          label: "Use approved logo variants",
          description:
            "Always use the provided SVG or PNG files. Never recreate the logo manually.",
        },
        {
          type: "do",
          label: "Maintain clear space",
          description:
            "Keep the required clear space around the logo free of text, images, and other visual elements.",
        },
        {
          type: "do",
          label: "Use brand colors consistently",
          description:
            "Refer to the color palette section for approved values. Use primary colors for key elements and neutrals for supporting content.",
        },
        {
          type: "do",
          label: "Follow the type scale",
          description:
            "Use the documented type scale for headings, body, and captions to maintain visual hierarchy.",
        },
        {
          type: "dont",
          label: "Stretch or distort the logo",
          description:
            "Never change the logo proportions. Always scale uniformly from a corner handle.",
        },
        {
          type: "dont",
          label: "Change the logo colors",
          description:
            "Do not apply custom colors, gradients, or effects to the logo. Use the approved dark and light variants only.",
        },
        {
          type: "dont",
          label: "Use below minimum size",
          description:
            "The primary logo should never appear smaller than 120px wide on screen or 30mm in print.",
        },
        {
          type: "dont",
          label: "Place on busy backgrounds",
          description:
            "Avoid placing the logo directly on complex imagery. Use a solid overlay or choose a clear area.",
        },
      ],
    },

    contact: {
      heading: "Brand Support",
      description:
        "Questions about brand usage? Reach out to the brand team for guidance, approvals, or asset requests.",
      email: "brand@acmestudio.com",
      phone: "(718) 555-0142",
      links: [
        { label: "Brand Portal", url: "https://brand.acmestudio.com" },
        { label: "Brand Slack Channel", url: "https://acmestudio.slack.com/channels/brand" },
        { label: "acmestudio.com", url: "https://acmestudio.com" },
      ],
    },
  },
}
