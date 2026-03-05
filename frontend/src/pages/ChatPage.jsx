import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { sendMessage } from "../services/api";
import { SendHorizonal, Terminal, Globe, Sparkles, Download } from "lucide-react"; // Added Download icon
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Awaiting command. System ready for drone flight intelligence and regulatory analysis." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false); // Tracking export state
  const bottomRef = useRef(null);
  const chatContainerRef = useRef(null); // Ref for the capture area

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

const exportChatAsPDF = async () => {
    if (messages.length === 0) return;
    setIsExporting(true);

    const element = chatContainerRef.current;
    
    // 1. Preparation: Expand container to show all hidden messages
    const originalStyle = element.style.height;
    const originalOverflow = element.style.overflow;
    element.style.height = "auto";
    element.style.overflow = "visible";

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // High resolution
        useCORS: true,
        backgroundColor: document.documentElement.classList.contains('dark') ? "#020617" : "#f8fafc",
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      // 2. Immediate Restoration: Put the UI back to normal for the user
      element.style.height = originalStyle;
      element.style.overflow = originalOverflow;

      // 3. PDF Conversion Logic
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let heightLeft = pdfHeight;
      let position = 0;
      const pageHeight = pdf.internal.pageSize.getHeight();

      // First page
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;

      // 4. Multi-page Loop: Adds new pages if the content is too tall
      while (heightLeft >= 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }

      // 5. Trigger Download
      pdf.save(`AERODYN_TACTICAL_LOG_${new Date().getTime()}.pdf`);
      
    } catch (error) {
      console.error("Critical Export Error:", error);
      // Optional: Add a toast or alert here
    } finally {
      setIsExporting(false);
    }
  };

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
    <div className="flex flex-col h-[calc(100vh-160px)]">
      
      {/* Export Button - Tactical Floating Style */}
      <div className="flex justify-end mb-4">
        <button
          onClick={exportChatAsPDF}
          disabled={isExporting}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-500 dark:text-blue-400 text-[10px] font-mono uppercase tracking-widest hover:bg-blue-500/20 transition-all disabled:opacity-50"
        >
          {isExporting ? "Compiling Archive..." : <><Download size={14} /> Export Tactical Log</>}
        </button>
      </div>

      {/* ================= CHAT AREA ================= */}
      <div 
        ref={chatContainerRef} 
        className="flex-1 overflow-y-auto pr-4 space-y-8 custom-scrollbar p-4" // Added padding for PDF margins
      >
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`relative max-w-[85%] md:max-w-2xl p-6 rounded-2xl shadow-xl transition-all duration-300 ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-none shadow-blue-500/20"
                  : "bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-bl-none text-slate-900 dark:text-slate-100"
              }`}>
                
                <div className={`absolute -top-3 ${msg.role === "user" ? "right-4" : "left-4"} px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 shadow-sm`}>
                  {msg.role === "user" ? "Commander" : "Aero_AI"}
                </div>

                <div className={`prose prose-sm max-w-none prose-p:leading-relaxed ${msg.role === 'user' ? 'prose-invert' : 'dark:prose-invert'}`}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {typeof msg.text === "string" ? msg.text : ""}
                  </ReactMarkdown>
                </div>

                {msg.role === "ai" && (msg.tool || msg.sources?.length > 0) && (
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/5 space-y-2">
                    {msg.tool && (
                      <div className="flex items-center gap-2 text-[10px] font-mono text-blue-600 dark:text-blue-400 uppercase">
                        <Terminal size={12} />
                        <span>Execution Trace: {msg.tool}</span>
                      </div>
                    )}
                    {msg.sources?.length > 0 && (
                      <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase">
                        <Globe size={12} />
                        <span>Intel Sources: {msg.sources.join(" | ")}</span>
                      </div>
                    )}
                  </div>
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
          {/* Outer glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-10 dark:opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
          
          <div className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-2 shadow-xl dark:shadow-2xl transition-colors duration-300">
            <div className="pl-4 text-slate-400 dark:text-slate-500">
              <Sparkles size={18} />
            </div>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Input mission parameters..."
              className="flex-1 bg-transparent outline-none px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSend}
              className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-500 shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2"
            >
              <span className="text-xs font-bold uppercase tracking-wider px-1 hidden md:block">Transmit</span>
              <SendHorizonal size={18}/>
            </motion.button>
          </div>
        </div>
        <p className="text-center text-[10px] text-slate-400 dark:text-slate-600 mt-3 uppercase tracking-[0.2em]">Secure Quantum Encrypted Link</p>
      </div>
    </div>
  );
}