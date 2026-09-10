import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsCheck2 } from "react-icons/bs";

interface Turn {
  sender: "patient" | "bot";
  text: string;
}

interface Exchange {
  patientLabel: string;
  turns: Turn[];
  bookingLine: string;
}

const EXCHANGES: Exchange[] = [
  {
    patientLabel: "Patient · Silchar",
    turns: [
      { sender: "patient", text: "Aunty, doctor kolir slot ekhon ase ne?" },
      { sender: "bot", text: "Kun doctor lagibo aponar?" },
      { sender: "patient", text: "General physician, jekonoba slot hole hobo" },
      {
        sender: "bot",
        text: "Ji ase! Kalir bikelir 4 baji slot ta khali ase. Aponar naam ta di dibo pare ne?",
      },
    ],
    bookingLine: "Tomorrow, 4:00 PM — Dr. Sharma",
  },
  {
    patientLabel: "Patient · Guwahati",
    turns: [
      { sender: "patient", text: "Doctor-er shathe ki ajke dekha korte parbo?" },
      { sender: "bot", text: "Kon doctor-er kotha bolchen?" },
      { sender: "patient", text: "Dr. Bora, dermatologist" },
      {
        sender: "bot",
        text: "Ha, bikel 5 tay ekta slot ache. Naam ar phone number ta bolben?",
      },
    ],
    bookingLine: "Today, 5:00 PM — Dr. Bora",
  },
  {
    patientLabel: "Patient · Apollo Care",
    turns: [
      { sender: "patient", text: "Kal ka appointment hai, time confirm karna tha." },
      { sender: "bot", text: "Zaroor, aapka naam bata sakte hain?" },
      { sender: "patient", text: "Allan Rodrigues" },
      {
        sender: "bot",
        text: "Dhanyavaad Allan, aapka appointment kal subah 10 baje hai. Reminder bhi bhej dungi.",
      },
    ],
    bookingLine: "Tomorrow, 10:00 AM — confirmed",
  },
];

type Phase = "reveal" | "typing" | "card" | "tap" | "confirmed";

export default function CallDemo() {
  const [exchangeIndex, setExchangeIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("reveal");
  const [shownTurns, setShownTurns] = useState(0);
  const [revealedChars, setRevealedChars] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const exchange = EXCHANGES[exchangeIndex];
  const lastTurn = exchange.turns[exchange.turns.length - 1];
  const priorTurns = exchange.turns.slice(0, -1);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  // Reset when we move to a new exchange
  useEffect(() => {
    setShownTurns(0);
    setRevealedChars(0);
    setPhase("reveal");
    return clearTimers;
  }, [exchangeIndex]);

  // Reveal the back-and-forth turns one at a time, then move to typing the final reply
  useEffect(() => {
    if (phase !== "reveal") return;
    if (shownTurns >= priorTurns.length) {
      const t = setTimeout(() => setPhase("typing"), 450);
      timers.current.push(t);
      return () => clearTimeout(t);
    }
    const t = setTimeout(
      () => setShownTurns((s) => s + 1),
      shownTurns === 0 ? 300 : 650
    );
    timers.current.push(t);
    return () => clearTimeout(t);
  }, [phase, shownTurns, priorTurns.length]);

  // Typing reveal for the final reply
  useEffect(() => {
    if (phase !== "typing") return;
    if (revealedChars >= lastTurn.text.length) {
      const t = setTimeout(() => setPhase("card"), 500);
      timers.current.push(t);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setRevealedChars((r) => r + 2), 22);
    timers.current.push(t);
    return () => clearTimeout(t);
  }, [phase, revealedChars, lastTurn.text.length]);

  // Card -> tap -> confirmed -> next exchange
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
      }, 2200);
      timers.current.push(t);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const replyText = lastTurn.text.slice(0, revealedChars);
  const isReplyDone = revealedChars >= lastTurn.text.length;

  return (
    <div className="relative w-full max-w-[540px] mx-auto lg:mx-0">
      <div className="relative rounded-[28px] border border-mono-line bg-white p-8 shadow-xl shadow-black/5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-mono-line pb-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={exchange.patientLabel}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              className="text-sm font-medium text-mono-soft"
            >
              {exchange.patientLabel}
            </motion.p>
          </AnimatePresence>
          <span className="flex items-center gap-1.5 text-xs font-medium text-mono-soft">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mono-ink opacity-50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mono-ink" />
            </span>
            Live
          </span>
        </div>

        {/* Conversation */}
        <div className="mt-5 flex min-h-[280px] flex-col gap-4">
          <AnimatePresence initial={false}>
            {priorTurns.slice(0, shownTurns).map((turn, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={
                  turn.sender === "bot"
                    ? "flex items-start gap-3"
                    : "flex items-start gap-3"
                }
              >
                <div
                  className={
                    turn.sender === "bot"
                      ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mono-ink text-xs font-medium text-mono-bg"
                      : "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mono-bg text-xs font-medium text-mono-soft"
                  }
                >
                  {turn.sender === "bot" ? "O" : exchange.patientLabel.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-medium text-mono-soft">
                    {turn.sender === "bot" ? "OperinLabs" : "Patient"}
                  </p>
                  <p className="mt-1 text-[15px] leading-relaxed text-mono-ink">
                    {turn.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Final reply: types out, then triggers the booking card */}
          {shownTurns >= priorTurns.length && (
            <div className="relative flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mono-ink text-xs font-medium text-mono-bg">
                O
              </div>
              <div className="min-h-[72px] flex-1">
                <p className="text-xs font-medium text-mono-soft">OperinLabs</p>
                <p className="mt-1 text-[15px] leading-relaxed text-mono-ink">
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
                    className="absolute -bottom-4 right-0 w-[260px] rounded-2xl bg-mono-ink p-4 shadow-2xl shadow-black/30"
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
          )}
        </div>
      </div>
    </div>
  );
}
