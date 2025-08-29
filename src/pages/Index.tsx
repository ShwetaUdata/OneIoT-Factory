import { DashboardHeader } from "@/components/DashboardHeader";
import { ProductionLine } from "@/components/ProductionLine";
import gasCuttingImage from "@/assets/gas-cutting.jpg";
import shotBlastingImage from "@/assets/shot-blasting.jpg";
import fitUpWeldingImage from "@/assets/fit-up-welding.jpg";
import fitUpWeldingBottomImage from "@/assets/fit-up-welding-bottom.jpg";
import flangeStraighteningImage from "@/assets/flange-straightening.jpg";

// Mock data for the production lines
const productionData = [
  {
    id: "gp-31",
    title: "Gas cutting: GP-31",
    status: "optimal" as const,
    operator: "Aditya",
    image: gasCuttingImage,
    production: {
      lineSpeed: 185,
      currentProduction: 185,
      targetSpeed: 200,
      targetPercentage: 92.5
    },
    progress: {
      label: "Plates Cut",
      current: 6314,
      target: 11550,
      unit: "mm",
      remaining: 5236,
      estimatedTime: 52
    },
    voltage: {
      value: 240,
      timestamp: "5 mins",
      data: [235, 238, 242, 240, 245, 238, 240, 242, 239, 241, 240, 238, 240]
    },
    power: {
      current: 18.5,
      watts: 3700,
      timestamp: "5 mins", 
      data: [18, 18.2, 18.8, 18.5, 18.9, 18.3, 18.5, 18.7, 18.4, 18.6, 18.5, 18.3, 18.5]
    }
  },
  {
    id: "shot-blasting",
    title: "Shot-blasting",
    status: "optimal" as const,
    operator: "Neeraj",
    image: shotBlastingImage,
    production: {
      lineSpeed: 185,
      currentProduction: 185,
      targetSpeed: 200,
      targetPercentage: 92.5
    },
    progress: {
      label: "Strips Processed",
      current: 1314,
      target: 34050,
      unit: "strips",
      remaining: 32736,
      estimatedTime: 327
    },
    voltage: {
      value: 180,
      timestamp: "5 mins",
      data: [175, 178, 182, 180, 185, 178, 180, 182, 179, 181, 180, 178, 180]
    },
    power: {
      current: 8.5,
      watts: 1700,
      timestamp: "5 mins",
      data: [8.2, 8.4, 8.7, 8.5, 8.8, 8.3, 8.5, 8.6, 8.4, 8.6, 8.5, 8.3, 8.5]
    }
  },
  {
    id: "fit-up-welding-top",
    title: "Fit-up & welding TOP",
    status: "optimal" as const,
    operator: "Neeraj",
    image: fitUpWeldingImage,
    production: {
      lineSpeed: 185,
      currentProduction: 185,
      targetSpeed: 200,
      targetPercentage: 92.5
    },
    progress: {
      label: "PGs Welded",
      current: 6314,
      target: 11550,
      unit: "PGs",
      remaining: 5236,
      estimatedTime: 52
    },
    voltage: {
      value: 250,
      timestamp: "5 mins",
      data: [245, 248, 252, 250, 255, 248, 250, 252, 249, 251, 250, 248, 250]
    },
    power: {
      current: 16.8,
      watts: 3360,
      timestamp: "5 mins",
      data: [16.5, 16.7, 17.0, 16.8, 17.2, 16.6, 16.8, 17.0, 16.7, 16.9, 16.8, 16.6, 16.8]
    }
  },
  {
    id: "fit-up-welding-bottom",
    title: "Fit-up & welding BOTTOM",
    status: "optimal" as const,
    operator: "Rahul",
    image: fitUpWeldingBottomImage,
    production: {
      lineSpeed: 185,
      currentProduction: 185,
      targetSpeed: 200,
      targetPercentage: 92.5
    },
    progress: {
      label: "PGs Welded",
      current: 5722,
      target: 11550,
      unit: "PGs",
      remaining: 5828,
      estimatedTime: 58
    },
    voltage: {
      value: 235,
      timestamp: "5 mins",
      data: [230, 233, 237, 235, 240, 233, 235, 237, 234, 236, 235, 233, 235]
    },
    power: {
      current: 15.2,
      watts: 2840,
      timestamp: "5 mins",
      data: [14.8, 15.1, 15.5, 15.2, 15.7, 15.0, 15.2, 15.4, 15.1, 15.3, 15.2, 15.0, 15.2]
    }
  },
  {
    id: "flange-straightening",
    title: "Flange Straightening",
    status: "maintenance" as const,
    operator: "Suraj",
    image: flangeStraighteningImage,
    production: {
      lineSpeed: 185,
      currentProduction: 185,
      targetSpeed: 200,
      targetPercentage: 92.5
    },
    progress: {
      label: "PGs Processed",
      current: 6793,
      target: 11550,
      unit: "PGs",
      remaining: 4757,
      estimatedTime: 48
    },
    voltage: {
      value: 210,
      timestamp: "5 mins",
      data: [205, 208, 212, 210, 215, 208, 210, 212, 209, 211, 210, 208, 210]
    },
    power: {
      current: 12.5,
      watts: 2500,
      timestamp: "5 mins",
      data: [12.2, 12.4, 12.7, 12.5, 12.8, 12.3, 12.5, 12.6, 12.4, 12.6, 12.5, 12.3, 12.5]
    }
  }
];

const Index = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-[#08080a]">
      <DashboardHeader />
      
      <main className="flex-1 ml-10 mt-10 p-6 overflow-auto">
           <div className="py-4 pb-5 px-5">
                <h1 className="text-3xl font-bold text-foreground">JSSL Indisec Line Factory</h1>
                <p className="text-sm text-muted-foreground">
                    Monitor and control all SSL production lines in real-time
                </p>
              </div>
        {productionData.map((line) => (
          <ProductionLine key={line.id} data={line} />
        ))}
      </main>
    </div>
  );
};

export default Index;
