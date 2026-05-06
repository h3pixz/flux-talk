import { motion } from "framer-motion";

export default function FeaturePreview() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="bg-[#1a1a1a] border border-[#262626] rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="bg-[#0d0d0d] px-4 py-3 flex items-center gap-2 border-b border-[#262626]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <div className="flex-1 text-center text-xs text-[#525252]">room: secure-chat-x7k9p2</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
