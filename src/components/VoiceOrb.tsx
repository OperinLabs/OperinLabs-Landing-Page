import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsChevronLeft, BsChevronRight, BsArrowRight } from "react-icons/bs";

interface VoiceOrbProps {
  onStart: () => void;
}

const specialties = [
  { name: "OPD Front Desk", sub: "General appointments" },
  { name: "Multi-specialty Hospital", sub: "Department routing" },
  { name: "Diagnostics Lab", sub: "Test bookings & reports" },
  { name: "Dental Clinic", sub: "Recall & reminders" },
];

export default function VoiceOrb({ onStart }: VoiceOrbProps) {
  const [index, setIndex] = useState(0);
  const active = specialties[index];

  const cycle = (dir: 1 | -1) => {
    setIndex((i) => (i + dir + specialties.length) % specialties.length);
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-sm font-medium text-mono-soft">Talk to an Agent</p>

      <div className="relative mt-6">
        <div
          className="pointer-events-none absolute -inset-10 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(0,87,255,0.25) 0%, rgba(0,87,255,0) 70%)",
          }}
          aria-hidden="true"
        />
        <motion.div
          animate={{ scale: [1, 1.035, 1] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative h-56 w-56 rounded-full sm:h-64 sm:w-64"
          style={{
            background:
              "radial-gradient(circle at 32% 28%, #6FA0FF 0%, #0057FF 45%, #0A1A5E 100%)",
            boxShadow:
              "0 30px 60px -20px rgba(10,26,94,0.45), inset 0 -10px 30px rgba(10,26,94,0.35)",
          }}
        />
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={() => cycle(-1)}
          aria-label="Previous agent"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-mono-line text-mono-soft transition-colors hover:text-mono-ink"
        >
          <BsChevronLeft className="text-sm" aria-hidden="true" />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="w-56 text-center"
          >
            <p className="font-editorial text-lg text-mono-ink">{active.name}</p>
            <p className="text-xs text-mono-soft">{active.sub}</p>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => cycle(1)}
          aria-label="Next agent"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-mono-line text-mono-soft transition-colors hover:text-mono-ink"
        >
          <BsChevronRight className="text-sm" aria-hidden="true" />
        </button>
      </div>

      <motion.button
        whileHover={{ scale: 0.98 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-mono-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-black"
      >
        Start conversation
        <BsArrowRight className="text-xs" aria-hidden="true" />
      </motion.button>
    </div>
  );
}
