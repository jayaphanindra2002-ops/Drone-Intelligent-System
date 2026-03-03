import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AnalyticsPage() {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/analytics/")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Loading analytics...</p>;

  return (
    <div className="space-y-10 max-w-6xl">

      <h2 className="text-3xl font-semibold">System Analytics</h2>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        <StatCard title="Total Requests" value={data.total_requests} />
        <StatCard title="Chat Requests" value={data.chat_requests} />
        <StatCard title="Uptime (sec)" value={data.uptime_seconds} />
        <StatCard title="Tools Used" value={Object.keys(data.tool_usage).length} />

      </div>

      {/* Tool Usage */}
      <div className="bg-slate-800/70 backdrop-blur-lg p-6 rounded-xl border border-slate-700">
        <h3 className="text-xl mb-4">Tool Usage</h3>
        {Object.entries(data.tool_usage).map(([tool, count]) => (
          <div key={tool} className="flex justify-between border-b border-slate-700 py-2">
            <span>{tool}</span>
            <span>{count}</span>
          </div>
        ))}
      </div>

      {/* Popular Queries */}
      <div className="bg-slate-800/70 backdrop-blur-lg p-6 rounded-xl border border-slate-700">
        <h3 className="text-xl mb-4">Popular Queries</h3>
        {data.popular_queries.map(([query, count], index) => (
          <div key={index} className="flex justify-between border-b border-slate-700 py-2">
            <span className="truncate">{query}</span>
            <span>{count}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-slate-800/70 backdrop-blur-lg p-6 rounded-xl border border-slate-700 text-center transition"
    >
      <p className="text-sm text-slate-400">{title}</p>
      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </motion.div>
  );
}