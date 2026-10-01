import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import CallDemo from "./CallDemo";
import PhoneCallDemo from "./PhoneCallDemo";
import TrustIndicators from "./TrustIndicators";

interface HeroProps {
  onBookDemo: () => void;
}

const headlineLine1 = ["Superhuman", "team", "of", "AI", "workforce", "for", "autonomous"];
const headlineLine2 = ["healthcare", "operations"];

const subheadLine1 = [
  "OperinLabs", "gives", "healthcare", "organisations", "an", "AI",
  "workforce", "for", "autonomous", "healthcare", "operations,",
  "starting", "with", "an", "agent", "that", "works", "around", "the",
  "clock,", "answering", "calls,",
];
const subheadLine2 = [
  "booking", "appointments,", "sending", "reminders,", "and",
  "following", "up", "in", "Assamese,", "Bengali,", "Hindi,", "and",
  "English,", "turning", "conversations", "into", "decisions,",
  "actions,", "and", "completed", "workflows.",
];

const steps = [
  { label: "Understands", detail: "Multilingual intent" },
  { label: "Acts", detail: "Books & sends reminders" },
  { label: "Confirms", detail: "Logs & escalates when needed" },
];

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const word = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

export default function Hero({ onBookDemo }: HeroProps) {
  const navigate = useNavigate();
  void onBookDemo;

  return (
    <section
      id="top"
      className="relative scroll-mt-24 overflow-hidden bg-abyss px-6 pb-20 pt-32 sm:pt-36"
    >
      {/* Ambient backdrop: grid texture + slow-drifting accent orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-grid-light absolute inset-0 [mask-image:radial-gradient(ellipse_80%_55%_at_50%_0%,black,transparent)]" />
        <motion.div
          className="absolute -top-24 left-[6%] h-[420px] w-[420px] rounded-full bg-accent/25 blur-[120px]"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-32 right-[8%] h-[360px] w-[360px] rounded-full bg-accent/20 blur-[120px]"
          animate={{ x: [0, -30, 0], y: [0, -25, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex max-w-[90rem] flex-col items-start text-left"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-abyss-line bg-white/5 px-3 py-1 text-xs font-medium text-accent"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          AI workforce for healthcare — live in Assam
        </motion.span>

        <motion.h1
          variants={container}
          className="mt-6 w-full font-editorial font-medium leading-[1.05] tracking-[-0.01em] text-abyss-ink text-[36px] sm:text-[46px] md:text-[56px]"
        >
          <span className="flex flex-wrap gap-x-2 gap-y-1 lg:flex-nowrap lg:justify-between">
            {headlineLine1.map((w, i) => (
              <motion.span key={i} variants={word} className="inline-block">
                {w}
              </motion.span>
            ))}
          </span>
          <span className="mt-1 flex flex-wrap justify-center gap-[0.3em]">
            {headlineLine2.map((w, i) => (
              <motion.span key={i} variants={word} className="inline-block">
                {w}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 w-full text-base leading-relaxed text-abyss-soft"
        >
          <span className="flex w-full justify-between">
            {subheadLine1.map((w, i) => (
              <span key={i} className="inline-block">
                {w}
              </span>
            ))}
          </span>
          <span className="flex w-full justify-between">
            {subheadLine2.map((w, i) => (
              <span key={i} className="inline-block">
                {w}
              </span>
            ))}
          </span>
        </motion.p>
      </motion.div>

      {/* How it works — live call demo */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <motion.p
          variants={item}
          className="mt-14 text-xs font-semibold uppercase tracking-wide text-accent"
        >
          See it work
        </motion.p>
        <motion.h2
          variants={item}
          className="mt-2 font-editorial text-2xl text-abyss-ink sm:text-3xl"
        >
          Your AI Receptionist
        </motion.h2>

        {/* Process steps — equal-width columns so the circles land exactly
            equidistant no matter how long each step's label/detail is. */}
        <motion.div
          variants={item}
          className="mt-8 grid w-full max-w-sm grid-cols-3"
        >
          {steps.map((step, i) => (
            <div
              key={step.label}
              className="relative flex flex-col items-center px-1 text-center"
            >
              {i > 0 && (
                <div className="absolute right-1/2 top-[18px] h-px w-full bg-abyss-line" />
              )}
              <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white shadow-[0_0_24px_rgba(0,87,255,0.55)]">
                {i + 1}
              </div>
              <p className="mt-2 text-xs font-medium text-abyss-ink">
                {step.label}
              </p>
              <p className="mt-0.5 hidden text-[11px] text-abyss-soft sm:block">
                {step.detail}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div variants={item} className="mt-10 w-full">
          <CallDemo />
        </motion.div>

        <motion.p
          variants={item}
          className="mt-10 text-xs font-semibold uppercase tracking-wide text-accent"
        >
          And it doesn't stop at chat — it's on the phone too
        </motion.p>

        <motion.div variants={item} className="mt-6 w-full">
          <PhoneCallDemo />
        </motion.div>

        <motion.div variants={item} className="mt-8">
          <motion.button
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/talk-to-receptionist")}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-[0_0_30px_rgba(0,87,255,0.45)] transition-colors hover:bg-[#0048d9]"
          >
            Talk to your Receptionist
            <BsArrowRight className="text-xs" aria-hidden="true" />
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        variants={item}
        initial="hidden"
        animate="show"
        className="relative mx-auto mt-16 max-w-6xl border-t border-abyss-line pt-8"
      >
        <div className="flex justify-center">
          <TrustIndicators variant="dark" />
        </div>
      </motion.div>
    </section>
  );
}
