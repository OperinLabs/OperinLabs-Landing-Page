import { motion } from "framer-motion";
import CTAButton from "./CTAButton";
import CallDemo from "./CallDemo";
import TrustIndicators from "./TrustIndicators";

interface HeroProps {
  onBookDemo: () => void;
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

export default function Hero({ onBookDemo }: HeroProps) {
  return (
    <section
      id="top"
      className="scroll-mt-24 bg-night px-6 pb-20 pt-36 sm:pt-40"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-12"
      >
        {/* Left: copy */}
        <div className="flex flex-col items-start text-left">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-line-night bg-white/5 px-4 py-1.5 text-xs font-medium text-night-soft"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Answering calls right now, across Assam
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-8 max-w-xl font-editorial font-medium leading-[1.05] tracking-[-0.02em] text-bg text-[40px] sm:text-[52px] md:text-[64px]"
          >
            Every call answered.
            <br />
            In their language.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-[52ch] text-lg leading-relaxed text-night-soft"
          >
            OperinLabs picks up every clinic and hospital call in Assamese,
            Bengali, and Hindi — booking appointments, sending reminders, and
            calling back the patients your front desk missed.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <CTAButton onClick={onBookDemo} ariaLabel="Book a demo of OperinLabs">
              Book a Demo
            </CTAButton>
            <a
              href="#product"
              className="text-sm font-medium text-night-soft underline decoration-line-night decoration-1 underline-offset-4 transition-colors hover:text-bg"
            >
              See how it works
            </a>
          </motion.div>
        </div>

        {/* Right: live call mockup */}
        <motion.div variants={item}>
          <CallDemo />
        </motion.div>
      </motion.div>

      <motion.div
        variants={item}
        initial="hidden"
        animate="show"
        className="mx-auto mt-16 max-w-6xl border-t border-line-night pt-8"
      >
        <TrustIndicators />
      </motion.div>
    </section>
  );
}
