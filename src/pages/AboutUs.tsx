import { motion } from "framer-motion";

interface AboutUsProps {
  onBookDemo: () => void;
}

type Block =
  | { type: "p"; text: string }
  | { type: "bold"; text: string }
  | { type: "highlight"; text: string }
  | { type: "p-lead-highlight"; lead: string; rest: string };

const body: Block[] = [
  {
    type: "p",
    text: "Healthcare has no shortage of software. Hospitals and clinics already use systems for appointments, patient records, billing, communication and operations. Yet a significant amount of the work around these systems is still handled manually.",
  },
  {
    type: "p",
    text: "Calls are answered one by one. Appointments are confirmed manually. Patients are followed up with. Refill requests are coordinated. Information moves between patients, doctors, pharmacies and staff. The software exists, but people are still required to operate it.",
  },
  { type: "bold", text: "We believe that should change." },
  {
    type: "p",
    text: "OperinLabs is building that — an autonomous operations platform for healthcare. Instead of simply helping healthcare teams manage their work, OperinLabs is designed to understand what needs to be done, take the necessary action, and complete the workflow.",
  },
  {
    type: "p",
    text: "It can answer patient calls, understand requests, book and reschedule appointments, send confirmations and reminders, follow up with patients, initiate refill workflows and bring in a human whenever the situation requires one.",
  },
  { type: "highlight", text: "From AI that assists to AI that works." },
  {
    type: "p",
    text: "We are starting with the most visible layer of healthcare operations — patient communication — and expanding into the workflows that follow: appointments, retention, refills, diagnostics, coordination and everyday operational tasks.",
  },
  {
    type: "p-lead-highlight",
    lead: "Our long-term vision is simple",
    rest: ": give every healthcare organisation an AI workforce that can handle the repetitive operational workload around the clock, while its people focus on the work that genuinely requires human judgement and care.",
  },
  { type: "p", text: "OperinLabs is building that workforce." },
];

export default function AboutUs({ onBookDemo }: AboutUsProps) {
  return (
    <section className="bg-bg px-6 pb-24 pt-36 sm:pt-40">
      <div className="mx-auto max-w-[90rem]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-sm font-medium text-accent">About us</p>
          <h1 className="mt-3 max-w-3xl font-editorial font-medium text-ink text-[36px] sm:text-[48px] leading-[1.1] tracking-[-0.01em]">
            We're building the workforce behind the future of healthcare.
          </h1>

          <div className="mt-8 max-w-none space-y-5">
            {body.map((block, i) => {
              if (block.type === "bold") {
                return (
                  <p key={i} className="font-editorial text-2xl text-ink">
                    {block.text}
                  </p>
                );
              }
              if (block.type === "highlight") {
                return (
                  <p key={i}>
                    <span className="inline-block rounded-lg bg-accent-soft px-3 py-1.5 font-editorial text-xl text-ink">
                      {block.text}
                    </span>
                  </p>
                );
              }
              if (block.type === "p-lead-highlight") {
                return (
                  <p
                    key={i}
                    className="text-lg leading-relaxed text-ink-soft"
                  >
                    <span className="rounded bg-accent-soft px-1.5 py-0.5 text-ink">
                      {block.lead}
                    </span>
                    {block.rest}
                  </p>
                );
              }
              return (
                <p key={i} className="text-lg leading-relaxed text-ink-soft">
                  {block.text}
                </p>
              );
            })}
          </div>

          <button
            onClick={onBookDemo}
            className="mt-8 inline-flex items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent"
          >
            Book a Demo
          </button>
        </motion.div>
      </div>
    </section>
  );
}
