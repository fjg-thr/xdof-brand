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

function getProtectionBypassHeaders(): Record<string, string> {
  const secret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET
  if (!secret) return {}

  return {
    "x-vercel-protection-bypass": secret,
    "x-vercel-set-bypass-cookie": "true",
  }
}

function getForwardedRequestHeaders(request: Request): Record<string, string> {
  const cookie = request.headers.get("cookie")
  const userAgent = request.headers.get("user-agent")
  const headers: Record<string, string> = {}
  if (cookie) headers.cookie = cookie
  if (userAgent) headers["user-agent"] = userAgent
  return headers
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
    const browserContext = await browser.newContext({
      extraHTTPHeaders: {
        ...getForwardedRequestHeaders(request),
        ...getProtectionBypassHeaders(),
      },
    })
    const page = await browserContext.newPage()
    const origin = buildOrigin(request)
    const targetUrl = `${origin}/print/${client}`

    page.setDefaultTimeout(45_000)
    const response = await page.goto(targetUrl, {
      waitUntil: "domcontentloaded",
      timeout: 45_000,
    })
    if (!response || response.status() >= 400) {
      throw new Error(`Could not load print page (${response?.status() ?? "no response"})`)
    }
    await page.emulateMedia({ media: "print" })
    await page.waitForFunction(() => document.fonts?.status === "loaded", {
      timeout: 15_000,
    })
    await page
      .waitForFunction(() => Array.from(document.images).every((img) => img.complete), {
        timeout: 20_000,
      })
      .catch(() => {
        // Some assets can load slowly or be blocked in production; continue with current page state.
      })

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
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    const message =
      /executable|browser/i.test(errorMessage)
        ? "PDF engine is unavailable in this environment. Verify server deployment includes a headless Chromium binary."
        : /401|403|Could not load print page/i.test(errorMessage)
          ? "PDF renderer cannot access the protected site. Verify Vercel automation bypass is enabled."
        : /timeout|Could not load print page/i.test(errorMessage)
          ? "PDF rendering timed out while loading brand assets. Try again in a moment."
        : "Failed to generate PDF"
    return NextResponse.json(
      { error: message, details: errorMessage },
      { status: 500 }
    )
  } finally {
    if (browser) await browser.close()
  }
}
