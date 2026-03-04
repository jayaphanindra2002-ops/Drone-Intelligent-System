import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { sendMessage } from "../services/api";
import { SendHorizonal, Terminal, Globe, Database, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Awaiting command. System ready for drone flight intelligence and regulatory analysis." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await sendMessage(userMsg.text);
      setMessages(prev => [...prev, {
        role: "ai",
        text: res?.answer || "No response generated.",
        sources: res?.sources || [],
        tool: res?.tool_used || null,
        data: res?.data || null
      }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "ai", text: "CRITICAL_ERROR: Communication link severed." }]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {/* ================= CHAT AREA ================= */}
      <div className="flex-1 overflow-y-auto pr-4 space-y-8 custom-scrollbar">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`relative max-w-[85%] md:max-w-2xl p-6 rounded-2xl shadow-2xl transition-all ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-bl-none"
              }`}>
                
                {/* Role Badge */}
                <div className={`absolute -top-3 ${msg.role === "user" ? "right-4" : "left-4"} px-2 py-0.5 rounded bg-slate-800 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-slate-400`}>
                  {msg.role === "user" ? "Commander" : "Aero_AI"}
                </div>

                <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {typeof msg.text === "string" ? msg.text : ""}
                  </ReactMarkdown>
                </div>

                {/* AI Metadata: Tools & Sources */}
                {msg.role === "ai" && (msg.tool || msg.sources?.length > 0) && (
                  <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                    {msg.tool && (
                      <div className="flex items-center gap-2 text-[10px] font-mono text-blue-400 uppercase">
                        <Terminal size={12} />
                        <span>Execution Trace: {msg.tool}</span>
                      </div>
                    )}
                    {msg.sources?.length > 0 && (
                      <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 uppercase">
                        <Globe size={12} />
                        <span>Intel Sources: {msg.sources.join(" | ")}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Data Inspector */}
                {msg.data && (
                  <details className="mt-3 group">
                    <summary className="cursor-pointer text-[10px] font-mono text-slate-500 hover:text-blue-400 transition-colors list-none flex items-center gap-1 uppercase">
                      <Database size={10} /> View Raw Telemetry
                    </summary>
                    <pre className="mt-2 text-[10px] bg-black/40 p-3 rounded-lg border border-white/5 text-blue-300/80 overflow-x-auto font-mono">
                      {JSON.stringify(msg.data, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 items-center ml-4">
             <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                    className="w-1.5 h-1.5 bg-blue-500 rounded-full"
                  />
                ))}
             </div>
             <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Processing Uplink...</span>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* ================= INPUT AREA ================= */}
      <div className="mt-auto pt-6 bg-transparent">
        <div className="relative group max-w-4xl mx-auto w-full">
          {/* Outer glow effect on focus */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
          
          <div className="relative flex items-center bg-slate-900 border border-white/10 rounded-2xl p-2 shadow-2xl">
            <div className="pl-4 text-slate-500">
              <Sparkles size={18} />
            </div>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Input mission parameters or questions..."
              className="flex-1 bg-transparent outline-none px-4 py-3 text-sm text-white placeholder:text-slate-600"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-500 shadow-lg shadow-blue-900/40 transition-all flex items-center gap-2"
            >
              <span className="text-xs font-bold uppercase tracking-wider px-1 hidden md:block">Transmit</span>
              <SendHorizonal size={18}/>
            </motion.button>
          </div>
        </div>
        <p className="text-center text-[10px] text-slate-600 mt-3 uppercase tracking-[0.2em]">Secure Quantum Encrypted Link</p>
      </div>
    </div>
  );
}