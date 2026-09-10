import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsCheck2 } from "react-icons/bs";

interface Exchange {
  patientLabel: string;
  patientMsg: string;
  reply: string;
  bookingLine: string;
}

const EXCHANGES: Exchange[] = [
  {
    patientLabel: "Patient · Silchar",
    patientMsg: "Aunty, doctor kolir slot ekhon ase ne?",
    reply:
      "Ji ase! Kalir bikelir 4 baji slot ta khali ase. Aponar naam ta di dibo pare ne?",
    bookingLine: "Tomorrow, 4:00 PM — Dr. Sharma",
  },
  {
    patientLabel: "Patient · Guwahati",
    patientMsg: "Doctor-er shathe ki ajke dekha korte parbo?",
    reply: "Ha, bikel 5 tay ekta slot ache. Naam ar phone number ta bolben?",
    bookingLine: "Today, 5:00 PM — Dr. Bora",
  },
  {
    patientLabel: "Patient · Apollo Care",
    patientMsg: "Kal ka appointment hai, time confirm karna tha.",
    reply:
      "Zaroor, aapka appointment kal subah 10 baje hai. Reminder bhi bhej dungi.",
    bookingLine: "Tomorrow, 10:00 AM — confirmed",
  },
];

type Phase = "typing" | "card" | "tap" | "confirmed";

export default function CallDemo() {
  const [exchangeIndex, setExchangeIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [revealed, setRevealed] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const exchange = EXCHANGES[exchangeIndex];

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  // Reset when we move to a new exchange
  useEffect(() => {
    setRevealed(0);
    setPhase("typing");
    return clearTimers;
  }, [exchangeIndex]);

  // Typing reveal
  useEffect(() => {
    if (phase !== "typing") return;
    if (revealed >= exchange.reply.length) {
      const t = setTimeout(() => setPhase("card"), 500);
      timers.current.push(t);
      return;
    }
    const t = setTimeout(() => setRevealed((r) => r + 2), 22);
    timers.current.push(t);
    return () => clearTimeout(t);
  }, [phase, revealed, exchange.reply.length]);

  // Card -> tap -> confirmed -> next
  useEffect(() => {
    if (phase === "card") {
      const t = setTimeout(() => setPhase("tap"), 1500);
      timers.current.push(t);
      return () => clearTimeout(t);
    }
    if (phase === "tap") {
      const t = setTimeout(() => setPhase("confirmed"), 260);
      timers.current.push(t);
      return () => clearTimeout(t);
    }
    if (phase === "confirmed") {
      const t = setTimeout(() => {
        setExchangeIndex((i) => (i + 1) % EXCHANGES.length);
      }, 2000);
      timers.current.push(t);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const replyText = exchange.reply.slice(0, revealed);
  const isReplyDone = revealed >= exchange.reply.length;

  return (
    <div className="relative w-full max-w-[440px] mx-auto lg:mx-0">
      <div className="relative rounded-[28px] border border-mono-line bg-white p-6 shadow-xl shadow-black/5">
        {/* Incoming patient message */}
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mono-bg text-xs font-medium text-mono-soft">
            {exchange.patientLabel.charAt(0)}
          </div>
          <div>
            <AnimatePresence mode="wait">
              <motion.p
                key={exchange.patientLabel}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="text-xs font-medium text-mono-soft"
              >
                {exchange.patientLabel}
              </motion.p>
            </AnimatePresence>
            <p className="mt-1 text-sm leading-relaxed text-mono-ink">
              {exchange.patientMsg}
            </p>
          </div>
        </div>

        <div className="my-5 h-px bg-mono-line" />

        {/* OperinLabs reply */}
        <div className="relative flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mono-ink text-xs font-medium text-mono-bg">
            O
          </div>
          <div className="min-h-[72px] flex-1">
            <p className="text-xs font-medium text-mono-soft">OperinLabs</p>
            <p className="mt-1 text-sm leading-relaxed text-mono-ink">
              {replyText}
              {!isReplyDone && (
                <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-mono-ink" />
              )}
            </p>

            {phase === "confirmed" && (
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-mono-bg px-3 py-1 text-xs font-medium text-mono-ink"
              >
                <BsCheck2 className="text-[13px]" aria-hidden="true" />
                Appointment booked
              </motion.span>
            )}
          </div>

          {/* Floating dark confirm card */}
          <AnimatePresence>
            {(phase === "card" || phase === "tap") && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute -bottom-4 right-0 w-[240px] rounded-2xl bg-mono-ink p-4 shadow-2xl shadow-black/30"
              >
                <p className="text-[10px] font-medium uppercase tracking-wider text-mono-bg/50">
                  Booking preview
                </p>
                <p className="mt-1.5 text-sm font-medium text-mono-bg">
                  {exchange.bookingLine}
                </p>
                <motion.button
                  animate={phase === "tap" ? { scale: 0.94 } : { scale: 1 }}
                  transition={{ duration: 0.15 }}
                  className="mt-3 w-full rounded-lg bg-mono-bg py-2 text-xs font-medium text-mono-ink"
                >
                  Confirm
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
