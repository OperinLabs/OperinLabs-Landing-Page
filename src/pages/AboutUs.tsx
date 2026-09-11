import { motion } from "framer-motion";

interface AboutUsProps {
  onBookDemo: () => void;
}

const values = [
  {
    heading: "Built for Assam first",
    body: "We started with the clinics and hospitals nearest to us, in languages the big voice-AI platforms don't prioritize.",
  },
  {
    heading: "No patient left on hold",
    body: "Every product decision traces back to one question: does this stop a call from going unanswered?",
  },
  {
    heading: "Small team, real accountability",
    body: "We're piloting directly with hospital staff, not shipping into a black box — feedback reaches us the same week.",
  },
];

export default function AboutUs({ onBookDemo }: AboutUsProps) {
  return (
    <section className="bg-bg px-6 pb-24 pt-36 sm:pt-40">
      <div className="mx-auto max-w-[90rem]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="text-sm font-medium text-accent">About us</p>
          <h1 className="mt-3 font-editorial font-medium text-ink text-[36px] sm:text-[48px] leading-[1.1] tracking-[-0.01em]">
            We're building the front desk hospitals in Assam couldn't
            afford to hire.
          </h1>
          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-ink-soft">
            OperinLabs is a small team building an AI voice agent that
            answers clinic and hospital calls in Assamese, Bengali, and
            Hindi — so no patient gets a busy signal, and no front desk
            gets buried in calls it can't keep up with.
          </p>
          <button
            onClick={onBookDemo}
            className="mt-8 inline-flex items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent"
          >
            Book a Demo
          </button>
        </motion.div>

        <div className="mt-20 grid gap-6 border-t border-line pt-14 sm:grid-cols-3">
          {values.map(({ heading, body }, i) => (
            <motion.div
              key={heading}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
            >
              <h3 className="font-editorial text-xl text-ink">{heading}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                {body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
