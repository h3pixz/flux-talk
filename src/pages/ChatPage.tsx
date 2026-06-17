import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaRegCopy } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

interface Message {
  id: string;
  nickname: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputText, setInputText] = useState("");

  const { roomKey } = useParams();

  const handleCopyKey = () => {
    if (!roomKey) return;

    navigator.clipboard.writeText(roomKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLeave = () => {
    navigate("/");
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const now = new Date();
      const timestamp = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

      setMessages([
        ...messages,
        {
          id: Date.now().toString(),
          nickname: "you",
          text: inputText,
          timestamp,
          isOwn: true,
        },
      ]);
      setInputText("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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
            <span className="text-sm text-[#10b981]">{roomKey}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-transparent border border-[#262626] rounded-lg hover:border-[#10b981] transition-colors cursor-pointer"
            onClick={handleCopyKey}
          >
            <FaRegCopy />
            <span className="text-sm hidden md:inline">
              {copied ? "Copied!" : "Copy Key"}
            </span>
          </button>
          <button
            className="px-4 py-2 bg-transparent border border-[#262626] text-[#a3a3a3] rounded-lg hover:border-red-500 hover:text-red-500 transition-colors cursor-pointer"
            onClick={handleLeave}
          >
            Leave Room
          </button>
        </div>
      </motion.header>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className="flex gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-[#525252] shrink-0 ">
                [{message.timestamp}]
              </span>
              <span
                className={`shrink-0 ${message.isOwn ? "text-[#10b981]" : "text-[#06b6d4]"}`}
              >
                {message.nickname}:
              </span>
              <span className="text-[#e5e5e5]">{message.text}</span>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <motion.div
        className="px-6 py-4 border-t border-[#262626] bg-[#121212]"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type message..."
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#262626] rounded-lg text-white placeholder:text-[#525252] focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all pr-12"
              />
              <button
                onClick={handleSendMessage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#10b981] rounded-lg hover:bg-[#0ea572] transition-colors"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-2 text-xs text-[#525252] text-center">
            🔒 Messages are end-to-end encrypted • No logs • No history
          </div>
        </div>
      </motion.div>
    </div>
  );
}
