import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Activity, Cpu, Command, ArrowUpRight } from "lucide-react";
import { API_BASE } from "../services/api";

export default function AnalyticsPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/analytics`)
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <AnalyticsSkeleton />;

  return (
    <div className="space-y-8 max-w-7xl animate-in fade-in duration-700">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-blue-500 font-mono text-xs tracking-[0.3em] uppercase mb-1">System Intelligence</p>
          <h2 className="text-4xl font-bold tracking-tight text-white">Telemetry Dashboard</h2>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-slate-500 text-[10px] uppercase tracking-widest">Last Sync</p>
          <p className="text-slate-300 font-mono text-xs">{new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Requests" value={data.total_requests} icon={<Activity size={16}/>} color="blue" />
        <StatCard title="Chat Density" value={data.chat_requests} icon={<Command size={16}/>} color="indigo" />
        <StatCard title="System Uptime" value={`${(data.uptime_seconds / 3600).toFixed(1)}h`} icon={<Cpu size={16}/>} color="emerald" />
        <StatCard title="Active Modules" value={Object.keys(data.tool_usage).length} icon={<BarChart3 size={16}/>} color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tool Usage - Visualized with Progress Bars */}
        <section className="bg-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-white/5 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
               Module Distribution
            </h3>
          </div>
          <div className="space-y-5">
            {Object.entries(data.tool_usage).map(([tool, count]) => (
              <div key={tool} className="group">
                <div className="flex justify-between mb-1.5 items-end">
                  <span className="text-xs font-medium text-slate-400 group-hover:text-blue-400 transition-colors uppercase tracking-wider">{tool}</span>
                  <span className="text-xs font-mono text-slate-500">{count} calls</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((count / data.total_requests) * 100, 100)}%` }}
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Queries - Tactical List */}
        <section className="bg-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-white/5 shadow-2xl">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
             Neural Query Logs
          </h3>
          <div className="space-y-2">
            {data.popular_queries.map(([query, count], index) => (
              <div key={index} className="flex justify-between items-center p-3 rounded-lg hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 group">
                <div className="flex items-center gap-3 truncate">
                    <span className="text-[10px] font-mono text-slate-600">0{index + 1}</span>
                    <span className="text-sm text-slate-300 truncate group-hover:text-white transition-colors">{query}</span>
                </div>
                <div className="flex items-center gap-2 ml-4">
                    <span className="text-xs font-mono text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded">{count}</span>
                    <ArrowUpRight size={14} className="text-slate-600 group-hover:text-blue-500 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  const colors = {
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-slate-900/40 backdrop-blur-xl p-5 rounded-2xl border border-white/5 flex flex-col justify-between"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg border ${colors[color]}`}>
          {icon}
        </div>
        <span className="text-[10px] font-bold text-slate-500 tracking-tighter uppercase">Live</span>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">{title}</p>
        <h3 className="text-2xl font-bold mt-1 text-white tracking-tight">{value}</h3>
      </div>
    </motion.div>
  );
}

function AnalyticsSkeleton() {
    return (
        <div className="space-y-8 max-w-7xl animate-pulse">
            <div className="h-12 w-64 bg-slate-800 rounded-lg mb-8" />
            <div className="grid grid-cols-4 gap-4">
                {[1,2,3,4].map(i => <div key={i} className="h-32 bg-slate-800 rounded-2xl" />)}
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div className="h-64 bg-slate-800 rounded-2xl" />
                <div className="h-64 bg-slate-800 rounded-2xl" />
            </div>
        </div>
    );
}