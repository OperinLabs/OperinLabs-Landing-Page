import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BsArrowRight, BsHeadset, BsArrowRepeat, BsMicFill, BsCheck2 } from "react-icons/bs";

const boxes = [
  {
    heading: "AI Receptionist",
    icon: BsHeadset,
    summary: "The always-on front desk that never misses a call.",
    duties: [
      "Answers calls, WhatsApp messages, and patient queries 24×7 in Assamese, Bengali, Hindi & English",
      "Books and reschedules appointments",
      "Sends reminders and handles follow-ups",
    ],
  },
  {
    heading: "AI Patient Care Coordinator",
    icon: BsArrowRepeat,
    summary: "Keeps patients cared for between visits, without extra staff.",
    duties: [
      "Handles medication refill requests",
      "Manages day-to-day patient requests and operations",
      "Escalates to your team only when human help is genuinely needed",
    ],
  },
  {
    heading: "AI Scribe",
    icon: BsMicFill,
    summary: "Turns every visit into a finished note, automatically.",
    duties: [
      "Takes dictation during patient visits",
      "Generates clinical notes",
      "Handles documentation so doctors get time back from pen and paper",
    ],
  },
];

export default function Product() {
  return (
    <section id="product" className="scroll-mt-24 bg-bg px-6 py-24">
      <div className="mx-auto max-w-[90rem]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full"
        >
          <h2 className="lg:whitespace-nowrap font-jakarta font-semibold text-ink text-[26px] sm:text-[30px] lg:text-[36px] leading-[1.15] lg:leading-[1.1] tracking-[-0.01em]">
            Meet your AI team. Built for Healthcare.
          </h2>
          <p className="mt-4 lg:whitespace-nowrap text-base leading-relaxed text-ink-soft">
            OperinLabs is a team of AI employees that runs your clinic's
            front desk and patient care operations — around the clock.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {boxes.map(({ heading, icon: Icon, summary, duties }, i) => (
            <motion.div
              key={heading}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
              className="flex flex-col rounded-2xl border border-line bg-white p-8"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                <Icon className="text-lg" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-jakarta text-2xl font-semibold text-ink">
                {heading}
              </h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">
                {summary}
              </p>

              <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-ink-soft/70">
                Duties &amp; Responsibilities
              </p>
              <ul className="mt-3 flex flex-1 flex-col gap-2.5">
                {duties.map((duty) => (
                  <li key={duty} className="flex items-start gap-2.5">
                    <BsCheck2
                      className="mt-0.5 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-relaxed text-ink">
                      {duty}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                to="/pricing"
                className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-lg border border-line bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent-soft"
              >
                Know more
                <BsArrowRight className="text-xs" aria-hidden="true" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
