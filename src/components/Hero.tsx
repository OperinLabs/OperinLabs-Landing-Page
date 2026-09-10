import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import VoiceOrb from "./VoiceOrb";
import TrustIndicators from "./TrustIndicators";

interface HeroProps {
  onBookDemo: () => void;
}

const headline = ["Superhuman", "team", "of", "AI", "workforce", "for", "autonomous", "healthcare", "operations"];

const tabs = ["Answering", "Booking", "Rescheduling", "Reminders", "Follow-ups", "Refill"];

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
  return (
    <section
      id="top"
      className="scroll-mt-24 bg-mono-bg px-6 pb-20 pt-36 sm:pt-40"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-[90rem] flex-col items-start text-left"
      >
        <motion.h1
          variants={container}
          className="font-editorial font-medium leading-[1.05] tracking-[-0.02em] text-mono-ink text-[40px] sm:text-[52px] md:text-[64px]"
        >
          {headline.map((w, i) => (
            <motion.span key={i} variants={word} className="inline-block mr-[0.28em]">
              {w}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 max-w-[46ch] text-lg leading-relaxed text-mono-soft"
        >
          OperinLabs picks up every clinic and hospital call in Assamese,
          Bengali, and Hindi — booking appointments, sending reminders, and
          recovering missed patients.
        </motion.p>

        <motion.div variants={item} className="mt-8 flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBookDemo}
            className="inline-flex items-center gap-1.5 rounded-full bg-mono-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black"
          >
            Book a Demo
            <BsArrowRight className="text-xs" aria-hidden="true" />
          </motion.button>
          <a
            href="#pricing"
            className="rounded-full border border-mono-line px-6 py-3 text-sm font-medium text-mono-ink transition-colors hover:bg-white"
          >
            See pricing
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        {/* Category tabs */}
        <motion.div
          variants={item}
          className="mt-14 inline-flex items-center gap-1 rounded-full border border-mono-line bg-white p-1"
        >
          {tabs.map((tab, i) => (
            <span
              key={tab}
              className={
                i === 0
                  ? "rounded-full bg-mono-ink px-4 py-1.5 text-xs font-medium text-white"
                  : "rounded-full px-4 py-1.5 text-xs font-medium text-mono-soft"
              }
            >
              {tab}
            </span>
          ))}
        </motion.div>

        {/* Voice orb centerpiece */}
        <motion.div variants={item} className="mt-10">
          <VoiceOrb onStart={onBookDemo} />
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
