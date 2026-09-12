import { Link } from "react-router-dom";

// A logo-only header used on pages that shouldn't show the full nav
// (currently just Book a Demo) — same fixed position as the real
// Navbar's logo, so it doesn't visually jump between pages.
export default function MinimalHeader() {
  return (
    <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 px-6">
      <div className="mx-auto max-w-[90rem]">
        <Link to="/" className="inline-flex items-center select-none">
          <img src="/logo.png" alt="OperinLabs" className="h-8 w-auto" />
        </Link>
      </div>
    </header>
  );
}
