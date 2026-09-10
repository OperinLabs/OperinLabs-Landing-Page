import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface CTAButtonProps {
  children: ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
}

export default function CTAButton({ children, onClick, ariaLabel }: CTAButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 0.98 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      aria-label={ariaLabel}
      className="inline-flex items-center justify-center rounded-xl bg-[#111111] px-8 py-4 text-white font-medium font-inter shadow-lg shadow-black/10 transition-colors duration-200 hover:bg-black"
    >
      {children}
    </motion.button>
  );
}
