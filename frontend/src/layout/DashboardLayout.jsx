import Sidebar from "./Sidebar";
import Header from "./Header";
import DroneBackground from "../components/DroneBackground";

export default function DashboardLayout({ children }) {
  return (
    <div className="relative min-h-screen flex bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 bg-[length:200%_200%] animate-[backgroundShift_15s_ease_infinite] overflow-hidden">
      
      {/* Background Layer - Set to absolute to keep it behind everything */}
      {/* <DroneBackground /> */}

      <Sidebar />

      <div className="flex flex-col flex-1 relative z-10 h-screen overflow-hidden">
        <Header />

        <main
          role="main"
          className="flex-1 overflow-y-auto p-4 md:p-8"
        >
          {/* Content Wrapper: Added Max-width and Glass effect */}
          <div className="max-w-7xl mx-auto w-full min-h-full">
            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}