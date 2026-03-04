import { Plane } from "lucide-react";

export default function DroneBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* Primary Drone - Large and slightly more visible */}
      <div className="absolute top-[20%] left-[-10%] animate-droneFlight opacity-20 transition-opacity">
        <Plane className="w-12 h-12 text-blue-400 rotate-90" />
        <div className="absolute -inset-4 bg-blue-500/20 blur-2xl rounded-full" />
      </div>

      {/* Secondary Drone - Smaller, slower, and faded */}
      <div 
        className="absolute top-[50%] left-[-20%] animate-droneFlight opacity-10"
        style={{ animationDelay: '5s', animationDuration: '35s' }}
      >
        <Plane className="w-8 h-8 text-indigo-300 rotate-90" />
      </div>

      {/* Tertiary Drone - Far off in the distance */}
      <div 
        className="absolute top-[10%] left-[-30%] animate-droneFlight opacity-5"
        style={{ animationDelay: '12s', animationDuration: '45s' }}
      >
        <Plane className="w-6 h-6 text-blue-200 rotate-90" />
      </div>

    </div>
  );
}