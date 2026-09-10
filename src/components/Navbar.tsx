import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import MobileMenu from "./MobileMenu";

interface NavbarProps {
  onBookDemo: () => void;
}

const navLinks = ["Product", "Story", "Use Cases"];

export default function Navbar({ onBookDemo }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-4 sm:top-6 left-0 right-0 z-50 px-4"
      >
        <nav
          className="mx-auto flex max-w-3xl items-center justify-between gap-4 rounded-full border border-line bg-white/80 py-2 pl-4 pr-2 shadow-sm shadow-black/[0.03] backdrop-blur-md"
          aria-label="Primary"
        >
          {/* Logo */}
          <a href="#top" className="flex shrink-0 items-center select-none">
            <img src="/logo.png" alt="OperinLabs" className="h-8 w-auto" />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex md:items-center">
            {navLinks.map((link, i) => (
              <span key={link} className="flex items-center">
                <a
                  href={`#${link.toLowerCase().replace(" ", "-")}`}
                  className="rounded-full px-4 py-1.5 text-sm font-medium text-ink-soft transition-colors duration-200 hover:text-ink"
                >
                  {link}
                </a>
                {i < navLinks.length - 1 && (
                  <span
                    className="h-4 w-px bg-line"
                    aria-hidden="true"
                  />
                )}
              </span>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex md:items-center">
            <motion.button
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.96 }}
              onClick={onBookDemo}
              className="rounded-full bg-[#111111] px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-black"
            >
              Book a Demo
            </motion.button>
          </div>

          {/* Mobile toggle */}
          <button
            className="text-ink text-2xl md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <MobileMenu
            links={navLinks}
            onClose={() => setMenuOpen(false)}
            onBookDemo={() => {
              setMenuOpen(false);
              onBookDemo();
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
