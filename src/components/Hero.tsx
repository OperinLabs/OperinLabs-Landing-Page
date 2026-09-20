import { useState } from "react";
import { motion } from "framer-motion";
import VoiceOrb from "./VoiceOrb";
import TrustIndicators from "./TrustIndicators";

interface HeroProps {
  onBookDemo: () => void;
}

const headlineLine1 = ["Superhuman", "team", "of", "AI", "workforce", "for", "autonomous"];
const headlineLine2 = ["healthcare", "operations"];

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
  const [activeTab, setActiveTab] = useState(0);

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
          className="mt-5 w-full text-lg leading-relaxed text-mono-soft lg:text-justify"
          style={{ textAlignLast: "justify" }}
        >
          OperinLabs gives healthcare organisations an AI workforce for
          autonomous healthcare operations, starting with an agent that
          works around the clock, answering calls, booking appointments,
          sending reminders, and following up in Assamese, Bengali, Hindi,
          and English, turning conversations into decisions, actions, and
          completed workflows.
        </motion.p>
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
          onMouseLeave={() => setActiveTab(0)}
          className="mt-14 inline-flex items-center gap-1 rounded-full border border-mono-line bg-white p-1"
        >
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onMouseEnter={() => setActiveTab(i)}
              className={
                activeTab === i
                  ? "relative rounded-full px-4 py-1.5 text-xs font-medium text-white"
                  : "relative rounded-full px-4 py-1.5 text-xs font-medium text-mono-soft"
              }
            >
              {activeTab === i && (
                <motion.span
                  layoutId="tab-marker"
                  className="absolute inset-0 rounded-full bg-mono-ink"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative">{tab}</span>
            </button>
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
