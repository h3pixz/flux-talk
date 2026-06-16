import { motion } from "framer-motion";
import { FaRegCopy } from "react-icons/fa";

export default function ChatPage() {
  return (
    <div
      className="h-screen bg-[#121212] flex flex-col text-white"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      <motion.header
        className="flex items-center justify-between px-6 py-4 border-b border-[#262626] bg-[#121212]"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-4">
          <h1 className="font-semibold tracking-tight text-xl">Flux Talk</h1>

          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] border border-[#262626] rounded-lg">
            <span className="text-sm text-[#a3a3a3]">Room:</span>
            <span className="text-sm text-[#10b981]">FLUX-X7K9P2</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-transparent border border-[#262626] rounded-lg hover:border-[#10b981] transition-colors cursor-pointer">
            <FaRegCopy />
            <span>Copy Key</span>
          </button>
          <button className="px-4 py-2 bg-transparent border border-[#262626] text-[#a3a3a3] rounded-lg hover:border-red-500 hover:text-red-500 transition-colors cursor-pointer">
            Leave Room
          </button>
        </div>
      </motion.header>
    </div>
  );
}
