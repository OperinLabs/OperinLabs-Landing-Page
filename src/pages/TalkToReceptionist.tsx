import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsSend, BsCheck2 } from "react-icons/bs";

interface ChatMessage {
  sender: "bot" | "user";
  text: string;
}

interface LeadData {
  name: string;
  phone: string;
  clinic: string;
  requestType: string;
  time: string;
}

// ---------------------------------------------------------------------------
// SUBMISSION ENDPOINT — this posts nowhere yet. Create a form at
// https://formspree.io (or reuse the one wired up for the Book a Demo page)
// and paste its endpoint URL below to start receiving real conversations.
// ---------------------------------------------------------------------------
const FORM_ENDPOINT = "https://formspree.io/f/mgaerdao";

type Step =
  | "name"
  | "phone"
  | "clinic"
  | "requestType"
  | "time"
  | "submitting"
  | "success"
  | "error";

export default function TalkToReceptionist() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "Hi, I'm the OperinLabs AI Receptionist. What's your name?",
    },
  ]);
  const [step, setStep] = useState<Step>("name");
  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);
  const [data, setData] = useState<LeadData>({
    name: "",
    phone: "",
    clinic: "",
    requestType: "",
    time: "",
  });
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, step]);

  useEffect(() => {
    if (step !== "requestType" && step !== "submitting" && step !== "success") {
      inputRef.current?.focus();
    }
  }, [step]);

  function pushBot(text: string) {
    setMessages((m) => [...m, { sender: "bot", text }]);
  }
  function pushUser(text: string) {
    setMessages((m) => [...m, { sender: "user", text }]);
  }

  async function submit(final: LeadData) {
    setStep("submitting");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(final),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStep("success");
    } catch {
      pushBot(
        "That didn't go through on my end — mind trying again, or reach us directly at hello@operinlabs.com?"
      );
      setStep("error");
    }
  }

  function handleSend() {
    const value = input.trim();
    if (!value) return;

    if (step === "name") {
      pushUser(value);
      const next = { ...data, name: value };
      setData(next);
      setInput("");
      setInputError(null);
      setTimeout(() => {
        pushBot(
          `Nice to meet you, ${value.split(" ")[0]}. What's the best phone number to reach you on?`
        );
        setStep("phone");
      }, 400);
      return;
    }

    if (step === "phone") {
      if (!/^[0-9+\-\s]{7,}$/.test(value)) {
        setInputError("That doesn't look like a valid phone number.");
        return;
      }
      pushUser(value);
      const next = { ...data, phone: value };
      setData(next);
      setInput("");
      setInputError(null);
      setTimeout(() => {
        pushBot("Thanks. Which clinic or hospital are you calling on behalf of?");
        setStep("clinic");
      }, 400);
      return;
    }

    if (step === "clinic") {
      pushUser(value);
      const next = { ...data, clinic: value };
      setData(next);
      setInput("");
      setInputError(null);
      setTimeout(() => {
        pushBot("Got it. Would you like a quick callback, or a full walkthrough demo?");
        setStep("requestType");
      }, 400);
      return;
    }

    if (step === "time" || step === "error") {
      pushUser(value);
      const next = { ...data, time: value };
      setData(next);
      setInput("");
      setInputError(null);
      setTimeout(() => {
        pushBot("Perfect — I've got everything I need. Requesting that now…");
        submit(next);
      }, 400);
      return;
    }
  }

  function chooseRequestType(type: string) {
    pushUser(type);
    const next = { ...data, requestType: type };
    setData(next);
    setTimeout(() => {
      pushBot(
        "When's a good time to reach you? (e.g. weekday mornings, after 6pm, anytime)"
      );
      setStep("time");
    }, 400);
  }

  if (step === "success") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
            <BsCheck2 className="text-2xl" aria-hidden="true" />
          </div>
          <h1 className="mt-6 font-editorial text-4xl text-ink sm:text-5xl">
            Thank You
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-ink-soft">
            We've got your details, {data.name.split(" ")[0]} — our team will
            get back to you within 60 minutes.
          </p>
        </motion.div>
      </div>
    );
  }

  const isTyping = step !== "requestType" && step !== "submitting";

  return (
    <div className="flex min-h-screen flex-col bg-bg px-6 pb-8 pt-28">
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col">
        <div className="mb-5 text-center">
          <h1 className="font-editorial text-2xl text-ink sm:text-3xl">
            Talk to your Receptionist
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            Chat here to book a callback or a demo — no forms to fill.
          </p>
        </div>

        <div className="flex min-h-[420px] flex-1 flex-col gap-3 overflow-y-auto rounded-2xl border border-line bg-white p-5">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={m.sender === "bot" ? "flex justify-start" : "flex justify-end"}
              >
                <div
                  className={
                    m.sender === "bot"
                      ? "max-w-[80%] rounded-2xl rounded-bl-sm bg-accent-soft px-4 py-2.5 text-left text-sm leading-relaxed text-ink"
                      : "max-w-[80%] rounded-2xl rounded-br-sm bg-ink px-4 py-2.5 text-left text-sm leading-relaxed text-white"
                  }
                >
                  {m.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {step === "requestType" && (
            <div className="flex justify-start gap-2 pt-1">
              <button
                onClick={() => chooseRequestType("Quick callback")}
                className="rounded-full border border-line bg-white px-4 py-2 text-xs font-medium text-ink transition-colors hover:bg-accent-soft"
              >
                Quick callback
              </button>
              <button
                onClick={() => chooseRequestType("Full demo")}
                className="rounded-full border border-line bg-white px-4 py-2 text-xs font-medium text-ink transition-colors hover:bg-accent-soft"
              >
                Full demo
              </button>
            </div>
          )}

          {step === "submitting" && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-accent-soft px-4 py-2.5 text-sm text-ink">
                Sending your request…
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {isTyping && (
          <div className="mt-4">
            {inputError && (
              <p className="mb-1.5 text-xs text-red-500">{inputError}</p>
            )}
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your reply…"
                className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none focus:border-ink/30"
              />
              <button
                onClick={handleSend}
                aria-label="Send"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink text-white transition-colors hover:bg-accent"
              >
                <BsSend className="text-sm" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
