import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";

const boxes = [
  {
    label: "Answering",
    heading: "Call answering",
    body: "OperinLabs answers instantly, in Assamese, Bengali, or Hindi, and understands what the patient needs — no more busy signals.",
  },
  {
    label: "Scheduling",
    heading: "Appointment booking",
    body: "Turns the conversation into a confirmed appointment, or a recovered patient who would otherwise have hung up.",
  },
  {
    label: "Retention",
    heading: "Reminders & follow-ups",
    body: "Keeps patients engaged between visits and supports continuous care, especially for elderly patients.",
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

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {boxes.map(({ label, heading, body }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
              className="flex flex-col bg-bg p-8"
            >
              <p className="text-sm font-medium text-ink-soft">{label}</p>
              <h3 className="mt-2 font-jakarta text-xl font-semibold text-ink">
                {heading}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                {body}
              </p>
              <button className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-lg border border-line bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent-soft">
                Learn more
                <BsArrowRight className="text-xs" aria-hidden="true" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
