import { Cpu, Bell, UserCircle, Activity } from "lucide-react"; // Optional: npm install lucide-react

export default function Header() {
  return (
    <header className="h-16 border-b border-white/10 bg-slate-900/60 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-50">
      
      {/* Left Side: Title & Status */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Cpu className="w-6 h-6 text-blue-400" />
          {/* Subtle glow effect behind the icon */}
          <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full"></div>
        </div>
        
        <div className="flex flex-col">
          <h2 className="text-sm font-semibold tracking-wide uppercase text-slate-100">
            AI Drone Assistant
          </h2>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
              System Active
            </span>
          </div>
        </div>
      </div>

      {/* Right Side: Actions & Profile */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative text-slate-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full border-2 border-slate-900"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-6 border-l border-white/10">
          <div className="text-right hidden md:block">
            <p className="text-xs font-medium text-slate-200">Admin Control</p>
            <p className="text-[10px] text-slate-500">Sector 7-G</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-400 flex items-center justify-center p-[1px]">
             <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
               <UserCircle className="w-6 h-6 text-slate-300" />
             </div>
          </div>
        </div>
      </div>
      
    </header>
  );
}