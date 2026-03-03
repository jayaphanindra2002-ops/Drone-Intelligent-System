import Sidebar from "./Sidebar";
import Header from "./Header";
import DroneBackground from "../components/DroneBackground";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 bg-[length:200%_200%] animate-[backgroundShift_20s_ease_infinite]">

      {/* <DroneBackground />  */}
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />

        <main
          role="main"
          className="flex-1 overflow-y-auto p-8 max-w-7xl mx-auto w-full"
        >
          {children}
        </main>
      </div>

    </div>
  );
}