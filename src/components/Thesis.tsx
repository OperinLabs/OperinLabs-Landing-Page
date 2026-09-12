import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { thesisTopics as topics } from "../lib/thesisTopics";

export default function Thesis() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const topic = topics[active];

  function goToFullThesis() {
    navigate(`/our-thesis?topic=${active}`);
  }

  return (
    <section id="our-thesis" className="scroll-mt-24 bg-bg px-6 py-24">
      <div className="mx-auto max-w-[90rem] rounded-[40px] bg-white px-8 py-16 sm:px-14 sm:py-20">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left: intro + Read more (goes to the full /our-thesis page) + topic list */}
          <div>
            <h2 className="font-editorial font-medium text-ink text-[32px] sm:text-[40px] leading-[1.1] tracking-[-0.01em]">
              OperinLabs: Our Thesis
            </h2>
            <div className="relative mt-4 max-h-[144px] max-w-[46ch] overflow-hidden">
              <p className="text-base leading-relaxed text-ink-soft">
                We believe the next generation of healthcare software won't
                just help teams do their work — it will do the work with
                them. AI should be able to understand what needs to be
                done, take action, and complete everyday healthcare
                operations. We believe healthcare needs more than software
                that
              </p>
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-white"
                aria-hidden="true"
              />
            </div>

            <button
              onClick={goToFullThesis}
              className="mt-8 inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent-soft"
            >
              Read more
              <BsArrowRight className="text-xs" aria-hidden="true" />
            </button>

            <div className="mt-14 flex flex-col gap-1">
              {topics.map((t, i) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.listLabel}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
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

          {/* Right: single tilted card, purely visual — dissolves into the section at the bottom */}
          <div className="relative -mb-10 h-[460px] self-end">
            <div
              className="absolute inset-0 overflow-hidden rounded-3xl border border-line bg-bg/60 p-8 sm:p-10"
              style={{
                maskImage: "linear-gradient(to bottom, black 55%, transparent 92%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 92%)",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={topic.cardLabel}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="w-fit rounded-xl border border-line bg-white px-5 py-2.5 text-sm text-ink-soft shadow-sm"
                >
                  {topic.cardLabel}
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={topic.heading}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="relative mt-10"
                >
                  <h3 className="font-editorial text-2xl text-ink">{topic.heading}</h3>

                  <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                    {topic.preview}
                  </p>
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-bg"
                    aria-hidden="true"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
