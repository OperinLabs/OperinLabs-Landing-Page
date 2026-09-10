import { motion } from "framer-motion";
import CallDemo from "./CallDemo";
import TrustIndicators from "./TrustIndicators";

interface HeroProps {
  onBookDemo: () => void;
}

const headline = ["Every", "call", "answered.", "In", "their", "language."];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09 },
  },
};

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
        className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-12"
      >
        {/* Left: copy */}
        <div className="flex flex-col items-start text-left">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-mono-line bg-white px-4 py-1.5 text-xs font-medium text-mono-soft"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mono-ink opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mono-ink" />
            </span>
            Answering calls right now, across Assam
          </motion.span>

          <motion.h1
            variants={container}
            className="mt-8 max-w-xl font-editorial font-medium leading-[1.05] tracking-[-0.02em] text-mono-ink text-[40px] sm:text-[52px] md:text-[64px]"
          >
            {headline.map((w, i) => (
              <motion.span
                key={i}
                variants={word}
                className="inline-block mr-[0.28em]"
              >
                {w}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-[52ch] text-lg leading-relaxed text-mono-soft"
          >
            OperinLabs picks up every clinic and hospital call in Assamese,
            Bengali, and Hindi — booking appointments, sending reminders, and
            calling back the patients your front desk missed.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <motion.button
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBookDemo}
              className="inline-flex items-center justify-center rounded-xl bg-mono-ink px-8 py-4 text-white font-medium font-inter shadow-lg shadow-black/10 transition-colors duration-200 hover:bg-black"
            >
              Book a Demo
            </motion.button>
            <a
              href="#product"
              className="text-sm font-medium text-mono-soft underline decoration-mono-line decoration-1 underline-offset-4 transition-colors hover:text-mono-ink"
            >
              See how it works
            </a>
          </motion.div>
        </div>

        {/* Right: live booking demo */}
        <motion.div variants={item}>
          <CallDemo />
        </motion.div>
      </motion.div>

      <motion.div
        variants={item}
        initial="hidden"
        animate="show"
        className="mx-auto mt-16 max-w-6xl border-t border-mono-line pt-8"
      >
        <TrustIndicators />
      </motion.div>
    </section>
  );
}
