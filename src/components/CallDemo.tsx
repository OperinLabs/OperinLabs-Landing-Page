import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Line {
  speaker: "Caller" | "OperinLabs";
  text: string;
}

interface Exchange {
  caller: string;
  lines: Line[];
}

const EXCHANGES: Exchange[] = [
  {
    caller: "Silchar Medical Centre",
    lines: [
      { speaker: "Caller", text: "Aunty, doctor kolir slot ekhon ase ne?" },
      {
        speaker: "OperinLabs",
        text: "Ji ase, kalir bikelir 4 baji slot ta khali ase. Book kori dim ne?",
      },
    ],
  },
  {
    caller: "Green Valley Clinic",
    lines: [
      { speaker: "Caller", text: "Doctor-er shathe ki ajke dekha korte parbo?" },
      {
        speaker: "OperinLabs",
        text: "Ha, bikel 5 tay ekta slot ache. Naam ar phone number ta bolben?",
      },
    ],
  },
  {
    caller: "Apollo Care, Guwahati",
    lines: [
      { speaker: "Caller", text: "Kal ka appointment hai, time confirm karna tha." },
      {
        speaker: "OperinLabs",
        text: "Zaroor, aapka appointment kal subah 10 baje hai. Reminder bhi bhej dungi.",
      },
    ],
  },
];

export default function CallDemo() {
  const [exchangeIndex, setExchangeIndex] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);

  const exchange = EXCHANGES[exchangeIndex];

  useEffect(() => {
    setVisibleLines(0);
  }, [exchangeIndex]);

  useEffect(() => {
    if (visibleLines >= exchange.lines.length) {
      const holdTimer = setTimeout(() => {
        setExchangeIndex((i) => (i + 1) % EXCHANGES.length);
      }, 2400);
      return () => clearTimeout(holdTimer);
    }
    const lineTimer = setTimeout(() => {
      setVisibleLines((v) => v + 1);
    }, 1300);
    return () => clearTimeout(lineTimer);
  }, [visibleLines, exchange.lines.length]);

  return (
    <div className="relative w-full max-w-[440px] mx-auto lg:mx-0">
      {/* Ambient glow behind the card */}
      <div
        className="pointer-events-none absolute -inset-10 rounded-[40px] bg-accent/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative rounded-[28px] border border-line-night bg-night p-6 shadow-2xl shadow-black/30">
        {/* Call header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium tracking-wide text-night-soft">
              Incoming call
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={exchange.caller}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="font-editorial text-lg text-bg"
              >
                {exchange.caller}
              </motion.p>
            </AnimatePresence>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1.5 text-xs font-medium text-accent">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Live
          </span>
        </div>

        {/* Waveform */}
        <div className="mt-5 flex h-14 items-center justify-center gap-[3px] rounded-2xl bg-white/5 px-4">
          {Array.from({ length: 32 }).map((_, i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-full bg-accent/70"
              animate={{
                height: [
                  6 + ((i * 7) % 20),
                  10 + ((i * 13) % 28),
                  6 + ((i * 5) % 16),
                ],
              }}
              transition={{
                duration: 0.9 + (i % 5) * 0.15,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: i * 0.03,
              }}
            />
          ))}
        </div>

        {/* Live transcript */}
        <div className="mt-5 min-h-[132px] space-y-3">
          <AnimatePresence mode="popLayout">
            {exchange.lines.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={`${exchangeIndex}-${i}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={
                  line.speaker === "OperinLabs"
                    ? "ml-6 rounded-2xl rounded-bl-sm bg-accent/15 px-4 py-2.5"
                    : "mr-6 rounded-2xl rounded-br-sm bg-white/8 px-4 py-2.5"
                }
              >
                <p className="text-[10px] font-medium uppercase tracking-wider text-night-soft">
                  {line.speaker === "OperinLabs" ? "OperinLabs" : "Caller"}
                </p>
                <p className="mt-0.5 text-sm leading-snug text-bg">
                  {line.text}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
