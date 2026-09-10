import { motion } from "framer-motion";
import CTAButton from "./CTAButton";
import HeroVideo from "./HeroVideo";
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
    <main id="top" className="pt-36 sm:pt-40 px-6 pb-20">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-3xl mx-auto flex flex-col items-center text-center"
      >
        {/* Hero badge */}
        <motion.span
          variants={item}
          className="inline-flex items-center rounded-full border border-line bg-gray-200/50 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-ink-soft"
        >
          AI voice agents for India's clinics and hospitals
        </motion.span>

        {/* Hero heading */}
        <motion.h1
          variants={item}
          className="mt-8 font-editorial font-medium text-ink leading-[1.05] tracking-[-0.04em] text-[44px] sm:text-[56px] md:text-[72px] lg:text-[96px]"
        >
          Every call answered.
          <br />
          Meet OperinLabs.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="mt-8 max-w-[700px] text-lg md:text-xl text-ink-soft leading-relaxed"
        >
          OperinLabs answers every clinic and hospital call — in Assamese,
          Bengali, and Hindi — booking appointments, sending reminders, and
          recovering patients your front desk was missing.
        </motion.p>

        {/* Primary CTA */}
        <motion.div variants={item} className="mt-8">
          <CTAButton onClick={onBookDemo} ariaLabel="Book a demo of Aura">
            Book a Demo
          </CTAButton>
        </motion.div>

        {/* Hero video */}
        <motion.div variants={item} className="w-full">
          <HeroVideo />
        </motion.div>

        {/* Trust indicators */}
        <motion.div variants={item} className="mt-10">
          <TrustIndicators />
        </motion.div>
      </motion.div>
    </main>
  );
}
