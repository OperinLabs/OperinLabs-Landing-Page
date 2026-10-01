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
    <footer className="relative bg-bg px-6 pb-10 pt-40">
      {/* Thin accent hairline to bookend the dark Hero band above */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="mx-auto max-w-[90rem]">
        {/* Closing CTA — stretches the full width, matching the navbar */}
        <div className="max-w-none">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            Ready when you are
          </p>
          <h2 className="mt-3 font-editorial text-[40px] leading-[1.1] text-ink sm:text-[56px]">
            Ready for the <em className="italic">future</em> of autonomous
            system for healthcare operations?
          </h2>
          <button
            onClick={onBookDemo}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-medium text-white shadow-[0_16px_40px_-16px_rgba(10,26,94,0.5)] transition-colors hover:bg-accent"
          >
            Book a Demo
            <BsArrowRight className="text-xs" aria-hidden="true" />
          </button>
        </div>

        {/* Link columns clustered on the left, logo + LinkedIn set apart on the right */}
        <div className="mt-32 flex flex-col gap-12 sm:flex-row sm:items-start sm:justify-between">
          <div className="grid grid-cols-1 gap-y-12 sm:w-[36rem] sm:grid-cols-3 sm:gap-x-16">
            <div>
              <p className="text-sm font-medium text-ink">Product</p>
              <ul className="mt-4 flex flex-col gap-3">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/#") ? (
                      
                        href={link.href}
                        className="text-sm text-ink-soft transition-colors hover:text-ink"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-ink-soft transition-colors hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-medium text-ink">Company</p>
              <ul className="mt-4 flex flex-col gap-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/#") ? (
                      
                        href={link.href}
                        className="text-sm text-ink-soft transition-colors hover:text-ink"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-ink-soft transition-colors hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-medium text-ink">Support</p>
              <ul className="mt-4 flex flex-col gap-3 text-sm text-ink-soft">
                <li>
                  
                    href="mailto:hello@operinlabs.com"
                    className="transition-colors hover:text-ink"
                  >
                    hello@operinlabs.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 sm:items-end">
            <img src="/logo.png" alt="OperinLabs" className="h-8 w-auto" />
            
              href="https://www.linkedin.com/company/operinlabs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="OperinLabs on LinkedIn"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-accent/40 hover:text-accent"
            >
              <BsLinkedin aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-soft">
            © {new Date().getFullYear()} OperinLabs. All rights reserved.
          </p>
          
            href="#top"
            className="text-xs font-medium text-ink-soft transition-colors hover:text-ink"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
