import { useState } from "react";
import { motion } from "framer-motion";
import { BsCheck2 } from "react-icons/bs";
import TrustIndicators from "../components/TrustIndicators";

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

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left half: off-white, Sully-style content */}
      <div className="bg-bg px-6 pb-16 pt-36 sm:px-14 sm:pt-40 lg:pt-44">
        <div className="mx-auto max-w-xl">
          <h1 className="font-editorial font-medium text-ink text-[32px] sm:text-[40px] leading-[1.1] tracking-[-0.01em]">
            See OperinLabs in Action
          </h1>
          <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-ink-soft">
            Learn how OperinLabs saves your front desk hours every week
            while making sure no patient call goes unanswered.
          </p>

          <div className="mt-10 rounded-2xl border border-line bg-white p-8">
            <div className="flex gap-10">
              <div>
                <p className="font-editorial text-3xl text-accent">3.5 Hrs</p>
                <p className="mt-1 text-sm text-ink-soft">
                  fewer hours on front-desk calls, weekly
                </p>
              </div>
              <div>
                <p className="font-editorial text-3xl text-accent">40%</p>
                <p className="mt-1 text-sm text-ink-soft">
                  of missed calls recovered during pilot
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-line pt-6">
              <p className="text-[15px] leading-relaxed text-ink">
                "OperinLabs picked up calls we would've otherwise missed
                after hours — patients stopped falling through the cracks."
              </p>
              <p className="mt-3 text-sm text-ink-soft">
                Front desk lead, pilot hospital in Assam
              </p>
            </div>
          </div>

          <div className="mt-12 border-t border-line pt-8">
            <TrustIndicators />
          </div>
        </div>
      </div>

      {/* Right half: white, form */}
      <div className="border-t border-line bg-white px-6 pb-16 pt-16 sm:px-14 sm:pt-24 lg:border-l lg:border-t-0 lg:pt-44">
        <div className="mx-auto max-w-md">
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="py-6"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
                <BsCheck2 className="text-xl" aria-hidden="true" />
              </div>
              <h2 className="font-editorial text-2xl text-ink mb-3">
                You're on the list.
              </h2>
              <p className="text-ink-soft text-sm leading-relaxed">
                Thanks, {form.name.split(" ")[0]} — we'll reach out at{" "}
                {form.email} within one business day to set up your demo.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <h2 className="font-editorial font-medium text-ink text-[28px] sm:text-[32px] leading-[1.15]">
                Tell us how we can help
              </h2>
              <p className="text-ink-soft text-sm mt-2 mb-8">
                We'll be in touch within 60 minutes.
              </p>

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

                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 0.98 }}
                    whileTap={{ scale: 0.96 }}
                    type="submit"
                    disabled={status === "submitting"}
                    className="rounded-xl bg-ink px-7 py-3.5 text-white text-sm font-medium transition-colors duration-200 hover:bg-accent disabled:opacity-60"
                  >
                    {status === "submitting" ? "Submitting..." : "Request Demo"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
