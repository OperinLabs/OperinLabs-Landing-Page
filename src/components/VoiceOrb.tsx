import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsChevronLeft, BsChevronRight, BsArrowRight } from "react-icons/bs";

interface VoiceOrbProps {
  onStart: () => void;
}

const specialties = [
  { name: "OPD Clinics & Hospitals", sub: "Appointment Booking & Follow-Ups" },
  { name: "Diagnostics Lab", sub: "Test bookings & Sample Collection" },
  { name: "Pharmacy", sub: "Reminders & Refill" },
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

      <div className="relative mt-6 flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64">
        {/* Ball */}
        <motion.div
          className="relative h-full w-full rounded-full"
          animate={{ scale: [1, 1.065, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "linear-gradient(155deg, #0A1A5E 0%, #0057FF 55%, #9DC1FF 100%)",
            boxShadow: "0 30px 60px -20px rgba(10,26,94,0.45)",
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
