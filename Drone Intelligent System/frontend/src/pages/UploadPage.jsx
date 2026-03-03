import { useState } from "react";
import { motion } from "framer-motion";

export default function UploadPage() {

  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/api/upload/", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      setStatus(`✅ Upload successful. Chunks created: ${data.chunks_created}`);
    } catch (error) {
      setStatus("❌ Upload failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl space-y-8">

      <h2 className="text-3xl font-semibold">Upload Knowledge Document(Only PDF)</h2>

      <div className="bg-slate-800/70 backdrop-blur-lg border border-slate-700 p-8 rounded-2xl shadow-lg">

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-6 block w-full text-sm"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Processing..." : "Upload & Rebuild Vector DB"}
        </button>

        {status && (
            <motion.p
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-6 text-green-400"
            >
                {status}
            </motion.p>
            )}

      </div>

    </div>
  );
}