import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";
import Header from "./Header";
// import DroneBackground from "../components/DroneBackground";

export default function DashboardLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 2-second boot sequence
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    /* Changed bg-slate-950 to a dynamic background that supports light/dark */
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden transition-colors duration-500">
      <AnimatePresence mode="wait">
        {isLoading ? (
          /* --- INTRO SCENE (Loading Screen) --- */
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-1 bg-cyan-500 shadow-[0_0_15px_#06b6d4]"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="mt-4 text-cyan-500 font-mono text-xs tracking-widest uppercase"
            >
              Establishing Link...
            </motion.p>
          </motion.div>
        ) : (
          /* --- ACTUAL DASHBOARD (Assembling UI) --- */
          <motion.div
            key="dashboard"
            className="relative min-h-screen flex transition-colors duration-500
              bg-gradient-to-br from-slate-100 via-slate-200 to-blue-50 
              dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 
              bg-[length:200%_200%] animate-[backgroundShift_15s_ease_infinite]"
          >
            {/* Sidebar sliding in from the left */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex shrink-0"
            >
              <Sidebar />
            </motion.div>

            <div className="flex flex-col flex-1 relative z-10 h-screen overflow-hidden">
              {/* Header fading in from the top */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Header />
              </motion.div>

              <main role="main" className="flex-1 overflow-y-auto p-4 md:p-8">
                {/* Content Box scaling and fading in */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="max-w-7xl mx-auto w-full min-h-full"
                >
                  {/* Dynamic Glass Effect Styles */}
                  <div className="
                    bg-white/70 dark:bg-slate-900/40 
                    backdrop-blur-md 
                    border border-slate-200 dark:border-slate-700/50 
                    rounded-2xl p-6 shadow-xl dark:shadow-2xl 
                    text-slate-900 dark:text-slate-100 
                    transition-all duration-300"
                  >
                    {children}
                  </div>
                </motion.div>
              </main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}