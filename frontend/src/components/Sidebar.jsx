import { Plane } from "lucide-react";

export default function DroneBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* Primary Drone - High Visibility */}
      <div className="absolute top-[20%] left-[-10%] animate-droneFlight opacity-10 dark:opacity-20 transition-all duration-700">
        <Plane className="w-12 h-12 text-slate-400 dark:text-blue-400 rotate-90" />
        {/* Only glow in Dark Mode */}
        <div className="absolute -inset-4 bg-blue-500/20 blur-2xl rounded-full hidden dark:block" />
      </div>

      {/* Secondary Drone - Medium Distance */}
      <div 
        className="absolute top-[50%] left-[-20%] animate-droneFlight opacity-[0.05] dark:opacity-10 transition-all duration-700"
        style={{ animationDelay: '5s', animationDuration: '35s' }}
      >
        <Plane className="w-8 h-8 text-slate-300 dark:text-indigo-300 rotate-90" />
      </div>

      {/* Tertiary Drone - Far Distance */}
      <div 
        className="absolute top-[10%] left-[-30%] animate-droneFlight opacity-[0.03] dark:opacity-5 transition-all duration-700"
        style={{ animationDelay: '12s', animationDuration: '45s' }}
      >
        <Plane className="w-6 h-6 text-slate-300 dark:text-blue-200 rotate-90" />
      </div>

    </div>
  );
}