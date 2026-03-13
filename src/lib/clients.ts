import type { ClientConfig } from "@/lib/schema"
import { acmeConfig } from "@clients/acme"
import { xdofConfig } from "@clients/xdof"

const registry: Record<string, ClientConfig> = {
  acme: acmeConfig,
  xdof: xdofConfig,
}

export function getClient(slug: string): ClientConfig | null {
  return registry[slug] ?? null
}

export function getAllClientSlugs(): string[] {
  return Object.keys(registry)
}

export function getAllClients(): ClientConfig[] {
  return Object.values(registry)
}
