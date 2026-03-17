import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactCompiler: true,
  serverExternalPackages: ["@sparticuz/chromium", "playwright-core"],
  outputFileTracingIncludes: {
    "/api/clients/[client]/pdf": [
      "./node_modules/@sparticuz/chromium/bin/**",
      "./node_modules/@sparticuz/chromium/build/**",
    ],
    "/api/clients/[client]/pdf/route": [
      "./node_modules/@sparticuz/chromium/bin/**",
      "./node_modules/@sparticuz/chromium/build/**",
    ],
  },
}

export default nextConfig
