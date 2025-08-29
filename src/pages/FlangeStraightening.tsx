"use client"

import { ArrowLeft, Download, Settings, AlertCircle, CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { DashboardHeader } from "@/components/DashboardHeader"

export default function GasCuttingDetails() {
  const [selectedPeriod, setSelectedPeriod] = useState<"24h" | "7d" | "30d">("24h")
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

const [hoveredBar, setHoveredBar] = useState<number | null>(null)
  const [barMousePos, setBarMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })


  // Different data sets for each time period
  const timelineData = {
    "24h": {
      uptime: "91.667%",
      status: "Issues Detected",
      icon: AlertCircle,      // ✅ new icon
      iconColor: "text-green-500",
      segments: 48, // 48 half-hour segments
      timeLabels: ["00:00", "06:00", "12:00", "18:00", "24:00"],
      connected: "91.7%",
      degraded: "4.2%",
      down: "4.2%",
    },
    "7d": {
      uptime: "91.964%",
      status: "Issues Detected",
      icon: AlertCircle,
      iconColor: "text-green-500",
      segments: 168, // 7 days × 24 hours = 168 hourly segments
      timeLabels: ["Aug 16", "Aug 17", "Aug 18", "Aug 19", "Aug 20", "Aug 21", "Aug 22"],
      connected: "92.0%",
      degraded: "5.1%",
      down: "3.0%",
    },
    "30d": {
      uptime: "93.472%",
      status: "Issues Detected",
      icon: CheckCircle,
      iconColor: "text-green-500",
      segments: 720, // 30 days × 24 hours = 720 hourly segments for more granular data
      timeLabels: ["Jul 24", "Aug 1", "Aug 9", "Aug 17"],
      connected: "93.5%",
      degraded: "5.0%",
      down: "1.5%",
    },
  }

  // Generate tooltip content based on segment and period
  const getTooltipContent = (segment: { status: string; index: number }) => {
    const getStatusText = (status: string) => {
      switch (status) {
        case "connected":
          return "Connected"
        case "degraded":
          return "Degraded"
        case "down":
          return "Down"
        default:
          return "Unknown"
      }
    }

    const getStatusColor = (status: string) => {
      switch (status) {
        case "connected":
          return "text-green-400"
        case "degraded":
          return "text-yellow-400"
        case "down":
          return "text-red-400"
        default:
          return "text-gray-400"
      }
    }

    // Generate date and time based on period
    const getDateTime = () => {
      const now = new Date()
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

      if (selectedPeriod === "24h") {
        const hour = Math.floor(segment.index / 2)
        const minute = segment.index % 2 === 0 ? "00" : "30"
        return `Aug ${now.getDate().toString().padStart(2, "0")} ${hour.toString().padStart(2, "0")}:${minute}`
      } else if (selectedPeriod === "7d") {
        // For 7d view, we have 168 hourly segments (7 days × 24 hours)
        const dayIndex = Math.floor(segment.index / 24)
        const hourInDay = segment.index % 24
        const targetDate = new Date(2024, 7, 16 + dayIndex) // Aug 16-22, 2024
        return `${months[targetDate.getMonth()]} ${targetDate.getDate().toString().padStart(2, "0")} ${hourInDay.toString().padStart(2, "0")}:00`
      } else {
        // For 30d view, we have 720 hourly segments (30 days × 24 hours)
        const dayIndex = Math.floor(segment.index / 24)
        const hourInDay = segment.index % 24
        const startDate = new Date(2024, 6, 24) // July 24, 2024
        const targetDate = new Date(startDate.getTime() + dayIndex * 24 * 60 * 60 * 1000)
        return `${months[targetDate.getMonth()]} ${targetDate.getDate().toString().padStart(2, "0")} ${hourInDay.toString().padStart(2, "0")}:00`
      }
    }

    return {
      dateTime: getDateTime(),
      status: getStatusText(segment.status),
      statusColor: getStatusColor(segment.status),
    }
  }

  const currentData = timelineData[selectedPeriod]
  const StatusIcon = currentData.icon

  // Generate timeline segments based on selected period
  const generateTimelineSegments = () => {
    const segments = []
    for (let i = 0; i < currentData.segments; i++) {
      let status = "connected"
      // Set seed for consistent results
      const seed = i * 7 + selectedPeriod.charCodeAt(0)
      const random = Math.abs(Math.sin(seed)) * 100

      if (selectedPeriod === "24h") {
        // More frequent issues distributed throughout 24h view
        if (random > 91) status = "down"
        else if (random > 84) status = "degraded"
      } else if (selectedPeriod === "7d") {
        if (random > 97) status = "down"
        else if (random > 94.9) status = "degraded"
      } else {
        if (random > 98.5) status = "down"
        else if (random > 95) status = "degraded"
      }
      segments.push({ status, index: i })
    }
    return segments
  }

  const timelineSegments = generateTimelineSegments()
const hourlySpeedData = [
  { hour: "00:00", speed: 124, period: "night" },
  { hour: "01:00", speed: 100, period: "night" },
  { hour: "02:00", speed: 82, period: "night" },
  { hour: "03:00", speed: 109, period: "night" },
  { hour: "04:00", speed: 132, period: "night" },
  { hour: "05:00", speed: 162, period: "night" },
  { hour: "06:00", speed: 171, period: "morning" },
  { hour: "07:00", speed: 200, period: "morning" },
  { hour: "08:00", speed: 209, period: "morning" },
  { hour: "09:00", speed: 208, period: "morning" },
  { hour: "10:00", speed: 210, period: "morning" },
  { hour: "11:00", speed: 220, period: "morning" },
  { hour: "12:00", speed: 204, period: "afternoon" },
  { hour: "13:00", speed: 184, period: "afternoon" },
  { hour: "14:00", speed: 196, period: "afternoon" },
  { hour: "15:00", speed: 173, period: "afternoon" },
  { hour: "16:00", speed: 161, period: "afternoon" },
  { hour: "17:00", speed: 150, period: "afternoon" },
  { hour: "18:00", speed: 174, period: "afternoon" },
  { hour: "19:00", speed: 158, period: "afternoon" },
  { hour: "20:00", speed: 152, period: "afternoon" },
  { hour: "21:00", speed: 137, period: "afternoon" },
  { hour: "22:00", speed: 119, period: "night" },
  { hour: "23:00", speed: 90, period: "night" },
]

  const plateStatus = [
    { id: "0237/0B/033", status: "Ready" },
    { id: "0237/0B/033", status: "Completed" },
    { id: "0237/0B/033", status: "In Progress" },
    { id: "0237/0B/033", status: "Not Inspected" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-500"
      case "degraded":
        return "bg-yellow-500"
      case "down":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

 const getPeriodColor = (period: string) => {
  switch (period) {
    case "morning":
      return "bg-emerald-500"
    case "afternoon":
      return "bg-blue-500"
    case "night":
      return "bg-purple-500"
    default:
      return "bg-slate-500"
  }
}

  const getPlateStatusBadge = (status: string) => {
    switch (status) {
      case "Ready":
        return <Badge className="bg-yellow-500 text-black text-xs px-2 py-0.5 rounded-full">Ready</Badge>
      case "Completed":
        return <Badge className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">Completed</Badge>
      case "In Progress":
        return <Badge className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">In Progress</Badge>
      case "Not Inspected":
        return <Badge className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">Not Inspected</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 w-full bg-[#08080a]">
      <DashboardHeader /> 
      <div className="px-20 pb-8 w-full relative top-20">
        <div className="w-full px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-white">Flange Straightening •</h1>
                  <Link to="/operator-productivity">
                    <Badge className="bg-blue-600 text-white text-sm px-3 py-1 cursor-pointer hover:bg-blue-700 transition-colors">
                        Operator: Suraj
                    </Badge>
                  </Link>

                </div>
                <p className="text-s text-slate-400 mt-1">Straightening Line • Production Analytics Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-20 pb-8 w-full relative top-12">
        {/* Status Timeline */}
        <Card style={{ height: "12rem" }}  className="mb-6 bg-[#121529] border[#1f283b]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 relative -top-4">
                <StatusIcon className={`w-5 h-5 ${currentData.iconColor}`} />
                <div>
                  <CardTitle className="text-lg text-white">Flange Straightening</CardTitle>
                  <span
                    className={`text-sm ${
                      selectedPeriod === "24h"
                        ? "text-green-500"
                        : selectedPeriod === "7d"
                          ? "text-red-500"
                          : "text-green-500"
                    }`}
                  >
                    {currentData.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => setSelectedPeriod("24h")}
                    className={`text-xs px-3 py-1 ${
                      selectedPeriod === "24h"
                        ? "bg-blue-600 text-white"
                        : "bg-transparent text-slate-400 border border-slate-600 hover:bg-slate-700"
                    }`}
                  >
                    24h
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setSelectedPeriod("7d")}
                    className={`text-xs px-3 py-1 ${
                      selectedPeriod === "7d"
                        ? "bg-blue-600 text-white"
                        : "bg-transparent text-slate-400 border border-slate-600 hover:bg-slate-700"
                    }`}
                  >
                    7d
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setSelectedPeriod("30d")}
                    className={`text-xs px-3 py-1 ${
                      selectedPeriod === "30d"
                        ? "bg-blue-600 text-white"
                        : "bg-transparent text-slate-400 border border-slate-600 hover:bg-slate-700"
                    }`}
                  >
                    30d
                  </Button>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">{currentData.uptime}</div>
                  <div className="text-sm text-slate-400">Uptime</div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Timeline Bar */}
            <div className="flex h-7 rounded-sm mb-4 overflow-hidden border border-slate-600 relative -top-5">
              {timelineSegments.map((segment, index) => (
                <>
                  <div
                    key={segment.index}
                    className={`flex-1 ${getStatusColor(segment.status)} hover:opacity-80 transition-opacity cursor-pointer relative`}
                    style={{
                      minWidth: selectedPeriod === "30d" ? "0.5px" : "auto",
                    }}
                    onMouseEnter={(e) => {
                      setHoveredSegment(segment.index)
                      setMousePosition({ x: e.clientX, y: e.clientY })
                    }}
                    onMouseLeave={() => {
                      setHoveredSegment(null)
                    }}
                    onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
                  >
                    {/* Invisible hover area for 30d view */}
                    {selectedPeriod === "30d" && (
                      <div
                        className="absolute inset-0 z-10"
                        style={{
                          minWidth: "3px",
                          left: "-1px",
                          right: "-1px",
                        }}
                      />
                    )}
                  </div>
                  {index < timelineSegments.length - 1 && <div className="w-px bg-slate-600 opacity-30"></div>}
                </>
              ))}

              {/* Enhanced Tooltip */}
              {hoveredSegment !== null && (
                <div
                  className="fixed z-50 pointer-events-none"
                  style={{
                    left: mousePosition.x + 10,
                    top: mousePosition.y - 80,
                    transform: mousePosition.x > window.innerWidth - 200 ? "translateX(-100%)" : "none",
                  }}
                >
                  <div className="bg-slate-800 border border-slate-600 rounded-lg shadow-xl p-3 min-w-[200px]">
                    {(() => {
                      const segment = timelineSegments.find((s) => s.index === hoveredSegment)
                      if (!segment) return null
                      const tooltip = getTooltipContent(segment)
                      return (
                        <div className="space-y-2">
                          <div className="text-white font-medium text-sm border-b border-slate-600 pb-2">
                            Status Details
                          </div>
                          <div className="space-y-1">
                            <div className="flex text-sm">
                              <span className="text-slate-400 w-12">Time:</span>
                              <span className="text-white ml-2">{tooltip.dateTime}</span>
                            </div>
                            <div className="flex text-sm">
                              <span className="text-slate-400 w-12">Status:</span>
                              <span className={`ml-2 font-medium ${tooltip.statusColor}`}>{tooltip.status}</span>
                            </div>
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-between text-xs text-slate-400 mb-4 relative -top-6">
              {currentData.timeLabels.map((label, index) => (
                <span key={index}>{label}</span>
              ))}
            </div>
            <div className="flex items-center gap-6 text-sm relative -top-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-slate-300">{currentData.connected} Connected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-slate-300">{currentData.degraded} Degraded</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-slate-300">{currentData.down} Down</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hourly Line Speed Chart */}
            <Card  style={{ height: "26.5rem" }} className="bg-[#101629] border[#1f283b] ">
      <CardHeader>
        <div>
          <CardTitle className="text-lg mb-1 text-white">Hourly Avg. Line Speed</CardTitle>
          <p className="text-sm text-slate-400">24-hour production performance</p>
        </div>
        <div className="flex items-center gap-6 mt-4">
          < div className="relative" style={{ top: "-3.75rem", left: "25.5rem" }}>
            <div className="text-2xl font-bold text-white">203 MPM</div>
            <div className="text-xs text-slate-400">Current Hour</div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 text-sm mt-4 relative -top-10 bg-[#1f283b] p-3 rounded">
          <div className="text-center">
            <div className="font-semibold text-white">159</div>
            <div className="text-slate-400 text-xs">Avg MPM</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-white">219</div>
            <div className="text-slate-400 text-xs">Peak MPM</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-white">80</div>
            <div className="text-slate-400 text-xs">Min MPM</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-white">56%</div>
            <div className="text-slate-400 text-xs">Avg Efficiency</div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
  <div className="relative h-48 bg-[#101629] rounded p-3 -top-12">
    {/* Y-axis labels */}
    <div className="absolute left-2 top-0 h-full flex flex-col justify-between text-xs text-slate-400 py-3">
      <span>250</span>
      <span>200</span>
      <span>150</span>
      <span>100</span>
      <span>50</span>
      <span>0</span>
    </div>

    {/* Y-axis title */}
    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-slate-400">
      Speed (MPM)
    </div>

    {/* Chart area */}
    <div className="ml-12 h-full flex items-end justify-between gap-0.5 pb-3 pt-1 relative w-30">
      {/* Horizontal grid lines */}
      {[250, 200, 150, 100, 50, 0].map((val, idx) => (
        <div
          key={idx}
          className={`absolute left-0 w-full border-t ${
            val === 0 ? "border-slate-500" : "border-[#1f283b]"
          }`}
          style={{ bottom: `${(val / 250) * 100}%` }}
        />
      ))}

      {/* Bars */}
      {hourlySpeedData.map((item, index) => (
        <div
          key={index}
          className="flex flex-col justify-end items-center flex-1 relative h-full"
        >
          <div
            className={`w-3 ${getPeriodColor(item.period)} rounded-t cursor-pointer`}
            style={{ height: `${(item.speed / 250) * 100}%`, minHeight: "2px" }}
            onMouseEnter={(e) => {
              setHoveredBar(index);
              setBarMousePos({ x: e.clientX, y: e.clientY });
            }}
            onMouseLeave={() => setHoveredBar(null)}
            onMouseMove={(e) => setBarMousePos({ x: e.clientX, y: e.clientY })}
          />
        </div>
      ))}
    </div>

    {/* X-axis labels */}
    <div className="ml-10 flex justify-between text-[10px] text-slate-400 mt-1">
      {hourlySpeedData.map((item, index) => (
        <span key={index} className="flex-1 text-center">
          {index % 2 === 0 ? item.hour : ""}
        </span>
      ))}
    </div>

    {/* Tooltip */}
    {hoveredBar !== null && (
      <div
        className="fixed z-50 pointer-events-none"
        style={{
          left: barMousePos.x + 12,
          top: barMousePos.y - 70,
          transform:
            barMousePos.x > window.innerWidth - 200 ? "translateX(-100%)" : "none",
        }}
      >
        <div className="bg-slate-900 border border-slate-600 rounded-lg shadow-xl p-2 min-w-[160px] text-sm">
          <div className="text-white font-medium">
            {hourlySpeedData[hoveredBar].hour}
          </div>
          <div className="text-slate-400">
            Speed: <span className="text-white">{hourlySpeedData[hoveredBar].speed} MPM</span>
          </div>
          <div className="text-slate-400">
            Period:{" "}
            <span className="text-white capitalize">
              {hourlySpeedData[hoveredBar].period}
            </span>
          </div>
        </div>
      </div>
    )}
  </div>

  {/* Legend */}
  <div className="flex items-center justify-center gap-4 mt-3 text-sm relative -top-10">
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 bg-emerald-500 rounded"></div>
      <span className="text-slate-300">Morning (06-14)</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 bg-blue-500 rounded"></div>
      <span className="text-slate-300">Afternoon (14-22)</span>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 bg-purple-500 rounded"></div>
      <span className="text-slate-300">Night (22-06)</span>
    </div>
  </div>
</CardContent>

    </Card>
          {/* Production Progress */}
          <Card style={{ height: "12rem", width: "36rem" }} className="bg-[#101629] border[#1f283b] ">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white">Production Progress</CardTitle>
              <p className="text-sm text-slate-400">Daily target completion</p>
            </CardHeader>
            <CardContent className="space-y-2 py-2">
              <div >
                <div className="relative" style={{ top: "-4.75rem", left: "28.5rem" }}>
                  <div className="text-2xl font-bold text-white mb-2">77.8%</div>
                  <div className="text-sm text-slate-400 mb-2">Complete</div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-5 mb-3 relative" style={{ top: "-4.5rem" }}>
                  <div
                    className="bg-green-500 h-5 rounded-full transition-all duration-500"
                    style={{ width: "69.8%" }}
                  ></div>
                   <span className="absolute left-80 top-1/2 transform -translate-y-1/2 text-white text-xs font-semibold">78%</span>
                </div>
              </div>
              <div className="space-y-1 text-sm relative" style={{ top: "-4.5rem" }}>
                <div className="font-medium text-400">3,888 meters completed</div>
                <div className="text-slate-400 relative" style={{ left: "28.5rem" , top: "-1.5rem" }}>Target: 5,000</div>
                <div className="text-400 relative" style={{ left: "12.5rem" , top: "-1rem" }}><span className="text-orange-400">1,112</span> meters remaining</div>
              </div>
            </CardContent>
          </Card>

          {/* Plate Status */}
          <Card className="bg-[#101629] border[#1f283b]">
            <CardHeader>
              <CardTitle className="text-lg text-white">Plate Status</CardTitle>
              <p className="text-sm text-slate-400">Current plate inspection status</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-medium border-b border-slate-700 pb-2 text-slate-300">
                  <span>Plate ID</span>
                  <span>Status</span>
                </div>
                {plateStatus.map((plate, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center hover:bg-slate-700 p-2 rounded transition-colors"
                  >
                    <span className="text-sm font-mono text-slate-300">{plate.id}</span>
                    {getPlateStatusBadge(plate.status)}
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">4</div>
                  <div className="text-xs text-slate-400">Total Plates</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">1</div>
                  <div className="text-xs text-slate-400">In Progress</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

