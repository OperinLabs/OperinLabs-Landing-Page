import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BsArrowRight, BsSoundwave, BsCalendarCheck, BsArrowRepeat } from "react-icons/bs";

const boxes = [
  {
    heading: "Understands",
    icon: BsSoundwave,
    tags: ["Calls", "WhatsApp", "Patient Queries"],
    body: "Answers patients 24×7 in Assamese, Bengali, Hindi and English.",
  },
  {
    heading: "Acts",
    icon: BsCalendarCheck,
    tags: ["Bookings", "Rescheduling", "Reminders", "Follow-ups"],
    body: "Takes action on patient requests instead of simply answering them.",
  },
  {
    heading: "Follows",
    icon: BsArrowRepeat,
    tags: ["Refills", "Patient Requests", "Operations", "Escalations"],
    body: "Gets repetitive work done and brings your team in when human help is needed.",
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
          <h2 className="whitespace-nowrap font-jakarta font-semibold text-ink text-[22px] sm:text-[30px] lg:text-[36px] leading-[1.1] tracking-[-0.01em]">
            From Interaction to Autonomous Execution. Built for Healthcare.
          </h2>
          <p className="mt-4 whitespace-nowrap text-base leading-relaxed text-ink-soft">
            OperinLabs is the autonomous execution layer that turns every
            interaction into action.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {boxes.map(({ heading, icon: Icon, tags, body }, i) => (
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
              <ul className="mt-3 flex flex-col gap-1 text-sm font-medium text-ink">
                {tags.map((tag) => (
                  <li key={tag} className="flex items-start gap-2">
                    <span aria-hidden="true">•</span>
                    <span>{tag}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                {body}
              </p>
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
