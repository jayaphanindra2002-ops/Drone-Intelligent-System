import { MessageSquare, Upload, BarChart3, ShieldCheck, Zap } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const navItem = (to, icon, label) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`group relative flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-300 ${
          isActive
            ? "bg-blue-600/10 text-blue-600 dark:text-blue-400 shadow-[inset_0_0_12px_rgba(37,99,235,0.1)] dark:shadow-[inset_0_0_12px_rgba(37,99,235,0.2)]"
            : "text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-slate-100 hover:bg-blue-50 dark:hover:bg-white/5"
        }`}
      >
        {/* Active Indicator Line */}
        {isActive && (
          <div className="absolute left-0 w-1 h-5 bg-blue-500 rounded-r-full shadow-[0_0_8px_#3b82f6]" />
        )}
        
        <span className={`transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
          {icon}
        </span>
        <span className="text-sm font-medium tracking-wide">{label}</span>
      </Link>
    );
  };

  return (
    <aside className="w-72 bg-white/80 dark:bg-slate-950/40 backdrop-blur-2xl border-r border-slate-200 dark:border-white/5 flex flex-col p-6 overflow-hidden transition-colors duration-500">
      
      {/* Realistic Tech Logo */}
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="relative flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg shadow-lg shadow-blue-900/20">
            <Zap className="text-white w-6 h-6" fill="currentColor" />
            <div className="absolute inset-0 border border-blue-400/30 rounded-lg animate-pulse" />
        </div>
        <div>
            <h1 className="text-lg font-bold tracking-tighter text-slate-900 dark:text-white leading-none">
                AERO<span className="text-blue-500 tracking-normal ml-0.5">DYN</span>
            </h1>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.2em]">Intelligence</p>
        </div>
      </div>

      {/* Navigation Group */}
      <div className="space-y-1">
        <p className="px-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Core Systems</p>
      
        <nav className="space-y-1.5">
          {navItem("/", <MessageSquare size={19} />, "Neural Chat")}
          {navItem("/upload", <Upload size={19} />, "Data Uplink")}
          {navItem("/analytics", <BarChart3 size={19} />, "Telemetry")}
        </nav>
      </div>

      {/* Bottom Profile/Status Area */}
      <div className="mt-auto pt-6 border-t border-slate-200 dark:border-white/5">
        <div className="bg-slate-100 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-white/5 transition-colors duration-300">
            <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400">CORE_LINK_ESTABLISHED</span>
            </div>
            <div className="mt-2 text-[10px] text-slate-400 dark:text-slate-500 flex justify-between">
                <span>V1.0.4-STABLE</span>
                <ShieldCheck size={12} className="text-emerald-500/50" />
            </div>
        </div>
      </div>
    </aside>
  );
}