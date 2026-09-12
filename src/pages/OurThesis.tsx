import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import { thesisTopics as topics } from "../lib/thesisTopics";

interface OurThesisProps {
  onBookDemo: () => void;
}

export default function OurThesis({ onBookDemo }: OurThesisProps) {
  const [searchParams] = useSearchParams();
  const initialIndex = Number(searchParams.get("topic"));
  const [active, setActive] = useState(
    Number.isInteger(initialIndex) && topics[initialIndex] ? initialIndex : 0
  );
  const topic = topics[active];

  return (
    <section className="bg-bg px-6 pb-24 pt-36 sm:pt-40">
      <div className="mx-auto max-w-[90rem]">
        <p className="text-sm font-medium text-accent">Our Thesis</p>
        <h1 className="mt-3 max-w-2xl font-editorial font-medium text-ink text-[36px] sm:text-[48px] leading-[1.1] tracking-[-0.01em]">
          OperinLabs: Our Thesis
        </h1>
        <p className="mt-6 max-w-none text-lg leading-relaxed text-ink-soft">
          We believe the next generation of healthcare software won't just
          help teams do their work — it will do the work with them. AI
          should be able to understand what needs to be done, take action,
          and complete everyday healthcare operations.
        </p>

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left: topic list */}
          <div className="flex flex-col gap-1 lg:sticky lg:top-28 lg:self-start">
            {topics.map((t, i) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.listLabel}
                  onClick={() => setActive(i)}
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

          {/* Right: full article for the active topic */}
          <AnimatePresence mode="wait">
            <motion.div
              key={topic.heading}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="rounded-3xl border border-line bg-white p-8 sm:p-12"
            >
              <span className="inline-block w-fit rounded-xl border border-line bg-bg px-4 py-2 text-sm text-ink-soft">
                {topic.cardLabel}
              </span>
              <h2 className="mt-8 font-editorial text-3xl text-ink sm:text-4xl">
                {topic.heading}
              </h2>
              <p className="mt-6 max-w-[64ch] text-[17px] leading-relaxed text-ink-soft">
                {topic.preview} {topic.rest}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-20 flex flex-col items-start gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[46ch] text-ink-soft">
            See this thesis in action — talk to OperinLabs directly.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={onBookDemo}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent"
            >
              Book a Demo
              <BsArrowRight className="text-xs" aria-hidden="true" />
            </button>
            <Link
              to="/"
              className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
