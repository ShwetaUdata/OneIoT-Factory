import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { GaugeCircle, MoreVertical, TrendingUp, Zap } from "lucide-react"
import { MetricChart } from "./MetricChart"
import { Link } from "react-router-dom"

interface ProductionLineData {
  id: string
  title: string
  status: "optimal" | "warning" | "critical" | "maintenance"
  operator: string
  image: string
  production: {
    lineSpeed: number
    currentProduction: number
    targetSpeed: number
    targetPercentage: number
  }
  progress: {
    label: string
    current: number
    target: number
    unit: string
    remaining: number
    estimatedTime: number
  }
  voltage: {
    value: number
    timestamp: string
    data: number[]
  }
  power: {
    current: number
    watts: number
    timestamp: string
    data: number[]
  }
}

interface ProductionLineProps {
  data: ProductionLineData
}

export const ProductionLine = ({ data }: ProductionLineProps) => {
  const statusColors: Record<string, string> = {
    optimal: "bg-[#072e1e] text-green-500",
    warning: "bg-warning text-black",
    critical: "bg-destructive text-destructive-foreground",
    maintenance: "bg-[#6b551e] text-yellow-500",
  }
  
  const getRoutePath = (title: string) => {
    switch (title) {
      case "Gas cutting: GP-31":
        return "/gas-cutting-gp-31"
      case "Shot-blasting":
        return "/shot-blasting"
      case "Fit-up & welding TOP":
        return "/fit-up-welding-top-details"
      case "Fit-up & welding BOTTOM":
        return "/fit-up-welding-bottom-details"
      case "Flange Straightening":
        return "/flange-straightening"
      default:
        return "/"
    }
  }

  const routePath = getRoutePath(data.title)

  return (
   
    <main className="p-3 space-y-8">
      <div className="flex items-center justify-between px-5">
        <div className="flex items-center gap-3">
          <Link
            to={routePath}
            className="hover:text-primary transition-colors duration-200 cursor-pointer"
          >
            <h2 className="text-xl font-semibold text-foreground">{data.title}</h2>
          </Link>

          <Link to={routePath}>
            <Badge
              className={`${statusColors[data.status] ?? "bg-muted text-black"} text-xs px-2 py-1 hover:opacity-80 transition-opacity duration-200 cursor-pointer`}
            >
              {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
            </Badge>
          </Link>

          <Link to={routePath}>
            <Badge className="bg-[#333d4d] text-primary-foreground text-xs px-2 py-1 hover:bg-white hover:text-black cursor-pointer">
              Operator: {data.operator}
            </Badge>
          </Link>
        </div>

        <button className="p-2 ">
          <MoreVertical className="w-5 h-5 text-muted-foreground hover:text-white" />
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Production Image */}
        <div className="lg:col-span-1">
          <Link to={routePath} className="block">
            <img
              src={data.image || "/placeholder.svg"}
              alt={data.title}
              className="h-64 w-full object-cover rounded-lg cursor-pointer"
            />
          </Link>
        </div>

        {/* Production Metrics */}
        <Link to={routePath} className="lg:col-span-1 ">
          <Card className="h-64 w-full object-cover rounded-lg cursor-pointer bg-[#101629]">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <GaugeCircle className="w-4 h-4 text-white" />
                <CardTitle className="text-sm text-card-foreground">{data.title} - Production</CardTitle>
                <div className="flex items-center ml-auto gap-2 cursor-default">
      {/* Small pulsating green circle */}
      <span
        className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"
        style={{  boxShadow: '0 0 6px 2px rgba(34,197,94, 0.7)' }}
      />
      {/* Live text with green color */}
      <span className="text-green-600 font-semibold text-s select-none">Live</span>
    </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs text-muted-foreground mb-2">Current Production</div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-bold text-foreground">{data.production.currentProduction}</span>
                    <span className="text-sm text-muted-foreground">MPM</span>
                    <span className="text-xs text-muted-foreground">/ {data.production.targetSpeed} target</span>
                  </div>
                  <Progress value={data.production.targetPercentage} className="h-2 w-full mb-2 [&>div]:bg-primary" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">{data.production.lineSpeed} MPM Line Speed</div>
                  <div className="text-xs text-muted-foreground">{data.production.targetPercentage}% of target</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-muted-foreground">{data.progress.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {((data.progress.current / data.progress.target) * 100).toFixed(1)}% complete
                  </span>
                </div>
                <div className="mb-2">
                  <span className="text-lg font-bold text-foreground">{data.progress.current.toLocaleString()}</span>
                  <span className="text-sm text-foreground ml-1">
                    {data.progress.unit} / {data.progress.target.toLocaleString()} {data.progress.unit} target
                  </span>
                </div>
                <Progress
                  value={(data.progress.current / data.progress.target) * 100}
                  className="h-2 mb-2 [&>div]:bg-success"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{data.progress.remaining.toLocaleString()} {data.progress.unit} remaining</span>
                  <span>Est. {data.progress.estimatedTime}min</span>
                </div>
              </div>
              
            </CardContent>
          </Card>
        </Link>

        {/* Voltage */}
        <Link to={routePath} className="lg:col-span-1">
          <Card className="h-64 w-full object-cover rounded-lg cursor-pointer bg-[#101629]">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-voltage-white" />
                <CardTitle className="text-sm text-card-foreground">{data.title} - Voltage</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <div className="text-2xl font-bold text-orange-500">{data.voltage.value}V</div>
                  <div className="text-xs text-muted-foreground">({data.voltage.timestamp})</div>
                </div>
              </div>
              <div className="mt-0 h-[142px]">
                <MetricChart
                  data={data.voltage.data}
                  color="voltage"
                  height={100}
                  title={data.title}
                  value={`${data.voltage.value}V`}
                  timestamp={data.voltage.timestamp}
                />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Current & Power */}
        <Link to={routePath} className="lg:col-span-1">
          <Card className="h-64 w-full object-cover rounded-lg cursor-pointer bg-[#101629]">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-success-white" />
                <CardTitle className="text-sm text-card-foreground relative -top-1">{data.title} - Current & Power</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-2">
                <div className="flex items-baseline gap-4 -top-2 relative">
                  <div className="text-xl font-bold text-orange-500">{data.power.current}A</div>
                  <div className="text-xl font-bold text-purple-500">{data.power.watts}W</div>
                </div>
                <div className="text-xs text-muted-foreground -top-3 relative">({data.power.timestamp})</div>
              </div>
              <div className="mt-0 h-[122px]">
                <MetricChart
                  data={data.power.data}
                  color="power"
                  height={80}
                  title={data.title}
                  value={`${data.power.current}A / ${data.power.watts}W`}
                  timestamp={data.power.timestamp}
                />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </main>
  )
}
