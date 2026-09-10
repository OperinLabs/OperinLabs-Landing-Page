import { motion } from "framer-motion";

interface MobileMenuProps {
  links: string[];
  onClose: () => void;
  onBookDemo: () => void;
}

export default function MobileMenu({ links, onClose, onBookDemo }: MobileMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 z-40 bg-bg flex flex-col items-center justify-center gap-8 md:hidden"
    >
      {links.map((link) => (
        <a
          key={link}
          href={`#${link.toLowerCase().replace(" ", "-")}`}
          onClick={onClose}
          className="text-2xl font-editorial text-ink"
        >
          {link}
        </a>
      ))}
      <button
        onClick={onBookDemo}
        className="mt-4 rounded-xl bg-ink px-8 py-4 text-white font-medium text-lg"
      >
        Book a Demo
      </button>
    </motion.div>
  );
}
