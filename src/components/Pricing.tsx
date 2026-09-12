import { motion } from "framer-motion";
import { BsCheck2 } from "react-icons/bs";

interface PricingProps {
  onBookDemo: () => void;
}

const plans = [
  {
    name: "Essential",
    price: "₹999",
    unit: "/ Month",
    features: [
      "Call answering, 24×7",
      "Appointment booking",
      "Appointment confirmation",
      "Assamese, Bengali, Hindi & English",
      "Limited credits for use",
    ],
    bg: "bg-bg",
    border: "border border-line",
    ctaLabel: "Start for free",
  },
  {
    name: "Growth",
    price: "₹2999",
    unit: "/ Month",
    features: [
      "Everything in Essential",
      "Automated reminders",
      "Automated follow-ups",
      "No-show recovery",
      "Limited credits for use",
    ],
    bg: "bg-accent-soft",
    border: "",
    ctaLabel: "Start for free",
  },
  {
    name: "Pay as you go",
    price: "Flexible",
    unit: "",
    features: [
      "Pay only for what you use",
      "Add workflow and expand as you grow",
      "No upfront commitments or long-term contract",
      "Scale seamlessly across locations and workflows",
    ],
    bg: "bg-[#B9CEFF]",
    border: "",
    ctaLabel: "Start for free",
  },
  {
    name: "Enterprise plan",
    price: "Custom",
    unit: "",
    features: [
      "Everything in Essential, Growth, and Pay as you go",
      "Tailored pricing for teams operating at scale.",
      "Dedicated infrastructure with enterprise-grade SLAs.",
      "Dedicated forward deployed engineers and priority support.",
    ],
    bg: "bg-[#8FB2FF]",
    border: "",
    ctaLabel: "Contact Sales",
  },
];

export default function Pricing({ onBookDemo }: PricingProps) {
  return (
    <section id="pricing" className="scroll-mt-24 bg-bg px-6 py-24">
      <div className="mx-auto max-w-[90rem]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-xl"
        >
          <h2 className="font-editorial font-medium text-ink text-[32px] sm:text-[40px] leading-[1.1] tracking-[-0.01em]">
            Pricing that scales with you
          </h2>
          <p className="mt-4 max-w-[50ch] text-base leading-relaxed text-ink-soft">
            Every plan includes multilingual call answering. Higher tiers add
            retention and rollout support as your clinic grows.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-[1fr_1.12fr_1.28fr_1.48fr] lg:items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
              className={`flex flex-col rounded-3xl p-8 text-ink ${plan.bg} ${plan.border}`}
            >
              <h3 className="font-editorial text-2xl text-ink">{plan.name}</h3>
              <p className="mt-2 text-base font-medium text-ink">
                {plan.price}{" "}
                {plan.unit && (
                  <span className="font-normal text-ink-soft">{plan.unit}</span>
                )}
              </p>

              <div className="mt-6 border-t border-ink/10" />

              <ul className="mt-6 flex flex-1 flex-col gap-3 text-sm leading-relaxed text-ink/80">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <BsCheck2 className="mt-0.5 shrink-0 text-ink/60" aria-hidden="true" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onBookDemo}
                className="mt-8 w-full rounded-xl border border-ink/20 px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-white/40"
              >
                {plan.ctaLabel}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
