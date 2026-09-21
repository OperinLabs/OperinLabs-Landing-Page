import { useState } from "react";
import { motion } from "framer-motion";
import { BsCheck2, BsGlobe2, BsClock, BsRobot, BsBuildings } from "react-icons/bs";

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

const badges = [
  { icon: BsClock, label: "24/7 Availability" },
  { icon: BsGlobe2, label: "Assamese, Bengali, Hindi, English" },
  { icon: BsRobot, label: "AI-Powered Call Answering" },
  { icon: BsBuildings, label: "Piloting in 5+ Hospitals" },
];

// ---------------------------------------------------------------------------
// SUBMISSION ENDPOINT — this posts nowhere yet. Point FORM_ENDPOINT at
// Formspree, Netlify Forms, or your own API route to start receiving
// real submissions.
// ---------------------------------------------------------------------------
const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

export default function BookDemo() {
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

  // Success takes over the entire page — not just the form card.
  if (status === "success") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center"
        >
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
            <BsCheck2 className="text-2xl" aria-hidden="true" />
          </div>
          <h1 className="font-editorial text-4xl text-ink sm:text-5xl">
            Thank You
          </h1>
          <p className="mt-4 text-ink-soft">
            We will get back to you within 60 minutes.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg lg:flex-row lg:p-6">
      {/* Left: floating gradient panel — inset with rounded corners, not edge-to-edge */}
      <div
        className="relative flex flex-col justify-between overflow-hidden px-8 py-28 sm:px-14 lg:w-[55%] lg:rounded-[32px] lg:py-14"
        style={{
          background:
            "linear-gradient(135deg, #0A1A5E 0%, #0057FF 55%, #6FA0FF 100%)",
        }}
      >
        {/* Frosted stat card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-fit max-w-sm rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md"
        >
          <div className="flex gap-8">
            <div>
              <p className="font-editorial text-2xl text-white">3.5 Hrs</p>
              <p className="mt-1 text-xs text-white/70">
                less on front-desk calls, weekly.
              </p>
            </div>
            <div>
              <p className="font-editorial text-2xl text-white">60%+</p>
              <p className="mt-1 text-xs text-white/70">
                less missed calls, during pilot.
              </p>
            </div>
          </div>
          <div className="mt-5 border-t border-white/20 pt-4">
            <p className="text-sm leading-relaxed text-white/90">
              "OperinLabs picked up every calls we would've otherwise
              missed, I personally, loved the way it takes charge and
              handle calls."
            </p>
            <p className="mt-2 text-xs text-white/60">
              Head of Operations, pilot hospital in Assam
            </p>
          </div>
        </motion.div>

        {/* Big tagline */}
        <div className="mt-14 max-w-lg">
          <h1 className="font-editorial font-medium text-white text-[28px] leading-[1.2] sm:text-[34px]">
            See OperinLabs in Action
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-white/75">
            Learn how OperinLabs saves your front desk hours every week
            while making sure no patient call goes unanswered.
          </p>
        </div>

        {/* Bottom badge row */}
        <div className="mt-14 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/20 pt-6">
          {badges.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-xs font-medium text-white/80"
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: plain background, centered narrow form column */}
      <div className="flex flex-1 items-center justify-center px-6 py-16 sm:px-14">
        <div className="w-full max-w-md">
          <h2 className="font-editorial font-medium text-ink text-[28px] sm:text-[32px] leading-[1.15]">
            Tell us how we can help
          </h2>
          <p className="text-ink-soft text-sm mt-2 mb-8">
            We'll be in touch within one business day.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
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
                  Business email
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
                className="w-full rounded-xl bg-ink px-7 py-3.5 text-center text-white text-sm font-medium transition-colors duration-200 hover:bg-accent disabled:opacity-60"
              >
                {status === "submitting" ? "Submitting..." : "Submit"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
