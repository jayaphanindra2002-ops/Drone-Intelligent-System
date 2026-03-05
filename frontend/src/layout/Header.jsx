import { useState, useEffect } from "react";
import { Cpu, Bell, UserCircle, Sun, Moon } from "lucide-react";

export default function Header() {
  const [isDark, setIsDark] = useState(true);

  // Sync with HTML class and LocalStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    const dark = savedTheme === "dark";
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    const themeStr = newDark ? "dark" : "light";
    localStorage.setItem("theme", themeStr);
    document.documentElement.classList.toggle("dark", newDark);
  };

  return (
    <header className="h-16 border-b border-slate-200/50 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-50 transition-colors duration-300">
      
      <div className="flex items-center gap-4">
        <Cpu className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <div className="flex flex-col">
          <h2 className="text-sm font-semibold tracking-wide uppercase text-slate-800 dark:text-slate-100">
            AI Drone Assistant
          </h2>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase">System Active</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-white/5 hover:border-blue-500 transition-all"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-white/10">
          <div className="text-right hidden md:block">
            <p className="text-xs font-medium text-slate-800 dark:text-slate-200">Admin Control</p>
          </div>
          <UserCircle className="w-8 h-8 text-slate-400 dark:text-slate-300" />
        </div>
      </div>
    </header>
  );
}