import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import CallDemo from "./CallDemo";
import PhoneCallDemo from "./PhoneCallDemo";
import TrustIndicators from "./TrustIndicators";

interface HeroProps {
  onBookDemo: () => void;
}

const headlineLine1 = ["Superhuman", "team", "of", "AI", "workforce", "for", "autonomous"];
const headlineLine2 = ["healthcare", "operations"];

const subheadLine1 = [
  "OperinLabs", "gives", "healthcare", "organisations", "an", "AI",
  "workforce", "for", "autonomous", "healthcare", "operations,",
  "starting", "with", "an", "agent", "that", "works", "around", "the",
  "clock,", "answering", "calls,",
];
const subheadLine2 = [
  "booking", "appointments,", "sending", "reminders,", "and",
  "following", "up", "in", "Assamese,", "Bengali,", "Hindi,", "and",
  "English,", "turning", "conversations", "into", "decisions,",
  "actions,", "and", "completed", "workflows.",
];

const steps = [
  { label: "Understands", detail: "Multilingual intent" },
  { label: "Acts", detail: "Books & sends reminders" },
  { label: "Confirms", detail: "Logs & escalates when needed" },
];

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const word = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

export default function Hero({ onBookDemo }: HeroProps) {
  const navigate = useNavigate();
  void onBookDemo;

  return (
    <section
      id="top"
      className="scroll-mt-24 bg-mono-bg px-6 pb-20 pt-24 sm:pt-28"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-[90rem] flex-col items-start text-left"
      >
        <motion.h1
          variants={container}
          className="w-full font-editorial font-medium leading-[1.05] tracking-[-0.01em] text-mono-ink text-[36px] sm:text-[46px] md:text-[56px]"
        >
          <span className="flex flex-wrap gap-x-2 gap-y-1 lg:flex-nowrap lg:justify-between">
            {headlineLine1.map((w, i) => (
              <motion.span key={i} variants={word} className="inline-block">
                {w}
              </motion.span>
            ))}
          </span>
          <span className="mt-1 flex flex-wrap justify-center gap-[0.3em]">
            {headlineLine2.map((w, i) => (
              <motion.span key={i} variants={word} className="inline-block">
                {w}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 w-full text-base leading-relaxed text-mono-soft"
        >
          <span className="flex w-full justify-between">
            {subheadLine1.map((w, i) => (
              <span key={i} className="inline-block">
                {w}
              </span>
            ))}
          </span>
          <span className="flex w-full justify-between">
            {subheadLine2.map((w, i) => (
              <span key={i} className="inline-block">
                {w}
              </span>
            ))}
          </span>
        </motion.p>
      </motion.div>

      {/* How it works — live call demo */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <motion.p
          variants={item}
          className="mt-14 text-xs font-semibold uppercase tracking-wide text-mono-soft"
        >
          See it work
        </motion.p>
        <motion.h2
          variants={item}
          className="mt-2 font-editorial text-2xl text-mono-ink sm:text-3xl"
        >
          Your AI Receptionist
        </motion.h2>

        {/* Process steps */}
        <motion.div
          variants={item}
          className="mt-8 flex items-start gap-3 sm:gap-6"
        >
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-start gap-3 sm:gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-mono-ink text-xs font-semibold text-mono-bg">
                  {i + 1}
                </div>
                <p className="mt-2 text-xs font-medium text-mono-ink">
                  {step.label}
                </p>
                <p className="hidden text-[11px] text-mono-soft sm:block">
                  {step.detail}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className="mt-4 h-px w-8 bg-mono-line sm:w-14" />
              )}
            </div>
          ))}
        </motion.div>

        <motion.div variants={item} className="mt-10 w-full">
          <CallDemo />
        </motion.div>

        <motion.p
          variants={item}
          className="mt-10 text-xs font-semibold uppercase tracking-wide text-mono-soft"
        >
          And it doesn't stop at chat — it's on the phone too
        </motion.p>

        <motion.div variants={item} className="mt-6 w-full">
          <PhoneCallDemo />
        </motion.div>

        <motion.div variants={item} className="mt-8">
          <motion.button
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/talk-to-receptionist")}
            className="inline-flex items-center gap-1.5 rounded-full bg-mono-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black"
          >
            Talk to your Receptionist
            <BsArrowRight className="text-xs" aria-hidden="true" />
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        variants={item}
        initial="hidden"
        animate="show"
        className="mx-auto mt-16 max-w-6xl border-t border-mono-line pt-8"
      >
        <div className="flex justify-center">
          <TrustIndicators />
        </div>
      </motion.div>
    </section>
  );
}
