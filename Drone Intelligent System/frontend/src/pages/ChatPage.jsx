import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { sendMessage } from "../services/api";
import { SendHorizonal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatPage() {

  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello 👋 Ask me anything about drones in India." }
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

      const aiMsg = {
        role: "ai",
        text: res?.answer || "No response generated.",
        sources: res?.sources || [],
        tool: res?.tool_used || null,
        data: res?.data || null
      };

      setMessages(prev => [...prev, aiMsg]);

    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: "ai", text: "⚠️ Error contacting AI server." }
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full">

      {/* ================= CHAT AREA ================= */}
      <div className="flex-1 overflow-y-auto space-y-6">

        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`max-w-2xl p-5 rounded-2xl shadow-lg ${
                msg.role === "user"
                  ? "bg-blue-600 ml-auto text-white"
                  : "bg-slate-800/80 backdrop-blur-lg border border-slate-700"
              }`}
            >
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {typeof msg.text === "string" ? msg.text : ""}
                </ReactMarkdown>
              </div>

              {msg.tool && (
                <div className="text-xs mt-3 text-blue-300">
                  🔧 Tool used: {msg.tool}
                </div>
              )}

              {msg.sources?.length > 0 && (
                <div className="mt-2 text-xs text-slate-400">
                  Sources: {msg.sources.join(", ")}
                </div>
              )}

              {msg.data && (
                <pre className="mt-4 text-xs bg-slate-900 p-3 rounded-lg overflow-x-auto">
                  {JSON.stringify(msg.data, null, 2)}
                </pre>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-800 p-4 rounded-2xl w-fit flex gap-2 items-center"
          >
            <span className="text-slate-400 text-sm">AI is thinking</span>
            <TypingDots />
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ================= INPUT AREA ================= */}
      <div className="mt-6 border-t border-slate-700 pt-4">
        <div className="flex gap-3 bg-slate-800 rounded-xl p-2 shadow-md">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about drone regulations, ROI, flight time..."
            className="flex-1 bg-transparent outline-none px-3 text-white"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-500 p-3 rounded-lg transition"
          >
            <SendHorizonal size={18}/>
          </motion.button>

        </div>
      </div>

    </div>
  );
}

/* ================= TYPING DOTS ================= */

function TypingDots() {
  return (
    <div className="flex gap-1">
      <motion.span
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 0.6 }}
        className="w-2 h-2 bg-blue-400 rounded-full"
      />
      <motion.span
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
        className="w-2 h-2 bg-blue-400 rounded-full"
      />
      <motion.span
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
        className="w-2 h-2 bg-blue-400 rounded-full"
      />
    </div>
  );
}