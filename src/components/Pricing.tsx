import { motion } from "framer-motion";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    features: ["1 active room", "Standard encryption", "24h history"],
  },
  {
    name: "Pro",
    price: "$6.99",
    period: "/mo",
    features: ["Unlimited rooms", "Custom keys", "Priority support"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "$14.99",
    period: "/mo",
    features: [
      "Self-destructing messages",
      "Dedicated servers",
      "Advanced analytics",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="py-24 px-6" id="pricing">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-[#a3a3a3]">
            Choose the plan that fits your privacy needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative p-8 bg-[#1a1a1a] border rounded-xl hover:border-[#10b981] transition-all ${
                plan.featured ? "border-[#10b981]" : "border-[#262626]"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#10b981] text-xs rounded-full">
                  Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-[#a3a3a3]">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-[#a3a3a3]"
                  >
                    <svg
                      className="w-5 h-5 text-[#10b981] shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg transition-colors cursor-pointer ${
                  plan.featured
                    ? "bg-[#10b981] text-white hover:bg-[#0ea572]"
                    : "bg-transparent border border-[#262626] text-white hover:border-[#10b981]"
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
