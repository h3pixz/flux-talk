import { motion } from "framer-motion";
import { generateRoomKey } from "../ultils/room";
import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const newRoomKey = generateRoomKey();
    navigate(`/chatroom/${newRoomKey}`);
  };

  return (
    <motion.header
      className="fixed top-0 right-0 left-0 z-50 bg-[#121212]/80 border-b backdrop-blur-sm border-[#262626]"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
        <span className="font-semibold tracking-tight text-xl">Flux Talk</span>

        <nav className="flex items-center gap-8">
          <a className="text-sm text-[#a3a3a3] hover:text-white transition-colors cursor-pointer">
            Features
          </a>
          <a className="text-sm text-[#a3a3a3] hover:text-white transition-colors cursor-pointer">
            Pricing
          </a>
          <a className="text-sm text-[#a3a3a3] hover:text-white transition-colors cursor-pointer">
            About
          </a>
        </nav>

        <button
          className="px-4 py-2 bg-transparent border border-[#10b981] text-[#10b981] rounded-lg hover:bg-[#10b981]/10 transition-colors cursor-pointer"
          onClick={handleCreateRoom}
        >
          Launch App
        </button>
      </div>
    </motion.header>
  );
}
