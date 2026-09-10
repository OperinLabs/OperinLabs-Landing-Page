import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineX } from "react-icons/hi";

interface BookDemoModalProps {
  onClose: () => void;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  organization: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  organization: "",
};

// ---------------------------------------------------------------------------
// SUBMISSION ENDPOINT
// ---------------------------------------------------------------------------
// This form currently submits to nothing but its own local "success" state,
// so it works the moment you deploy — nothing breaks — but no one actually
// receives the leads yet. To start receiving real submissions, do ONE of:
//
// OPTION A — Formspree (fastest, no backend code):
//   1. Create a free form at https://formspree.io
//   2. Replace FORM_ENDPOINT below with your Formspree endpoint URL
//   3. Uncomment the fetch() call in handleSubmit
//
// OPTION B — Netlify Forms (if hosting on Netlify):
//   1. Add `data-netlify="true"` and a hidden `form-name` input to the <form>
//   2. Netlify auto-detects and stores submissions in your dashboard
//
// OPTION C — Your own API:
//   Point FORM_ENDPOINT at your backend route and keep the fetch() call.
// ---------------------------------------------------------------------------
const FORM_ENDPOINT = "https://formspree.io/f/mgaerdao";

export default function BookDemoModal({ onClose }: BookDemoModalProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );

  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email.";
    }
    if (!form.phone.trim()) next.phone = "Please enter a contact number.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-demo-title"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl bg-bg border border-line p-8 shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 text-ink-soft hover:text-ink transition-colors"
        >
          <HiOutlineX className="text-xl" />
        </button>

        {status === "success" ? (
          <div className="py-6 text-center">
            <h2 className="font-editorial text-3xl text-ink mb-3">
              You're on the list.
            </h2>
            <p className="text-ink-soft text-sm leading-relaxed">
              Thanks, {form.name.split(" ")[0]} — we'll reach out at{" "}
              {form.email} within one business day to set up your demo.
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded-xl bg-[#111111] px-6 py-3 text-white text-sm font-medium"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h2
              id="book-demo-title"
              className="font-editorial text-3xl text-ink mb-1"
            >
              Book a Demo
            </h2>
            <p className="text-ink-soft text-sm mb-6">
              Tell us where to reach you — we'll be in touch within one
              business day.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-ink-soft mb-1.5"
                >
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink outline-none focus:border-ink/30 transition-colors"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-ink-soft mb-1.5"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@clinic.com"
                  className="w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink outline-none focus:border-ink/30 transition-colors"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-medium text-ink-soft mb-1.5"
                >
                  Contact number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 00000 00000"
                  className="w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink outline-none focus:border-ink/30 transition-colors"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="organization"
                  className="block text-xs font-medium text-ink-soft mb-1.5"
                >
                  Clinic / hospital name{" "}
                  <span className="text-ink-soft/60">(optional)</span>
                </label>
                <input
                  id="organization"
                  name="organization"
                  type="text"
                  value={form.organization}
                  onChange={handleChange}
                  placeholder="e.g. Silchar Medical Centre"
                  className="w-full rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink outline-none focus:border-ink/30 transition-colors"
                />
              </div>

              {status === "error" && (
                <p className="text-xs text-red-500">
                  Something went wrong. Please try again.
                </p>
              )}

              <motion.button
                whileHover={{ scale: 0.98 }}
                whileTap={{ scale: 0.96 }}
                type="submit"
                disabled={status === "submitting"}
                className="w-full rounded-xl bg-[#111111] px-6 py-3.5 text-white text-sm font-medium disabled:opacity-60"
              >
                {status === "submitting" ? "Submitting..." : "Request Demo"}
              </motion.button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
