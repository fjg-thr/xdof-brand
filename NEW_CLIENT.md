# Creating a New Client

## Quick Start

1. **Duplicate the template folder**

   ```bash
   cp -r clients/_template clients/your-client
   ```

2. **Create asset directories**

   ```bash
   mkdir -p public/clients/your-client/{logos,gallery,downloads}
   ```

3. **Add assets**

   Drop logo SVGs/PNGs into `public/clients/your-client/logos/` and gallery images into `public/clients/your-client/gallery/`.

4. **Edit the client config**

   Open `clients/your-client/index.ts` and update:
   - `slug` — URL path segment (e.g. `"your-client"` → `/your-client`)
   - `name`, `tagline`, `description`
   - `theme.colors` — brand hex values
   - `theme.fonts` — CSS font-family strings (fonts load from Google Fonts automatically)
   - `brand.*` — all section content (logos, colors, typography, assets, templates, gallery, guidance, contact)

5. **Register the client**

   In `src/lib/clients.ts`, add:

   ```ts
   import { yourClientConfig } from "@clients/your-client"

   const registry: Record<string, ClientConfig> = {
     acme: acmeConfig,
     "your-client": yourClientConfig,
   }
   ```

6. **Run the dev server**

   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000/your-client`.

## What Each Directory Does

| Path | Purpose |
|------|---------|
| `clients/<slug>/index.ts` | Client config (typed `ClientConfig`) — all content and theme tokens |
| `public/clients/<slug>/logos/` | Logo SVG/PNG files referenced by the config |
| `public/clients/<slug>/gallery/` | Gallery images referenced by the config |
| `public/clients/<slug>/downloads/` | Downloadable assets (ZIP, PDF, font packs) |

## Customization Guide

- **Hide a section**: Set `enabled: false` on any entry in the `sections` array.
- **Reorder sections**: Change the array order in `sections`.
- **Change fonts**: Update `theme.fonts` and the `typography.families` array. Fonts listed in `typography.families` are loaded automatically from Google Fonts.
- **Change colors**: Update `theme.colors` (drives the site UI) and `brand.colors` (displayed in the palette section).

## Architecture Reference

- **Schema types**: `src/lib/schema/types.ts` — all interfaces
- **Brand components**: `src/components/brand/` — reusable section components
- **Theme tokens**: `src/lib/tokens/` — CSS variable mapping
- **Hooks**: `src/hooks/` — copy, lightbox, active section
- **Color utilities**: `src/lib/color.ts` — hex/rgb/hsl conversion
