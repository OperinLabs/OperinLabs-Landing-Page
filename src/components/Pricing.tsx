import { motion } from "framer-motion";

interface PricingProps {
  onBookDemo: () => void;
}

const plans = [
  {
    name: "Essential",
    price: "₹999–2,000",
    unit: "/ month",
    features: [
      "Call answering, 24×7",
      "Appointment booking",
      "Appointment confirmation",
      "Assamese, Bengali & Hindi",
    ],
    tone: "solid",
  },
  {
    name: "Growth",
    price: "₹3,000–4,000+",
    unit: "/ month",
    features: [
      "Everything in Essential",
      "Appointment reminders",
      "Automated follow-ups",
      "No-show recovery",
    ],
    tone: "tint-1",
  },
  {
    name: "Retention",
    price: "₹6,000–8,000+",
    unit: "/ month",
    features: [
      "Everything in Growth",
      "Medication refill automation",
      "Vitals & check-in tracking",
      "Continuous engagement",
    ],
    tone: "tint-2",
  },
  {
    name: "Enterprise",
    price: "Custom ₹15K–50K+",
    unit: "/ month",
    features: [
      "Everything in Retention",
      "Multi-branch hospital chains",
      "Custom rollout & integrations",
      "Dedicated support & API",
    ],
    tone: "tint-3",
  },
];

const toneStyles: Record<string, { card: string; heading: string; price: string; divider: string; body: string; button: string }> = {
  solid: {
    card: "bg-accent",
    heading: "text-bg",
    price: "text-bg",
    divider: "border-white/25",
    body: "text-bg/85",
    button: "border-white/40 text-bg hover:bg-white/10",
  },
  "tint-1": {
    card: "bg-[#7FA8FF]",
    heading: "text-ink",
    price: "text-ink",
    divider: "border-ink/15",
    body: "text-ink/75",
    button: "border-ink/25 text-ink hover:bg-white/30",
  },
  "tint-2": {
    card: "bg-[#C2D6FF]",
    heading: "text-ink",
    price: "text-ink",
    divider: "border-ink/12",
    body: "text-ink/70",
    button: "border-ink/20 text-ink hover:bg-white/40",
  },
  "tint-3": {
    card: "bg-accent-soft",
    heading: "text-ink",
    price: "text-ink",
    divider: "border-ink/10",
    body: "text-ink/70",
    button: "border-ink/20 text-ink hover:bg-white/50",
  },
};

export default function Pricing({ onBookDemo }: PricingProps) {
  return (
    <section id="pricing" className="scroll-mt-24 bg-bg px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-xl"
        >
          <h2 className="font-editorial font-medium text-ink text-[32px] sm:text-[40px] leading-[1.1] tracking-[-0.01em]">
            Priced per line, not per excuse.
          </h2>
          <p className="mt-4 max-w-[50ch] text-base leading-relaxed text-ink-soft">
            Every plan includes multilingual call answering. Higher tiers add
            retention and rollout support as your clinic grows.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, i) => {
            const tone = toneStyles[plan.tone];
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
                className={`flex flex-col rounded-3xl p-8 ${tone.card}`}
              >
                <h3 className={`font-editorial text-2xl ${tone.heading}`}>
                  {plan.name}
                </h3>
                <p className={`mt-2 text-base font-medium ${tone.price}`}>
                  {plan.price} <span className="font-normal">{plan.unit}</span>
                </p>

                <div className={`mt-6 border-t ${tone.divider}`} />

                <ul className={`mt-6 flex flex-1 flex-col gap-3 text-sm leading-relaxed ${tone.body}`}>
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <span aria-hidden="true">·</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={onBookDemo}
                  className={`mt-8 w-full rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${tone.button}`}
                >
                  Book a demo
                </button>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-ink-soft">
          Sample pricing shown for planning purposes — confirm final numbers before publishing.
        </p>
      </div>
    </section>
  );
}
