import { Download, FileImage } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { AssetCollection, AssetItem } from "@/lib/schema"

interface AssetDownloadGridProps {
  assets: AssetCollection
}

export function AssetDownloadGrid({ assets }: AssetDownloadGridProps) {
  return (
    <div className="space-y-14">
      {assets.groups.map((group) => (
        <div key={group.name}>
          <h3 className="text-lg font-medium">{group.name}</h3>
          {group.description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {group.description}
            </p>
          )}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.assets.map((asset) => (
              <AssetCard key={asset.downloadUrl} asset={asset} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function AssetCard({ asset }: { asset: AssetItem }) {
  return (
    <div className="group flex items-start gap-4 rounded-lg border border-border/50 p-4 transition-colors hover:border-border">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">
        <FileImage className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{asset.name}</p>
        {asset.description && (
          <p className="mt-0.5 text-xs text-muted-foreground">
            {asset.description}
          </p>
        )}
        <div className="mt-2 flex items-center gap-2">
          <span className="font-mono text-[11px] uppercase text-muted-foreground">
            {asset.format}
          </span>
          {asset.fileSize && (
            <>
              <span className="text-muted-foreground/40">·</span>
              <span className="text-[11px] text-muted-foreground">
                {asset.fileSize}
              </span>
            </>
          )}
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        render={
          <a
            href={asset.downloadUrl}
            download
            aria-label={`Download ${asset.name}`}
          />
        }
        className="shrink-0 opacity-50 transition-opacity group-hover:opacity-100"
      >
        <Download className="h-4 w-4" />
      </Button>
    </div>
  )
}
