import { motion } from "framer-motion";
import data from "../locales/ru.json";
import { useNavigate } from "react-router";
import { generateRoomKey } from "../ultils/room";
import { useState } from "react";

export default function Hero() {
  const navigate = useNavigate();
  const [roomInput, setRoomInput] = useState("");

  const handleCreateRoom = () => {
    const newRoomKey = generateRoomKey();
    navigate(`/chatRoom/${newRoomKey}`);
  };

  const handleJoinRoom = () => {
    if (roomInput.trim()) {
      const formattedKey = roomInput.trim().toUpperCase();
      navigate(`/chatroom/${formattedKey}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleJoinRoom();
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {data.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-[#a3a3a3] max-w-2xl mx-auto">
            {data.hero.description}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 max-w-3xl gap-4 mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative group">
            <input
              placeholder="Create New Room"
              className="w-full border border-[#262626] px-6 py-4 rounded-xl bg-[#1a1a1a] text-white placeholder:text-[#525252] focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all"
            ></input>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-[#10b981] px-4 py-2 rounded-lg hover:bg-[#0ea572] transition-colors cursor-pointer"
              onClick={handleCreateRoom}
            >
              Create
            </button>
          </div>

          <div className="relative group">
            <input
              placeholder="Enter Room Key"
              className="w-full border border-[#262626] px-6 py-4 rounded-xl bg-[#1a1a1a] text-white placeholder:text-[#525252] focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all"
              value={roomInput}
              onChange={(e) => setRoomInput(e.target.value)}
              onKeyDown={handleKeyPress}
            ></input>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-[#10b981] px-4 py-2 rounded-lg hover:bg-[#0ea572] transition-colors cursor-pointer"
              onClick={handleJoinRoom}
            >
              Join
            </button>
          </div>
        </motion.div>

        <motion.div
          className="text-center text-sm mt-6 text-[#525252]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span className="inline-block bg-[#1a1a1a] px-3 py-1 border border-[#262626] rounded-lg">
            {data.hero.badge}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
