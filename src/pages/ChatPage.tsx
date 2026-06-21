import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaRegCopy } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router";
import { useParams } from "react-router";
import { supabase } from "../utils/supabaseClient";
import { RealtimeChannel } from "@supabase/supabase-js";
import { ToastContainer, toast } from "react-toastify";
import { encryptMessage, decryptMessage } from "../utils/crypto";

interface Message {
  id: string;
  nickname: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

export default function ChatPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);

  const [username] = useState<string>(() => {
    return (
      location.state?.username ??
      `FluxUser-${Math.floor(Math.random() * 900) + 100}`
    );
  });

  const [copied, setCopied] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputText, setInputText] = useState("");

  const { roomKey } = useParams<string>();
  const channelRef = useRef<RealtimeChannel | null>(null);

  const handleCopyKey = () => {
    if (!roomKey) return;

    navigator.clipboard.writeText(roomKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLeave = () => {
    navigate("/");
  };

  const handleSendMessage = async () => {
    if (inputText.trim() && channelRef.current && roomKey) {
      const now = new Date();
      const timestamp = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
      const messageId = crypto.randomUUID();

      try {
        const encryptedText = await encryptMessage(inputText, roomKey);

        const messagePayload = {
          id: messageId,
          nickname: username,
          text: encryptedText,
          timestamp: timestamp,
        };

        await channelRef.current.send({
          type: "broadcast",
          event: "message",
          payload: messagePayload,
        });

        setMessages((prev) => [
          ...prev,
          {
            ...messagePayload,
            text: inputText,
            nickname: "you",
            isOwn: true,
          },
        ]);

        setInputText("");

        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
        }, 0);
      } catch {
        toast.error("Failed to encrypt message");
      }
    }
  };

  useEffect(() => {
    if (!roomKey) return;

    const channel = supabase.channel(`room_${roomKey}`, {
      config: {
        broadcast: { self: false },
      },
    });

    channel
      .on("broadcast", { event: "message" }, async (payload) => {
        try {
          const decryptedText = await decryptMessage(
            payload.payload.text,
            roomKey,
          );

          const incomingMessage: Message = {
            id: payload.payload.id,
            nickname: payload.payload.nickname,
            text: decryptedText,
            timestamp: payload.payload.timestamp,
            isOwn: false,
          };

          setMessages((prev) => [...prev, incomingMessage]);
        } catch {
          const badMessage: Message = {
            id: payload.payload.id,
            nickname: payload.payload.nickname,
            text: "🚨 [Не удалось расшифровать сообщение. Ошибка ключа]",
            timestamp: payload.payload.timestamp,
            isOwn: false,
          };
          setMessages((prev) => [...prev, badMessage]);
        }
      })
      .on("presence", { event: "join" }, ({ newPresences }) => {
        newPresences.forEach((presence: Record<string, unknown>) => {
          if (presence.nickname === username) return;

          const systemMessage: Message = {
            id: `sys-${Date.now()}-${Math.random()}`,
            nickname: "SYSTEM",
            text: `${presence.nickname} присоединился только что`,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            isOwn: false,
          };

          setMessages((prev) => [...prev, systemMessage]);
        });
      })
      .on("presence", { event: "leave" }, ({ leftPresences }) => {
        leftPresences.forEach((presence: Record<string, unknown>) => {
          if (presence.nickname === username) return;

          const systemMessage: Message = {
            id: crypto.randomUUID(),
            nickname: "SYSTEM",
            text: `${presence.nickname} покинул чат`,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            isOwn: false,
          };
          setMessages((prev) => [...prev, systemMessage]);
        });
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          console.log("Успешно подключились к комнате:", roomKey);
          toast.success(`Successful!`);

          await channel.track({ nickname: username });
        }
      });

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomKey, username]);

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
          <ToastContainer
            toastClassName={() =>
              "relative flex p-4 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-slate-900 text-slate-100 shadow-lg mb-4"
            }
            autoClose={1500}
          />
        </div>
      </motion.header>

      <div className="flex-1 overflow-y-auto px-6 py-6 no-scrollbar">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => {
            if (message.nickname === "SYSTEM") {
              return (
                <motion.div
                  key={message.id}
                  className="flex items-center justify-center gap-2 py-1 my-1 text-xs select-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-neutral-600">
                    [{message.timestamp}]
                  </span>
                  <span className="text-amber-500/80 font-medium tracking-wide">
                    • {message.text} •
                  </span>
                </motion.div>
              );
            }

            return (
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
                  className={`shrink-0 ${
                    message.isOwn ? "text-[#10b981]" : "text-[#06b6d4]"
                  }`}
                >
                  {message.nickname}:
                </span>
                <span className="text-[#e5e5e5]">{message.text}</span>
              </motion.div>
            );
          })}
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
