import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";

const boxes = [
  {
    heading: "Connect",
    tags: ["Calls", "WhatsApp", "Missed Calls"],
    body: "AI responds 24×7, never misses a call and understands patient intent.",
  },
  {
    heading: "Convert",
    tags: ["Booking", "Rescheduling", "Follow-ups"],
    body: "Turns conversations into confirmed appointments and recovered patients.",
  },
  {
    heading: "Retain",
    tags: ["Reminders", "Refills", "Vitals"],
    body: "Keeps patients engaged and supports continuous care, especially elderly patients.",
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
          className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
        >
          <h2 className="font-jakarta font-semibold text-ink text-[32px] sm:text-[40px] leading-[1.1] tracking-[-0.01em]">
            One line. Every patient handled.
          </h2>
          <p className="max-w-[38ch] text-base leading-relaxed text-ink-soft sm:text-right">
            Build using the same call your front desk already answers —
            just never missed.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {boxes.map(({ heading, tags, body }, i) => (
            <motion.div
              key={heading}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
              className="flex flex-col rounded-2xl border border-line bg-white p-8"
            >
              <h3 className="font-jakarta text-2xl font-bold uppercase tracking-wide text-ink">
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
              <a
                href="#pricing"
                className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-lg border border-line bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent-soft"
              >
                Know more
                <BsArrowRight className="text-xs" aria-hidden="true" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
