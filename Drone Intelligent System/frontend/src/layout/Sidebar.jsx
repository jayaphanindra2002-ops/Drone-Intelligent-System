import { MessageSquare, Upload, BarChart3 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {

  const location = useLocation();

  const navItem = (to, icon, label) => (
    <Link
      to={to}
      className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${
        location.pathname === to
          ? "bg-blue-600"
          : "hover:bg-slate-800"
      }`}
    >
      {icon}
      {label}
    </Link>
  );

  return (
    <aside className="w-64 bg-slate-900/70 backdrop-blur-xl border-r border-slate-700 flex flex-col p-5">

      <h1 className="text-xl font-semibold mb-10">
        🚁 Drone AI
      </h1>

      <nav className="space-y-2">
        {navItem("/chat", <MessageSquare size={18} />, "Chat")}
        {navItem("/upload", <Upload size={18} />, "Upload")}
        {navItem("/analytics", <BarChart3 size={18} />, "Analytics")}
      </nav>

      <div className="mt-auto text-sm text-slate-400">
        v1.0 Drone Intelligence
      </div>

    </aside>
  );
}