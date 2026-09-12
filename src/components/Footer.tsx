import { Link } from "react-router-dom";
import { BsArrowRight, BsEnvelope, BsTelephone, BsGeoAlt, BsLinkedin } from "react-icons/bs";

interface FooterProps {
  onBookDemo: () => void;
}

const productLinks = [
  { label: "AI Receptionist", href: "/#product" },
  { label: "AI Pharmacist", href: "/#product" },
  { label: "AI Diagnostic Consultant", href: "/#product" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Thesis", href: "/#our-thesis" },
  { label: "Book a Demo", href: "/book-a-demo" },
];

export default function Footer({ onBookDemo }: FooterProps) {
  return (
    <footer className="bg-bg px-6 pb-10 pt-40">
      <div className="mx-auto max-w-[90rem]">
        {/* Closing CTA — stretches the full width, matching the navbar */}
        <div className="max-w-none">
          <h2 className="font-editorial text-[40px] leading-[1.1] text-ink sm:text-[56px]">
            Ready for the <em className="italic">future</em> of autonomous
            system for healthcare operations?
          </h2>
          <button
            onClick={onBookDemo}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-accent"
          >
            Book a Demo
            <BsArrowRight className="text-xs" aria-hidden="true" />
          </button>
        </div>

        {/* Link columns clustered on the left, logo set apart on the right */}
        <div className="mt-32 flex flex-col gap-12 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-12 sm:flex-row sm:gap-16">
            <div>
              <p className="text-sm font-medium text-ink">Product</p>
              <ul className="mt-4 flex flex-col gap-3">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/#") ? (
                      <a
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
                      <a
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
                <li className="flex items-center gap-2">
                  <BsEnvelope className="text-ink-soft/70" aria-hidden="true" />
                  <a
                    href="mailto:hello@operinlabs.com"
                    className="transition-colors hover:text-ink"
                  >
                    hello@operinlabs.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <BsTelephone className="text-ink-soft/70" aria-hidden="true" />
                  <a
                    href="tel:+917637918344"
                    className="transition-colors hover:text-ink"
                  >
                    +91 76379 18344
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <BsGeoAlt className="text-ink-soft/70" aria-hidden="true" />
                  Maniram Dewan Rd, Guwahati 03 (Assam)
                </li>
              </ul>
            </div>
          </div>

          <img src="/logo.png" alt="OperinLabs" className="h-10 w-auto" />
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-soft">
            © {new Date().getFullYear()} OperinLabs. All rights reserved.
          </p>
          <a
            href="https://www.linkedin.com/company/operinlabs"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="OperinLabs on LinkedIn"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:text-ink"
          >
            <BsLinkedin aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
