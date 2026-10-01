import { Link } from "react-router-dom";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";

interface FooterProps {
  onBookDemo: () => void;
}

const productLinks = [
  { label: "AI Receptionist", href: "/#product" },
  { label: "AI Patient Care Coordinator", href: "/#product" },
  { label: "AI Scribe", href: "/#product" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Thesis", href: "/#our-thesis" },
  { label: "Book a Demo", href: "/book-a-demo" },
];

export default function Footer({ onBookDemo }: FooterProps) {
  return (
    <footer className="relative overflow-hidden bg-abyss px-6 pb-10 pt-28">
      {/* Faint grid texture, same treatment as the Hero band, for a bookend feel */}
      <div className="bg-grid-light pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />

      <div className="relative mx-auto max-w-[90rem]">
        {/* Closing CTA — large tagline + button, Sully-style */}
        <div className="max-w-none text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            Ready when you are
          </p>
          <h2 className="mt-3 font-editorial text-[40px] leading-[1.1] text-abyss-ink sm:text-[56px]">
            Ready for the <em className="italic">future</em> of autonomous
            system for healthcare operations?
          </h2>
          <button
            onClick={onBookDemo}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-medium text-white shadow-[0_0_30px_rgba(0,87,255,0.4)] transition-colors hover:bg-[#0048d9]"
          >
            Book a Demo
            <BsArrowRight className="text-xs" aria-hidden="true" />
          </button>
        </div>

        {/* Link columns — same content, dark-theme treatment */}
        <div className="mt-24 grid grid-cols-1 gap-y-12 border-t border-abyss-line pt-14 sm:grid-cols-3 sm:gap-x-16">
          <div>
            <p className="text-sm font-medium text-abyss-ink">Product</p>
            <ul className="mt-4 flex flex-col gap-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("/#") ? (
                    
                      href={link.href}
                      className="text-sm text-abyss-soft transition-colors hover:text-abyss-ink"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-sm text-abyss-soft transition-colors hover:text-abyss-ink"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-abyss-ink">Company</p>
            <ul className="mt-4 flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("/#") ? (
                    
                      href={link.href}
                      className="text-sm text-abyss-soft transition-colors hover:text-abyss-ink"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-sm text-abyss-soft transition-colors hover:text-abyss-ink"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-abyss-ink">Support</p>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-abyss-soft">
              <li>
                
                  href="mailto:hello@operinlabs.com"
                  className="transition-colors hover:text-abyss-ink"
                >
                  hello@operinlabs.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Logo + social, bottom row — Sully-style: brand mark and copyright
            share one quiet row instead of being set apart */}
        <div className="mt-14 flex flex-col gap-6 border-t border-abyss-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-white/95 p-1.5">
              <img src="/logo.png" alt="OperinLabs" className="h-6 w-auto" />
            </div>
            <p className="text-xs text-abyss-soft">
              © {new Date().getFullYear()} OperinLabs. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-3">
            
              href="https://www.linkedin.com/company/operinlabs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="OperinLabs on LinkedIn"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-abyss-line text-abyss-soft transition-colors hover:border-accent/40 hover:text-accent"
            >
              <BsLinkedin aria-hidden="true" />
            </a>
            
              href="#top"
              className="text-xs font-medium text-abyss-soft transition-colors hover:text-abyss-ink"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
