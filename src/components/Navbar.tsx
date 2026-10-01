import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import MobileMenu from "./MobileMenu";

interface NavbarProps {
  onBookDemo: () => void;
}

export interface NavLink {
  label: string;
  href: string;
  isRoute?: boolean;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", isRoute: true },
  { label: "Product", href: "/#product" },
  { label: "Our Thesis", href: "/our-thesis", isRoute: true },
  { label: "About Us", href: "/about", isRoute: true },
  { label: "Pricing", href: "/pricing", isRoute: true },
];

export default function Navbar({ onBookDemo }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-4 sm:top-6 left-0 right-0 z-50 px-6"
      >
        <nav
          className={
            scrolled
              ? "mx-auto flex max-w-[90rem] items-center justify-between gap-4 rounded-full border border-line bg-white/95 py-2 pl-4 pr-2 shadow-md shadow-black/[0.06] backdrop-blur-md transition-all duration-300"
              : "mx-auto flex max-w-[90rem] items-center justify-between gap-4 rounded-full border border-line bg-white/75 py-2.5 pl-4 pr-2 shadow-sm shadow-black/[0.03] backdrop-blur-md transition-all duration-300"
          }
          aria-label="Primary"
        >
          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center select-none">
            <img src="/logo.png" alt="OperinLabs" className="h-8 w-auto" />
          </Link>

          {/* Desktop links + actions, grouped together on the right */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => {
              const isActive = link.isRoute && location.pathname === link.href;
              const className = isActive
                ? "relative rounded-full px-4 py-1.5 text-sm font-medium text-ink"
                : "relative rounded-full px-4 py-1.5 text-sm font-medium text-ink-soft transition-colors duration-200 hover:text-ink";

              return link.isRoute ? (
                <Link key={link.label} to={link.href} className={className}>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-accent-soft"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              ) : (
                <a key={link.label} href={link.href} className={className}>
                  <span className="relative">{link.label}</span>
                </a>
              );
            })}
            <motion.button
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.96 }}
              onClick={onBookDemo}
              className="ml-1 rounded-full bg-ink px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-accent"
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
