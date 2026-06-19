import { motion } from "framer-motion";
import chatData from "../locales/chatMessages.json";

export default function FeaturePreview() {
  return (
    <section className="py-24 px-6" id="features">
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
              {chatData.roomId}
            </div>
          </div>

          <div className="min-h-[220px] p-6 space-y-4">
            {chatData.messages.map((msg, id) => (
              <div key={id} className="flex gap-3">
                <span className={`text-[${msg.color}]`}>{msg.user}</span>
                <span>{msg.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.p
          className="mt-8 text-center text-[#a3a3a3]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {chatData.footerText}
        </motion.p>
      </div>
    </section>
  );
}
