import { motion } from "framer-motion";

export default function Hero() {
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
            Privacy starts with a key.
          </h1>
          <p className="text-lg md:text-xl text-[#a3a3a3] max-w-2xl mx-auto">
            Create a private room, generate a unique key, and start chatting
            instantly. No registration required.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
