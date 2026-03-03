import { Link, useLocation } from "react-router-dom";
import { MessageSquare, Upload, BarChart3 } from "lucide-react";

export default function Sidebar() {

  const location = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-3 w-full p-3 rounded-lg transition ${
      location.pathname === path
        ? "bg-blue-600"
        : "hover:bg-slate-800"
    }`;

  return (
    <aside className="w-64 bg-slate-900/70 backdrop-blur-xl border-r border-slate-700 flex flex-col p-5">

      <h1 className="text-xl font-semibold mb-10">
        🚁 Drone AI
      </h1>

      <nav className="space-y-2">

        <Link to="/chat" className={linkClass("/chat")}>
          <MessageSquare size={18}/> Chat
        </Link>

        <Link to="/upload" className={linkClass("/upload")}>
          <Upload size={18}/> Upload
        </Link>

        <Link to="/analytics" className={linkClass("/analytics")}>
          <BarChart3 size={18}/> Analytics
        </Link>

      </nav>

      <div className="mt-auto text-sm text-slate-400">
        v1.0 Drone Intelligence
      </div>

    </aside>
  );
}