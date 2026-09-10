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
        className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-line"
      >
        <nav
          className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4"
          aria-label="Primary"
        >
          {/* Logo */}
          <a href="#top" className="flex items-center select-none">
            <img
              src="/logo.png"
              alt="OperinLabs"
              className="h-4 w-auto"
              />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(" ", "-")}`}
                className="group relative text-sm font-medium text-ink-soft"
              >
                {link}
                <span className="absolute left-0 -bottom-1 h-px w-0 bg-ink transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#sign-in"
              className="text-sm font-medium text-ink-soft transition-opacity duration-200 hover:opacity-70"
            >
              Sign In
            </a>
            <motion.button
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.96 }}
              onClick={onBookDemo}
              className="rounded-xl border border-ink/15 bg-white px-5 py-2.5 text-sm font-medium text-ink shadow-sm"
            >
              Book a Demo
            </motion.button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-ink text-2xl"
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
