import { motion } from "framer-motion";
import { BsCheck2 } from "react-icons/bs";

interface PricingProps {
  onBookDemo: () => void;
}

const plans = [
  {
    name: "Clinic",
    price: "₹7,999",
    unit: "/month, per line",
    description: "For a single-doctor practice or small clinic front desk.",
    features: [
      "1 phone line, 24/7 coverage",
      "Assamese, Bengali, Hindi, English",
      "Appointment booking & reminders",
      "Missed-call callback",
    ],
    highlighted: false,
  },
  {
    name: "Hospital",
    price: "₹24,999",
    unit: "/month, up to 5 lines",
    description: "For multi-department hospitals with higher call volume.",
    features: [
      "Everything in Clinic",
      "Department-based call routing",
      "Priority queue for urgent callers",
      "Weekly call & booking reports",
    ],
    highlighted: true,
  },
  {
    name: "Network",
    price: "Custom",
    unit: "pricing",
    description: "For hospital groups running several locations on one system.",
    features: [
      "Everything in Hospital",
      "Unlimited lines across locations",
      "Dedicated onboarding & support",
      "Custom reporting & integrations",
    ],
    highlighted: false,
  },
];

export default function Pricing({ onBookDemo }: PricingProps) {
  return (
    <section id="pricing" className="scroll-mt-24 bg-night px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-xl"
        >
          <h2 className="font-editorial font-medium text-bg text-[32px] sm:text-[40px] leading-[1.1] tracking-[-0.01em]">
            Priced per line, not per excuse.
          </h2>
          <p className="mt-4 max-w-[50ch] text-base leading-relaxed text-night-soft">
            Every plan includes full multilingual coverage. Larger plans add
            routing and reporting as your call volume grows.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
              className={
                plan.highlighted
                  ? "flex flex-col rounded-3xl border border-accent/40 bg-white/[0.06] p-8 lg:-my-3 lg:py-11 lg:shadow-2xl lg:shadow-black/20"
                  : "flex flex-col rounded-3xl border border-line-night p-8"
              }
            >
              {plan.highlighted && (
                <span className="mb-4 inline-flex w-fit items-center rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
                  Most hospitals choose this
                </span>
              )}
              <h3 className="font-editorial text-2xl text-bg">{plan.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-night-soft">
                {plan.description}
              </p>
              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="font-editorial text-3xl text-bg">
                  {plan.price}
                </span>
                <span className="text-sm text-night-soft">{plan.unit}</span>
              </div>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-night-soft">
                    <BsCheck2 className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onBookDemo}
                className={
                  plan.highlighted
                    ? "mt-8 w-full rounded-xl bg-accent px-5 py-3 text-sm font-medium text-night transition-colors hover:bg-accent/90"
                    : "mt-8 w-full rounded-xl border border-line-night px-5 py-3 text-sm font-medium text-bg transition-colors hover:bg-white/5"
                }
              >
                {plan.price === "Custom" ? "Talk to us" : "Book a Demo"}
              </button>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-night-soft">
          Sample pricing shown for planning purposes — confirm final numbers before publishing.
        </p>
      </div>
    </section>
  );
}
