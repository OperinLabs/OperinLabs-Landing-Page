import { motion } from "framer-motion";
import { BsTelephone, BsCalendarEvent, BsBell, BsArrowRepeat, BsArrowRight } from "react-icons/bs";

const steps = [
  {
    number: "01",
    icon: BsTelephone,
    title: "Connect",
    tags: "Calls · WhatsApp · Missed calls",
    body: "OperinLabs answers instantly, in Assamese, Bengali, or Hindi, and understands what the patient needs.",
  },
  {
    number: "02",
    icon: BsCalendarEvent,
    title: "Convert",
    tags: "Booking · Rescheduling · Follow-ups",
    body: "Turns the conversation into a confirmed appointment, or a recovered patient who would have hung up.",
  },
  {
    number: "03",
    icon: BsBell,
    title: "Retain",
    tags: "Reminders · Refills · Vitals check-ins",
    body: "Keeps patients engaged between visits and supports continuous care, especially for elderly patients.",
  },
  {
    number: "04",
    icon: BsArrowRepeat,
    title: "Repeat",
    tags: "Continuous engagement loop",
    body: "An always-on system that gives clinics and hospitals steadier patient engagement, call after call.",
  },
];

export default function Product() {
  return (
    <section id="product" className="scroll-mt-24 bg-bg px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-xl"
        >
          <p className="text-sm font-medium text-accent">How OperinLabs works</p>
          <h2 className="mt-3 font-editorial font-medium text-ink text-[32px] sm:text-[40px] leading-[1.1] tracking-[-0.01em]">
            One line. Every patient handled.
          </h2>
          <p className="mt-4 max-w-[50ch] text-base leading-relaxed text-ink-soft">
            OperinLabs sits on your clinic's phone line and runs the same
            loop on every call, so nothing depends on who happens to pick up.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-4 lg:gap-0">
          {steps.map(({ number, icon: Icon, title, tags, body }, i) => (
            <div key={number} className="flex items-stretch">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                className="flex flex-1 flex-col rounded-2xl border border-line bg-white p-7"
              >
                <span className="font-editorial text-4xl text-accent/30">
                  {number}
                </span>
                <div className="mt-4 flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <Icon className="text-base" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-editorial text-xl text-ink">{title}</h3>
                <p className="mt-2 text-xs font-medium tracking-wide text-ink-soft">
                  {tags}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {body}
                </p>
              </motion.div>

              {i < steps.length - 1 && (
                <div className="hidden shrink-0 items-center justify-center px-3 lg:flex">
                  <BsArrowRight className="text-lg text-ink-soft/40" aria-hidden="true" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
