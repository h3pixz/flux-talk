import { motion } from "framer-motion";
import data from "../locales/ru.json";
import { useNavigate } from "react-router";
import { generateRoomKey } from "../utils/room";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Hero() {
  const navigate = useNavigate();
  const [roomInput, setRoomInput] = useState("");
  const [username, setUsername] = useState("");

  const getFinalUsername = () => {
    if (username.trim()) {
      return username.trim();
    }

    const randomNumber = Math.floor(100 + Math.random() * 900);
    return `FLUX-${randomNumber}`;
  };

  const handleCreateRoom = () => {
    const finalName = getFinalUsername();
    const newRoomKey = generateRoomKey();
    navigate(`/chatRoom/${newRoomKey}`, { state: { username: finalName } });
  };

  const handleJoinRoom = () => {
    if (roomInput.trim()) {
      const finalName = getFinalUsername();

      const formattedKey = roomInput.trim().toUpperCase();
      navigate(`/chatRoom/${formattedKey}`, {
        state: { username: finalName },
      });
    } else {
      toast.error("Enter a room key!");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (roomInput.trim()) {
        handleJoinRoom();
      } else {
        handleCreateRoom();
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <ToastContainer
        toastClassName={() =>
          "relative flex p-4 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-slate-900 text-slate-100 shadow-lg mb-4"
        }
        autoClose={1500}
      />
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
          <div className="relative group w-full max-w-xs mx-auto md:max-w-none md:mx-0">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your nickname..."
              className="w-full border border-[#262626] px-6 py-4 rounded-xl bg-[#1a1a1a] text-white placeholder:text-[#525252] focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all"
            ></input>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-[#10b981] px-4 py-2 rounded-lg hover:bg-[#0ea572] transition-colors cursor-pointer"
              onClick={handleCreateRoom}
            >
              Create
            </button>
          </div>

          <div className="relative group w-full max-w-xs mx-auto md:max-w-none md:mx-0">
            <input
              placeholder="Enter Room Key"
              className="w-full border border-[#262626] px-6 py-4 rounded-xl bg-[#1a1a1a] text-white placeholder:text-[#525252] focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all"
              value={roomInput}
              onChange={(e) => setRoomInput(e.target.value)}
              onKeyDown={handleKeyDown}
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
