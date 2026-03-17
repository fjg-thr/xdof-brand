import { NextResponse } from "next/server"
import chromiumBinary from "@sparticuz/chromium"
import { chromium } from "playwright-core"
import { getClient } from "@/lib/clients"

process.env.PLAYWRIGHT_BROWSERS_PATH = process.env.PLAYWRIGHT_BROWSERS_PATH ?? "0"

interface RouteContext {
  params: Promise<{ client: string }>
}

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 60

async function getLaunchOptions() {
  if (process.env.VERCEL) {
    return {
      args: chromiumBinary.args,
      executablePath: await chromiumBinary.executablePath(),
      headless: true,
    }
  }

  return { headless: true }
}

function buildOrigin(request: Request): string {
  const envOrigin = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL
  if (envOrigin) return envOrigin.replace(/\/$/, "")
  return new URL(request.url).origin
}

function buildFileName(clientName: string): string {
  const slug = clientName.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  const date = new Date().toISOString().slice(0, 10)
  return `${slug}-brand-guidelines-${date}.pdf`
}

export async function GET(request: Request, context: RouteContext) {
  const { client } = await context.params
  const config = getClient(client)
  if (!config) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 })
  }

  let browser: Awaited<ReturnType<typeof chromium.launch>> | null = null
  try {
    browser = await chromium.launch(await getLaunchOptions())
    const page = await browser.newPage()
    const origin = buildOrigin(request)
    const targetUrl = `${origin}/print/${client}`

    await page.goto(targetUrl, { waitUntil: "networkidle" })
    await page.emulateMedia({ media: "print" })
    await page.waitForFunction(() => document.fonts?.status === "loaded")

    const pdfBuffer = await page.pdf({
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: true,
      headerTemplate: `<div></div>`,
      footerTemplate: `
        <div style="width:100%; padding:0 24px 10px; font-size:10px; color:#6B6B76; font-family:Inter,Segoe UI,Arial,sans-serif; display:flex; justify-content:flex-end;">
          <span class="pageNumber"></span>/<span class="totalPages"></span>
        </div>
      `,
      margin: {
        top: "0.2in",
        right: "0in",
        bottom: "0.45in",
        left: "0in",
      },
    })

    const fileName = buildFileName(config.name)
    const pdfData = new Uint8Array(pdfBuffer)
    return new NextResponse(pdfData, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "no-store",
      },
    })
  } catch (error) {
    console.error("PDF generation failed", error)
    const message =
      error instanceof Error && /executable|browser/i.test(error.message)
        ? "PDF engine is unavailable in this environment. Verify server deployment includes a headless Chromium binary."
        : "Failed to generate PDF"
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  } finally {
    if (browser) await browser.close()
  }
}
