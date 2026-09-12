import { motion } from "framer-motion";

type BodyBlock = { text: string; bold?: boolean; highlight?: string };

const bodyBlocks: BodyBlock[] = [
  {
    text: "Healthcare has no shortage of software. Hospitals and clinics already use systems for appointments, patient records, billing, communication and operations. Yet a significant amount of the work around these systems is still handled manually. Calls are answered one by one. Appointments are confirmed manually. Patients are followed up with. Refill requests are coordinated. Information moves between patients, doctors, pharmacies and staff. The software exists, but people are still required to operate it.",
  },
  { text: "We believe that should change.", bold: true },
  {
    text: "OperinLabs is building that, an autonomous operations platform for healthcare. Instead of simply helping healthcare teams manage their work, OperinLabs is designed to understand what needs to be done, take the necessary action, and complete the workflow. It can answer patient calls, understand requests, book and reschedule appointments, send confirmations and reminders, follow up with patients, initiate refill workflows and bring in a human whenever the situation requires one.",
  },
  { text: "From AI that assists to AI that works." },
  {
    text: "We are starting with the most visible layer of healthcare operations, patient communication, and expanding into the workflows that follow: appointments, retention, refills, diagnostics, coordination and everyday operational tasks.",
  },
  {
    highlight: "Our long-term vision is simple",
    text: ": give every healthcare organisation an AI workforce that can handle the repetitive operational workload around the clock, while its people focus on the work that genuinely requires human judgement and care.",
  },
  { text: "OperinLabs is building that workforce." },
];

const values = [
  {
    heading: "Built for Assam first",
    body: "We started with the clinics and hospitals nearest to us, in languages the big voice-AI platforms don't prioritize.",
  },
  {
    heading: "No patient left on hold",
    body: "Every product decision traces back to one question: does this stop a call from going unanswered?",
  },
  {
    heading: "Small team, real accountability",
    body: "We're piloting directly with hospital staff, not shipping into a black box — feedback reaches us the same week.",
  },
];

export default function AboutUs() {
  return (
    <section className="bg-bg px-6 pb-24 pt-36 sm:pt-40">
      <div className="mx-auto max-w-[90rem]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-sm font-medium text-accent">About us</p>
          <h1 className="mt-3 max-w-none font-editorial font-medium text-ink text-[36px] sm:text-[48px] leading-[1.1] tracking-[-0.01em]">
            We're building the workforce behind the future of healthcare.
          </h1>

          <div className="mt-10 max-w-none space-y-5 border-t border-line pt-10">
            {bodyBlocks.map((block, i) => (
              <p
                key={i}
                className={
                  block.bold
                    ? "text-[17px] font-semibold leading-relaxed text-ink"
                    : "text-[17px] leading-relaxed text-ink-soft"
                }
              >
                {block.highlight && (
                  <span className="rounded bg-accent-soft px-1 py-0.5 text-ink">
                    {block.highlight}
                  </span>
                )}
                {block.text}
              </p>
            ))}
          </div>
        </motion.div>

        <div className="mt-20 grid gap-6 border-t border-line pt-14 sm:grid-cols-3">
          {values.map(({ heading, body }, i) => (
            <motion.div
              key={heading}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
            >
              <h3 className="font-editorial text-xl text-ink">{heading}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                {body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
