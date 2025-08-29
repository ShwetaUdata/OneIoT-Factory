import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardHeader } from "@/components/DashboardHeader";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const statusStyles = {
  connected: {
    backgroundColor: "#22c55e",
    color: "#22c55e",
  },
  degraded: {
    backgroundColor: "#eab308",
    color: "#eab308",
  },
  down: {
    backgroundColor: "#ef4444",
    color: "#ef4444",
  },
};

const statusMap = {
  connected: {
    label: "Connected",
    description: "System is fully operational.",
  },
  degraded: {
    label: "Degraded",
    description: "Productivity below threshold.",
  },
  down: {
    label: "Down",
    description: "Operator/System is offline.",
  },
};

function generateTimeline(length: number, connectedPct: number, degradedPct: number, downPct: number) {
  const timeline = [];
  const connectedBlocks = Math.floor((length * connectedPct) / 100);
  const degradedBlocks = Math.floor((length * degradedPct) / 100);
  const downBlocks = length - connectedBlocks - degradedBlocks;
  for (let i = 0; i < connectedBlocks; i++) timeline.push("connected");
  for (let i = 0; i < degradedBlocks; i++) timeline.push("degraded");
  for (let i = 0; i < downBlocks; i++) timeline.push("down");
  return timeline.sort(() => Math.random() - 0.5);
}

const operators = [
  {
    name: "Aditya",
    status: "Operational",
    uptime24h: 93.750,
    uptime7d: 94.500,
    uptime30d: 92.100,
    connected: 93.8,
    degraded: 5.2,
    down: 1.0,
    timelines: {
      "24h": generateTimeline(48, 93.8, 5.2, 1.0),
      "7d": generateTimeline(168, 93.8, 5.2, 1.0),
      "30d": generateTimeline(720, 93.8, 5.2, 1.0),
    },
  },
  {
    name: "Neeraj",
    status: "Operational",
    uptime24h: 95.833,
    uptime7d: 97.000,
    uptime30d: 96.200,
    connected: 95.8,
    degraded: 4.2,
    down: 0.0,
    timelines: {
      "24h": generateTimeline(48, 95.8, 4.2, 0.0),
      "7d": generateTimeline(168, 95.8, 4.2, 0.0),
      "30d": generateTimeline(720, 95.8, 4.2, 0.0),
    },
  },
  {
    name: "Rahul",
    status: "Operational",
    uptime24h: 92.708,
    uptime7d: 93.500,
    uptime30d: 91.400,
    connected: 92.7,
    degraded: 4.2,
    down: 3.1,
    timelines: {
      "24h": generateTimeline(48, 92.7, 4.2, 3.1),
      "7d": generateTimeline(168, 92.7, 4.2, 3.1),
      "30d": generateTimeline(720, 92.7, 4.2, 3.1),
    },
  },
  {
    name: "Suraj",
    status: "Operational",
    uptime24h: 88.542,
    uptime7d: 89.200,
    uptime30d: 87.300,
    connected: 88.5,
    degraded: 8.3,
    down: 3.1,
    timelines: {
      "24h": generateTimeline(48, 88.5, 8.3, 3.1),
      "7d": generateTimeline(168, 88.5, 8.3, 3.1),
      "30d": generateTimeline(720, 88.5, 8.3, 3.1),
    },
  },
];

interface TimelineBarProps {
  timeline: string[];
  interval: string;
}

function TimelineBar({ timeline, interval }: TimelineBarProps) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const blocks = timeline.length;

  const getTimeLabels = () => {
    if (interval === "24h") return ["00:00", "08:00", "12:00", "18:00", "24:00"];
    if (interval === "7d") return ["Day 1", "Day 3", "Day 5", "Day 7"];
    return ["Day 1", "Day 10", "Day 20", "Day 30"];
  };

  const labels = getTimeLabels();

  return (
    <div style={{ margin: "16px 0", width: "100%", position: "relative" }}>
      <div
        style={{
          display: "flex",
          gap: 1,
          height: 24,
          width: "100%",
          borderRadius: 12,
          overflow: "visible",
          backgroundColor: "black",
          position: "relative",
        }}
      >
        {timeline.map((status, idx) => (
          <div
            key={idx}
            style={{
              ...statusStyles[status as keyof typeof statusStyles],
              flex: 1,
              height: "100%",
              cursor: "pointer",
              position: "relative",
              transition: "opacity 0.2s",
              opacity: hoverIdx === idx ? 0.8 : 1,
            }}
            onMouseEnter={() => setHoverIdx(idx)}
            onMouseLeave={() => setHoverIdx(null)}
          >
            {hoverIdx === idx && (
              <div
                style={{
                  position: "absolute",
                  zIndex: 1000,
                  left: "50%",
                  transform: "translateX(-50%)",
                  top: 30, // tooltip below the bar
                  backgroundColor: "#1e293b",
                  border: "1px solid #475569",
                  borderRadius: 12,
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.6)",
                  padding: 12,
                  minWidth: 200,
                  color: "#f1f5f9",
                  whiteSpace: "normal",
                  fontSize: 13,
                }}
              >
                <div style={{ color: "white", fontWeight: "500", fontSize: 14, borderBottom: "1px solid #475569", paddingBottom: 8, marginBottom: 8 }}>
                  Status Details
                </div>
                <div style={{ display: "flex", fontSize: 12, gap: 8, marginBottom: 4 }}>
                  <span style={{ color: "#94a3b8", minWidth: 48 }}>Time:</span>
                  <span style={{ color: "#f1f5f9" }}>
                    {interval === "24h"
                      ? `${Math.floor((hoverIdx! * 24) / blocks)}:${String((hoverIdx! * 60) % 60).padStart(2, "0")}`
                      : interval === "7d"
                      ? `Day ${Math.ceil(((hoverIdx! + 1) / blocks) * 7)}`
                      : `Day ${Math.ceil(((hoverIdx! + 1) / blocks) * 30)}`}
                  </span>
                </div>
                <div style={{ display: "flex", fontSize: 12, gap: 8 }}>
                  <span style={{ color: "#94a3b8", minWidth: 48 }}>Status:</span>
                  <span
                    style={{
                      fontWeight: 600,
                      color:
                        statusStyles[timeline[hoverIdx!] as keyof typeof statusStyles].color,
                    }}
                  >
                    {statusMap[timeline[hoverIdx!] as keyof typeof statusMap].label}
                  </span>
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    top: "100%",
                    width: 0,
                    height: 0,
                    borderLeft: "7px solid transparent",
                    borderRight: "7px solid transparent",
                    borderTop: "7px solid #1e293b",
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", color: "#9ca3af", fontSize: 10, marginTop: 8, paddingLeft: 4, paddingRight: 4 }}>
        {labels.map((label, i) => (
          <span key={i}>{label}</span>
        ))}
      </div>
    </div>
  );
}

interface OperatorData {
  name: string;
  status: string;
  uptime24h: number;
  uptime7d: number;
  uptime30d: number;
  connected: number;
  degraded: number;
  down: number;
  timelines: { [key: string]: string[] };
}

interface OperatorCardProps {
  data: OperatorData;
}

function OperatorCard({ data }: OperatorCardProps) {
  const [interval, setInterval] = useState("24h");

  const uptimeByInterval = () => {
    if (interval === "24h") return data.uptime24h;
    if (interval === "7d") return data.uptime7d;
    if (interval === "30d") return data.uptime30d;
    return data.uptime24h;
  };

  return (
    <div style={{ width: "100%", background: "#101629", borderRadius: 16, padding: 24, marginBottom: 24, border: "1px solid #1f283b" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <span style={{ background: "white", color: "black", padding: "5px 16px", borderRadius: 9999, fontWeight: "500", fontSize: 14, userSelect: "none" }}>
            Operator: {data.name}
          </span>
          <span style={{ color: "#16a34a", fontWeight: "600", fontSize: 14 }}>{data.status}</span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {["24h", "7d", "30d"].map((val) => (
            <Button
              key={val}
              onClick={() => setInterval(val)}
              variant={interval === val ? "default" : "secondary"}
              size="sm"
              style={{
                backgroundColor: interval === val ? "#2563eb" : "#344054",
                color: "white" ,
                cursor: "pointer",
                padding: "0px 10px",
                borderRadius: 6,
                border: "none",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement);
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement);
              }}
            >
              {val}
            </Button>
          ))}
          <div style={{ display: "flex", gap: 8, marginLeft: 24, alignItems: "center" }}>
            <span style={{ fontWeight: "bold", fontSize: 28, color: "white" }}>{uptimeByInterval().toFixed(3)}%</span>
            <p style={{ color: "#9ca3af", fontSize: 14 }}>Uptime</p>
          </div>
        </div>
      </div>

      <TimelineBar timeline={data.timelines[interval]} interval={interval} />

      <div style={{ display: "flex", gap: 32, fontSize: 14, marginTop: 16 }}>
        <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: statusStyles.connected.backgroundColor, display: "inline-block" }}></span>
          <span style={{ color: statusStyles.connected.color, fontWeight: "500" }}>{data.connected}% Connected</span>
        </span>
        <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: statusStyles.degraded.backgroundColor, display: "inline-block" }}></span>
          <span style={{ color: statusStyles.degraded.color, fontWeight: "500" }}>{data.degraded}% Degraded</span>
        </span>
        <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: statusStyles.down.backgroundColor, display: "inline-block" }}></span>
          <span style={{ color: statusStyles.down.color, fontWeight: "500" }}>{data.down}% Down</span>
        </span>
      </div>
    </div>
  );
}

export default function OperatorDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 w-full bg-[#08080a]">
          <DashboardHeader />
      <div className="px-20 pb-8 w-full relative top-16">
      <div className="flex items-center gap-4 relative top-8">
          <Link to="/" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
              <ArrowLeft className="w-4 h-4" />
           </Link>
      </div>
      <h1 className="text-3xl font-bold text-white px-10">Operator Productivity</h1>         <div className="text-slate-400 text-lg mt-2 mb-7 px-10">
           Real-time productivity and timeline analysis for all operators
       </div>
        {operators.map((op, i) => (
          <OperatorCard key={i} data={op} />
        ))}
      </div>
      </div>
  );
}
