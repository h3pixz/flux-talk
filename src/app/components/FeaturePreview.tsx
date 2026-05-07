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
            <div className="flex-1 text-center text-xs text-[#525252]">
              room: secure-chat-x7k9p2
            </div>
          </div>

          <div className="min-h-[320px] p-6 space-y-4">
            <div className="flex gap-3">
              <span className="text-[#10b981] shrink-0">alice@flux:</span>
              <span className="text-[#a3a3a3]">Hey, are you there?</span>
            </div>

            <div className="flex gap-3">
              <span className="text-[#06b6d4] shrink-0">bob@flux:</span>
              <span className="text-[#a3a3a3]">
                Yes! This is incredibly secure.
              </span>
            </div>

            <div className="flex gap-3">
              <span className="text-[#10b981] shrink-0">alice@flux:</span>
              <span className="text-[#a3a3a3]">
                No traces, just us and the key.
              </span>
            </div>

            <div className="flex gap-3">
              <span className="text-[#06b6d4] shrink-0">bob@flux:</span>
              <span className="text-[#a3a3a3]">
                Perfect. Let's discuss the project.
              </span>
            </div>

            <div className="border-t border-[#262626] mt-6 pt-4">
              <div className="flex gap-2">
                <span className="text-[#525252]">›</span>
                <span className="text-[#525252] animate-pulse">_</span>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.p
          className="mt-8 text-center text-[#a3a3a3]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Terminal-inspired interface. Message instantly. Leave no trace.
        </motion.p>
      </div>
    </section>
  );
}
