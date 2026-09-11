import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { IconType } from "react-icons";
import { BsGrid3X3GapFill, BsGlobe2, BsCpu, BsArrowRight } from "react-icons/bs";

interface Topic {
  icon: IconType;
  listLabel: string;
  cardLabel: string;
  heading: string;
  preview: string;
  rest: string;
}

const topics: Topic[] = [
  {
    icon: BsGrid3X3GapFill,
    listLabel: "Every call has intent",
    cardLabel: "Understanding Beats Answering",
    heading: "Every Call Has Intent",
    preview:
      "Most clinics treat every incoming call the same way — pick up, write it down, hope someone follows up. But a call asking to reschedule carries different urgency than one reporting a missed dose.",
    rest: "We think an AI receptionist earns its place only if it can tell these apart in the caller's own language, and act differently depending on what it hears — booking one caller in, escalating another, and quietly logging a third for a callback. That's the bar we build to, call after call.",
  },
  {
    icon: BsGlobe2,
    listLabel: "Multilingual is non-negotiable",
    cardLabel: "Language Is Infrastructure",
    heading: "Multilingual Is Non-Negotiable",
    preview:
      "Voice AI trained primarily on English text handles Assamese, Bengali, and Hindi callers as an afterthought — a translation layer bolted on top, not a first-class capability.",
    rest: "For the hospitals we work with, that ordering is backwards: the overwhelming majority of patients call in their own language, often switching mid-sentence between two. A receptionist that can't follow that isn't one a clinic can actually deploy at its front desk.",
  },
  {
    icon: BsCpu,
    listLabel: "Small models, real hospitals",
    cardLabel: "Built To Run, Not Just Demo",
    heading: "Small Models, Real Hospitals",
    preview:
      "It's easy to build an impressive voice demo. It's much harder to build one that keeps working at 8am on a Monday, on a landline in Silchar, with call quality that would break most cloud pipelines.",
    rest: "We optimize for latency and reliability on real phone infrastructure first, and impressiveness second — because a hospital front desk doesn't get to tell a patient to call back when the network is being difficult.",
  },
];

export default function Thesis() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const topic = topics[active];

  function selectTopic(i: number) {
    setActive(i);
    setExpanded(false);
  }

  return (
    <section id="our-thesis" className="scroll-mt-24 bg-bg px-6 py-24">
      <div className="mx-auto max-w-[90rem] rounded-[40px] bg-white px-8 py-16 sm:px-14 sm:py-20">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left: intro + topic list */}
          <div>
            <h2 className="font-editorial font-medium text-ink text-[32px] sm:text-[40px] leading-[1.1] tracking-[-0.01em]">
              OperinLabs: Our Thesis
            </h2>
            <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-ink-soft">
              We believe healthcare's front desk should never be the reason a
              patient goes unseen. Not one generic assistant that does
              everything poorly, but one built specifically for how clinics
              in Assam actually receive calls.
            </p>

            <button className="mt-8 inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent-soft">
              Read Research
              <BsArrowRight className="text-xs" aria-hidden="true" />
            </button>

            <div className="mt-14 flex flex-col gap-1">
              {topics.map((t, i) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.listLabel}
                    onClick={() => selectTopic(i)}
                    className={
                      active === i
                        ? "flex items-center gap-3 rounded-xl bg-accent-soft px-4 py-3 text-left text-sm font-medium text-ink transition-colors"
                        : "flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-ink-soft transition-colors hover:bg-accent-soft/50"
                    }
                  >
                    <Icon
                      className={active === i ? "text-accent" : "text-ink-soft/60"}
                      aria-hidden="true"
                    />
                    {t.listLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: nested card with rotated caption + fading/expandable paragraph */}
          <div className="relative rounded-3xl border border-line bg-bg/60 p-8 sm:p-10">
            <motion.div
              key={topic.cardLabel}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="-rotate-2 rounded-xl border border-line bg-white px-5 py-2.5 text-sm text-ink-soft shadow-sm w-fit"
            >
              {topic.cardLabel}
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={topic.heading}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="mt-8"
              >
                <h3 className="font-editorial text-2xl text-ink">{topic.heading}</h3>

                <div className="relative mt-4">
                  <p className="text-[15px] leading-relaxed text-ink-soft">
                    {topic.preview}
                    {expanded && " " + topic.rest}
                  </p>
                  {!expanded && (
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-white"
                      aria-hidden="true"
                    />
                  )}
                </div>

                <button
                  onClick={() => setExpanded((v) => !v)}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent"
                >
                  {expanded ? "Show less" : "Read more"}
                  <BsArrowRight
                    className={`text-xs transition-transform ${expanded ? "rotate-90" : ""}`}
                    aria-hidden="true"
                  />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
