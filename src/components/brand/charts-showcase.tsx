"use client"

import { useMemo, useState } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts"
import type { ColorPalette } from "@/lib/schema"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

interface ChartsShowcaseProps {
  palette: ColorPalette
}

const timeSeriesData = [
  { step: "T-00", x: 12, y: 8, z: 5, velocity: 18, torque: 22 },
  { step: "T-01", x: 19, y: 9, z: 8, velocity: 24, torque: 28 },
  { step: "T-02", x: 27, y: 14, z: 13, velocity: 33, torque: 35 },
  { step: "T-03", x: 33, y: 19, z: 18, velocity: 39, torque: 31 },
  { step: "T-04", x: 30, y: 17, z: 16, velocity: 31, torque: 42 },
  { step: "T-05", x: 42, y: 24, z: 23, velocity: 47, torque: 38 },
  { step: "T-06", x: 51, y: 31, z: 29, velocity: 56, torque: 52 },
  { step: "T-07", x: 47, y: 28, z: 26, velocity: 44, torque: 58 },
  { step: "T-08", x: 59, y: 36, z: 34, velocity: 63, torque: 49 },
  { step: "T-09", x: 66, y: 40, z: 39, velocity: 68, torque: 65 },
  { step: "T-10", x: 61, y: 37, z: 35, velocity: 52, torque: 71 },
  { step: "T-11", x: 73, y: 46, z: 44, velocity: 74, torque: 56 },
  { step: "T-12", x: 79, y: 52, z: 50, velocity: 79, torque: 78 },
  { step: "T-13", x: 75, y: 49, z: 47, velocity: 64, torque: 62 },
  { step: "T-14", x: 88, y: 58, z: 56, velocity: 86, torque: 84 },
  { step: "T-15", x: 96, y: 63, z: 61, velocity: 91, torque: 69 },
  { step: "T-16", x: 90, y: 59, z: 58, velocity: 73, torque: 89 },
  { step: "T-17", x: 104, y: 69, z: 66, velocity: 98, torque: 75 },
  { step: "T-18", x: 111, y: 75, z: 71, velocity: 103, torque: 95 },
  { step: "T-19", x: 106, y: 71, z: 68, velocity: 82, torque: 81 },
  { step: "T-20", x: 118, y: 80, z: 76, velocity: 109, torque: 101 },
  { step: "T-21", x: 123, y: 84, z: 81, velocity: 112, torque: 87 },
  { step: "T-22", x: 119, y: 81, z: 78, velocity: 94, torque: 107 },
  { step: "T-23", x: 131, y: 89, z: 84, velocity: 116, torque: 93 },
  { step: "T-24", x: 126, y: 86, z: 82, velocity: 97, torque: 113 },
  { step: "T-25", x: 138, y: 94, z: 90, velocity: 121, torque: 99 },
  { step: "T-26", x: 145, y: 99, z: 95, velocity: 126, torque: 119 },
  { step: "T-27", x: 140, y: 95, z: 92, velocity: 104, torque: 105 },
  { step: "T-28", x: 152, y: 103, z: 99, velocity: 130, torque: 125 },
  { step: "T-29", x: 147, y: 100, z: 96, velocity: 109, torque: 111 },
  { step: "T-30", x: 159, y: 108, z: 103, velocity: 134, torque: 131 },
  { step: "T-31", x: 154, y: 105, z: 100, velocity: 113, torque: 117 },
]

const barData = [
  { maneuver: "Lift", x: 73, y: 66, z: 58, torque: 68 },
  { maneuver: "Reach", x: 91, y: 84, z: 77, torque: 82 },
  { maneuver: "Align", x: 86, y: 80, z: 72, torque: 75 },
  { maneuver: "Grip", x: 95, y: 88, z: 82, torque: 90 },
  { maneuver: "Rotate", x: 88, y: 82, z: 74, torque: 79 },
  { maneuver: "Pivot", x: 82, y: 75, z: 70, torque: 72 },
  { maneuver: "Arc", x: 90, y: 86, z: 79, torque: 84 },
  { maneuver: "Dock", x: 84, y: 78, z: 71, torque: 76 },
  { maneuver: "Clamp", x: 97, y: 91, z: 85, torque: 92 },
  { maneuver: "Retract", x: 79, y: 73, z: 67, torque: 70 },
  { maneuver: "Stabilize", x: 87, y: 81, z: 75, torque: 78 },
  { maneuver: "Release", x: 83, y: 77, z: 69, torque: 74 },
]

export function ChartsShowcase({ palette }: ChartsShowcaseProps) {
  const [activeTab, setActiveTab] = useState("area")

  const dataPalette = useMemo(() => {
    const group = palette.groups.find((g) => g.name === "Data Palette")
    const fallback = ["#6C6DB0", "#9495C8", "#3888D4", "#20A88C"]

    if (!group) return fallback

    return [
      group.colors[0]?.hex ?? fallback[0],
      group.colors[1]?.hex ?? fallback[1],
      group.colors[2]?.hex ?? fallback[2],
      group.colors[3]?.hex ?? fallback[3],
    ]
  }, [palette.groups])

  const chartConfig = useMemo<ChartConfig>(
    () => ({
      x: { label: "X Axis", color: dataPalette[0] },
      y: { label: "Y Axis", color: dataPalette[1] },
      z: { label: "Z Axis", color: dataPalette[2] },
      velocity: { label: "Resultant Velocity", color: "var(--secondary)" },
      torque: { label: "Torque", color: dataPalette[3] },
    }),
    [dataPalette]
  )

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Motion Telemetry Charts</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Sample 3D robotics movement telemetry, styled with brand palette and
          type.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="area" className="flex-1">
            Area
          </TabsTrigger>
          <TabsTrigger value="line" className="flex-1">
            Line
          </TabsTrigger>
          <TabsTrigger value="bar" className="flex-1">
            Bar
          </TabsTrigger>
        </TabsList>

        {activeTab === "area" ? (
          <Card className="bg-card/70">
            <CardHeader>
              <CardTitle>Axis Displacement Over Time</CardTitle>
              <CardDescription>
                Layered area view for X/Y/Z translation trajectories.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80 w-full min-w-0">
                <AreaChart
                  data={timeSeriesData}
                  margin={{ top: 8, right: 8, bottom: 0, left: -24 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="step" tickMargin={8} tickLine={false} axisLine={false} />
                  <YAxis tickMargin={6} tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="x"
                    stackId="a"
                    stroke="var(--color-x)"
                    fill="var(--color-x)"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="y"
                    stackId="a"
                    stroke="var(--color-y)"
                    fill="var(--color-y)"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="z"
                    stackId="a"
                    stroke="var(--color-z)"
                    fill="var(--color-z)"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="torque"
                    stackId="a"
                    stroke="var(--color-torque)"
                    fill="var(--color-torque)"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        ) : null}

        {activeTab === "line" ? (
          <Card className="bg-card/70">
            <CardHeader>
              <CardTitle>Path + Velocity Tracking</CardTitle>
              <CardDescription>
                Axis traces plus resultant speed to inspect smoothness and pace.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80 w-full min-w-0">
                <LineChart
                  data={timeSeriesData}
                  margin={{ top: 8, right: 8, bottom: 0, left: -24 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="step" tickMargin={8} tickLine={false} axisLine={false} />
                  <YAxis tickMargin={6} tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="x" stroke="var(--color-x)" dot={false} strokeWidth={2} />
                  <Line type="monotone" dataKey="y" stroke="var(--color-y)" dot={false} strokeWidth={2} />
                  <Line type="monotone" dataKey="z" stroke="var(--color-z)" dot={false} strokeWidth={2} />
                  <Line
                    type="monotone"
                    dataKey="velocity"
                    stroke="var(--color-velocity)"
                    dot={false}
                    strokeDasharray="4 3"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="torque"
                    stroke="var(--color-torque)"
                    dot={false}
                    strokeWidth={2}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        ) : null}

        {activeTab === "bar" ? (
          <Card className="bg-card/70">
            <CardHeader>
              <CardTitle>Maneuver Axis Load Distribution</CardTitle>
              <CardDescription>
                Relative axis effort during core robotic motion blocks.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80 w-full min-w-0">
                <BarChart
                  data={barData}
                  margin={{ top: 8, right: 8, bottom: 0, left: -24 }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="maneuver"
                    tickMargin={8}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis tickMargin={6} tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="x" fill="var(--color-x)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="y" fill="var(--color-y)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="z" fill="var(--color-z)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="torque" fill="var(--color-torque)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        ) : null}
      </Tabs>
    </div>
  )
}
