import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { thesisTopics as topics } from "../lib/thesisTopics";

type EssayBlock = { text: string; bold?: boolean };

const essay: EssayBlock[] = [
  { text: "Software should not just help people do the work. AI should be able to do the work." },
  {
    text: "Healthcare has invested heavily in software, but much of the work around that software is still manual. Appointments need to be booked, calls need to be answered, patients need to be followed up with, reminders need to be sent, prescriptions need to be refilled, and information needs to move between patients, doctors, pharmacies and staff. The software exists, but people are still required to operate it.",
  },
  {
    text: "This creates an important gap. The problem is no longer only access to software; it is the amount of human effort required to operate it.",
  },
  {
    text: "Administrative burden has become one of the clearest opportunities for AI in healthcare. In a 2024 AMA survey, 57% of physicians identified reducing administrative burden through automation as the biggest opportunity for AI, while 75% believed AI could improve work efficiency.",
  },
  {
    text: "The same shift is beginning in India. Recent research from Bain & Company and HealthQuad shows that Indian healthcare providers are already experimenting with AI, with adoption currently concentrated in administrative and operational workflows. The opportunity is moving from isolated pilots towards AI being embedded directly into the way healthcare organizations operate.",
  },
  { text: "We believe this is the next layer of healthcare software.", bold: true },
  { text: "The first generation of healthcare software digitized information." },
  { text: "The next generation should execute work." },
  {
    text: "Instead of simply telling a staff member what to do, AI should be able to understand a request, make the necessary decisions, interact with existing systems, take the required actions and close the loop.",
  },
  {
    text: "A patient should not have to wait for someone to check a schedule, make a booking, send a confirmation and remember to follow up.",
  },
  { text: "AI should be able to do it." },
  { text: "This is the fundamental difference between an AI assistant and an AI workforce." },
  { text: "An assistant helps a person complete a task." },
  { text: "A workforce can take responsibility for completing the task itself." },
  { text: "This is what we are building with OperinLabs." },
  {
    text: "OperinLabs starts where healthcare has one of its highest volumes of repetitive work, patient communication and front-desk operations.",
  },
  {
    text: "It can answer patient calls, understand requests, book and reschedule appointments, send confirmations and reminders, follow up with patients, initiate refill workflows and escalate situations to the right human when required.",
  },
  {
    text: "And importantly, it is built for the realities of Indian healthcare, including Assamese, Bengali, Hindi and English, rather than assuming every patient interaction happens in English.",
  },
  { text: "But communication is only the starting point." },
  {
    text: "As OperinLabs takes on more workflows, the same AI workforce can move from answering patients to executing the work behind those conversations, appointments, follow-ups, refills, coordination, retention and eventually broader healthcare operations.",
  },
  { text: "Our long-term belief", bold: true },
  { text: "Healthcare will not become more efficient simply by adding more software for people to operate." },
  { text: "It will become more efficient when software starts taking responsibility for the work itself." },
  {
    text: "We are building towards a healthcare operating system where AI does the repetitive operational work, while healthcare teams focus their time on the work that genuinely requires people.",
  },
  { text: "From software that assists, to AI that works." },
  { text: "That is the thesis behind OperinLabs." },
];

export default function OurThesis() {
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
          and complete everyday healthcare operations. We believe
          healthcare needs more than software that helps people work. It
          needs AI that can actually do the work.
        </p>

        <div className="mt-14 max-w-none space-y-5 border-t border-line pt-14">
          {essay.map((block, i) => (
            <p
              key={i}
              className={
                block.bold
                  ? "font-editorial text-2xl text-ink"
                  : "text-[17px] leading-relaxed text-ink-soft"
              }
            >
              {block.text}
            </p>
          ))}
        </div>

        <div className="mt-20">
          <h2 className="font-editorial text-2xl text-ink">
            Explore the thesis by topic
          </h2>
          <div className="mt-8 grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left: topic list */}
          <div className="flex flex-col gap-1 lg:sticky lg:top-28 lg:self-start">
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
        </div>

        <div className="mt-20 flex flex-col items-start gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[46ch] text-ink-soft">
            See this thesis in action — talk to OperinLabs directly.
          </p>
          <Link
            to="/"
            className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
