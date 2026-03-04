import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2, ShieldCheck } from "lucide-react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/upload/", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setStatus({ 
        type: "success", 
        message: `Uplink Complete. Vector DB synchronized.`,
        details: `${data.chunks_created} neural chunks indexed.` 
      });
    } catch (error) {
      setStatus({ type: "error", message: "Uplink Failed. Protocol check required." });
    }
    setLoading(false);
    setFile(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section */}
      <div className="flex items-center gap-4 border-l-4 border-blue-600 pl-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white uppercase">Knowledge Ingestion</h2>
          <p className="text-slate-500 font-mono text-xs mt-1 tracking-widest">SECURE_PDF_UPLINK_PROTOCOL_V2</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Upload Area */}
        <div className="lg:col-span-2 space-y-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`relative group cursor-pointer border-2 border-dashed rounded-3xl p-12 transition-all duration-500 flex flex-col items-center justify-center overflow-hidden
              ${file ? "border-blue-500 bg-blue-500/5" : "border-white/10 hover:border-blue-500/50 bg-slate-900/40 hover:bg-slate-900/60"}`}
          >
            {/* Animated Scanning Line */}
            {loading && (
              <motion.div 
                initial={{ top: "-10%" }}
                animate={{ top: "110%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent z-10 shadow-[0_0_15px_#3b82f6]"
              />
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
              accept=".pdf"
            />

            <div className="p-5 rounded-2xl bg-slate-800 border border-white/5 mb-4 group-hover:scale-110 transition-transform">
              {file ? <FileText className="text-blue-400 w-8 h-8" /> : <Upload className="text-slate-500 w-8 h-8" />}
            </div>

            <div className="text-center">
              <p className="text-lg font-medium text-slate-200">
                {file ? file.name : "Select Intelligence Document"}
              </p>
              <p className="text-sm text-slate-500 mt-1">Drag and drop or click to browse (PDF only)</p>
            </div>
          </div>

         <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="w-full relative overflow-hidden bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-900/40"
      >
        <div className="flex items-center justify-center gap-3 relative z-10">
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              <span className="tracking-widest uppercase text-xs font-mono">Processing Vector Maps...</span>
            </>
          ) : (
            <>
              {/* Change this tag to match the import above */}
              <ShieldCheck className="w-5 h-5 text-blue-200" /> 
              <span className="tracking-widest uppercase text-xs font-mono">Inject Knowledge Base</span>
            </>
          )}
        </div>
      </button>
        </div>

        {/* Status & Technical Info Sidecar */}
        <div className="space-y-6">
          <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-6">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">System Requirements</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-xs text-slate-400">
                <div className="w-1 h-1 bg-blue-500 rounded-full" />
                Format: Portable Document (PDF)
              </li>
              <li className="flex items-center gap-3 text-xs text-slate-400">
                <div className="w-1 h-1 bg-blue-500 rounded-full" />
                Max Payload: 25MB
              </li>
              <li className="flex items-center gap-3 text-xs text-slate-400">
                <div className="w-1 h-1 bg-blue-500 rounded-full" />
                OCR: Automated Text Extraction
              </li>
            </ul>
          </div>

          <AnimatePresence>
            {status && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`p-6 rounded-2xl border ${
                  status.type === "success" ? "bg-emerald-500/5 border-emerald-500/20" : "bg-red-500/5 border-red-500/20"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  {status.type === "success" ? (
                    <CheckCircle2 className="text-emerald-500 w-5 h-5" />
                  ) : (
                    <AlertCircle className="text-red-500 w-5 h-5" />
                  )}
                  <span className={`text-sm font-bold uppercase tracking-tight ${
                    status.type === "success" ? "text-emerald-400" : "text-red-400"
                  }`}>
                    {status.message}
                  </span>
                </div>
                {status.details && (
                  <p className="text-[11px] font-mono text-slate-500 leading-relaxed">
                    {status.details}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}