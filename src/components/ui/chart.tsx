"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

export type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode
    color?: string
  }
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

function ChartContainer({
  id,
  className,
  children,
  config,
}: React.ComponentProps<"div"> & {
  config: ChartConfig
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"]
}) {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-axis-tick_text]:font-mono [&_.recharts-cartesian-grid_line]:stroke-border/40 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, configItem]) => configItem.color
  )

  if (!colorConfig.length) return null

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          [data-chart=${id}] {
          ${colorConfig
            .map(([key, itemConfig]) => `  --color-${key}: ${itemConfig.color};`)
            .join("\n")}
          }
        `,
      }}
    />
  )
}

function ChartTooltip({
  ...props
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip>) {
  return <RechartsPrimitive.Tooltip cursor={false} {...props} />
}

function ChartTooltipContent({
  active,
  payload,
  label,
  className,
  labelFormatter,
  formatter,
  hideLabel = false,
}: React.ComponentProps<"div"> & {
  active?: boolean
  payload?: Array<{
    color?: string
    dataKey?: string | number
    name?: string
    value?: number | string
  }>
  label?: string | number
  labelFormatter?: (
    label: string | number | undefined,
    payload: unknown[]
  ) => React.ReactNode
  formatter?: (
    value: unknown,
    name: unknown,
    item: unknown,
    index: number,
    payload: unknown[]
  ) => React.ReactNode
  hideLabel?: boolean
}) {
  const { config } = useChart()

  if (!active || !payload?.length) return null

  return (
    <div
      className={cn(
        "grid min-w-36 items-start gap-1.5 rounded-lg border border-border/60 bg-card px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
    >
      {!hideLabel ? (
        <div className="font-medium">
          {labelFormatter ? labelFormatter(label, payload) : label}
        </div>
      ) : null}
      <div className="grid gap-1">
        {payload.map((item, index) => {
          const key = `${item.dataKey || item.name || "value"}`
          const itemConfig = config[key]
          const markerColor =
            item.color ?? itemConfig?.color ?? "var(--color-muted-foreground)"
          const labelText = itemConfig?.label || item.name || key

          return (
            <div key={`tooltip-item-${index}`} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                style={{ backgroundColor: markerColor }}
              />
              <span className="text-muted-foreground">{labelText}</span>
              <span className="ml-auto font-mono text-foreground tabular-nums">
                {formatter
                  ? formatter(item.value, item.name, item, index, payload)
                  : item.value ?? "-"}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { ChartContainer, ChartTooltip, ChartTooltipContent }
