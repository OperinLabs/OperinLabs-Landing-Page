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
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Full-width, top-anchored bar (not a floating pill) — a plain,
          enterprise-SaaS nav pattern: solid surface, hairline border,
          a touch more shadow once the page scrolls. */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={
          scrolled
            ? "fixed top-0 left-0 right-0 z-50 border-b border-line bg-white/95 shadow-sm shadow-black/[0.04] backdrop-blur-md transition-all duration-300"
            : "fixed top-0 left-0 right-0 z-50 border-b border-transparent bg-white transition-all duration-300"
        }
      >
        <nav
          className="mx-auto flex h-16 max-w-[90rem] items-center justify-between gap-4 px-6"
          aria-label="Primary"
        >
          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center select-none">
            <img src="/logo.png" alt="OperinLabs" className="h-8 w-auto" />
          </Link>

          {/* Desktop links + actions, grouped together on the right */}
          <div className="hidden md:flex md:items-center md:gap-7">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = link.isRoute && location.pathname === link.href;
                const className = isActive
                  ? "relative text-sm font-medium text-ink"
                  : "relative text-sm font-medium text-ink-soft transition-colors duration-200 hover:text-ink";

                return link.isRoute ? (
                  <Link key={link.label} to={link.href} className={className}>
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-underline"
                        className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-accent"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                  </Link>
                ) : (
                  <a key={link.label} href={link.href} className={className}>
                    {link.label}
                  </a>
                );
              })}
            </div>
            <motion.button
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.96 }}
              onClick={onBookDemo}
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-[0_8px_20px_-8px_rgba(0,87,255,0.6)] transition-colors duration-200 hover:bg-[#0048d9]"
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
