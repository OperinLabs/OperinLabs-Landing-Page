import { Link } from "react-router-dom";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";

interface FooterProps {
  onBookDemo: () => void;
}

interface FooterLink {
  label: string;
  href: string;
}

const columns: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "AI Receptionist", href: "/#product" },
      { label: "AI Patient Care Coordinator", href: "/#product" },
      { label: "AI Scribe", href: "/#product" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Thesis", href: "/our-thesis" },
    ],
  },
  {
    heading: "Get Started",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Book a Demo", href: "/book-a-demo" },
      { label: "Talk to your Receptionist", href: "/talk-to-receptionist" },
    ],
  },
  {
    heading: "Support",
    links: [{ label: "hello@operinlabs.com", href: "mailto:hello@operinlabs.com" }],
  },
];

function FooterLinkItem({ link }: { link: FooterLink }) {
  const isInternalRoute = link.href.startsWith("/") && !link.href.startsWith("/#");
  const className = "text-sm text-abyss-soft transition-colors hover:text-abyss-ink";

  if (isInternalRoute) {
    return (
      <Link to={link.href} className={className}>
        {link.label}
      </Link>
    );
  }

  return (
    <a href={link.href} className={className}>
      {link.label}
    </a>
  );
}

export default function Footer({ onBookDemo }: FooterProps) {
  return (
    <footer className="relative overflow-hidden bg-abyss px-6 pt-20 pb-10">
      {/* Faint grid texture, same treatment as the Hero band, for a bookend feel */}
      <div className="bg-grid-light pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />

      <div className="relative mx-auto max-w-[90rem]">
        {/* Logo, top-left of the footer block — wrapped in a light chip since
            the brand mark itself is navy and needs contrast on this dark band */}
        <div className="inline-flex rounded-lg bg-white/95 p-2">
          <img src="/logo.png" alt="OperinLabs" className="h-7 w-auto" />
        </div>

        {/* Big closing CTA */}
        <div className="mt-10 max-w-2xl">
          <h2 className="font-editorial text-[36px] leading-[1.1] text-abyss-ink sm:text-[48px]">
            Ready for the <em className="italic">future</em> of autonomous
            healthcare operations?
          </h2>
          <button
            onClick={onBookDemo}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-medium text-white shadow-[0_0_30px_rgba(0,87,255,0.4)] transition-colors hover:bg-[#0048d9]"
          >
            Book a Demo
            <BsArrowRight className="text-xs" aria-hidden="true" />
          </button>
        </div>

        {/* Link columns — Sully-style: four plain columns, no dividers,
            spacing alone does the organizing */}
        <div className="mt-20 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4 sm:gap-x-12">
          {columns.map((column) => (
            <div key={column.heading}>
              <p className="text-xs font-semibold uppercase tracking-wide text-abyss-soft">
                {column.heading}
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterLinkItem link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar — social + copyright */}
        <div className="mt-16 flex flex-col gap-6 border-t border-abyss-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-abyss-soft">
            © {new Date().getFullYear()} OperinLabs. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/company/operinlabs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="OperinLabs on LinkedIn"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-abyss-line text-abyss-soft transition-colors hover:border-accent/40 hover:text-accent"
            >
              <BsLinkedin aria-hidden="true" />
            </a>
            <a
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
