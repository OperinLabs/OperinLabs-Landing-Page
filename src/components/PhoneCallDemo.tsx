import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BsCheck2,
  BsWhatsapp,
  BsTelephoneInbound,
  BsTelephoneOutbound,
  BsExclamationTriangleFill,
} from "react-icons/bs";

interface Caption {
  speaker: "patient" | "bot";
  text: string;
}

interface CallScenario {
  type: string;
  direction: "inbound" | "outbound";
  patientName: string;
  patientLocation: string;
  phone: string;
  captions: Caption[];
  outcome: string;
  outcomeTone: "success" | "alert";
  channelChip?: string;
}

const SCENARIOS: CallScenario[] = [
  {
    type: "Booking",
    direction: "inbound",
    patientName: "Rahul",
    patientLocation: "Silchar",
    phone: "+91 98••• ••213",
    captions: [
      { speaker: "patient", text: "I need to see a general physician, any slot works." },
      { speaker: "bot", text: "I have tomorrow at 4:00 PM with Dr. Sharma — shall I book that?" },
      { speaker: "patient", text: "Yes, that works." },
      { speaker: "bot", text: "Booked. You'll get a confirmation shortly." },
    ],
    outcome: "Appointment booked — Dr. Sharma, 4:00 PM",
    outcomeTone: "success",
    channelChip: "Confirmation sent via WhatsApp",
  },
  {
    type: "Rescheduling",
    direction: "inbound",
    patientName: "Preeti",
    patientLocation: "Guwahati",
    phone: "+91 90••• ••847",
    captions: [
      { speaker: "patient", text: "I can't make my 5 PM appointment today, can we move it?" },
      { speaker: "bot", text: "No problem — Dr. Bora is free tomorrow at 11 AM. Does that work?" },
      { speaker: "patient", text: "Yes, tomorrow works better." },
      { speaker: "bot", text: "Rescheduled — your old slot is released for someone else." },
    ],
    outcome: "Rescheduled to tomorrow, 11:00 AM",
    outcomeTone: "success",
    channelChip: "Update sent via WhatsApp",
  },
  {
    type: "Reminder",
    direction: "outbound",
    patientName: "Priyanka",
    patientLocation: "Guwahati",
    phone: "+91 88••• ••526",
    captions: [
      {
        speaker: "bot",
        text: "Hi Priyanka, this is a reminder for your appointment tomorrow at 10 AM with Dr. Das.",
      },
      { speaker: "patient", text: "Thanks for reminding me, I'll be there." },
      { speaker: "bot", text: "Great — I'll also drop the details on WhatsApp." },
    ],
    outcome: "Reminder confirmed",
    outcomeTone: "success",
    channelChip: "Details sent via WhatsApp",
  },
  {
    type: "Follow-up",
    direction: "outbound",
    patientName: "Anjali",
    patientLocation: "Jorhat",
    phone: "+91 91••• ••338",
    captions: [
      { speaker: "bot", text: "Hi Anjali, checking in after your visit — how's the recovery going?" },
      { speaker: "patient", text: "Actually the pain hasn't gone down, it's worse today." },
      { speaker: "bot", text: "I understand — flagging this for Dr. Sharma's team to call you back today." },
    ],
    outcome: "Escalated to clinical team",
    outcomeTone: "alert",
  },
];

type Phase = "ringing" | "connecting" | "live" | "outcome";

export default function PhoneCallDemo() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("ringing");
  const [captionIndex, setCaptionIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scenario = SCENARIOS[scenarioIndex];
  const activeCaption = scenario.captions[captionIndex];

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    setPhase("ringing");
    setCaptionIndex(0);
    setElapsed(0);
    return clearTimers;
  }, [scenarioIndex]);

  useEffect(() => {
    if (phase === "ringing") {
      const t = setTimeout(() => setPhase("connecting"), 1300);
      timers.current.push(t);
      return () => clearTimeout(t);
    }
    if (phase === "connecting") {
      const t = setTimeout(() => setPhase("live"), 900);
      timers.current.push(t);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "live" && !intervalRef.current) {
      intervalRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    }
    if (phase === "outcome" && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "live") return;
    if (captionIndex >= scenario.captions.length) {
      const t = setTimeout(() => setPhase("outcome"), 400);
      timers.current.push(t);
      return () => clearTimeout(t);
    }
    const text = scenario.captions[captionIndex]?.text ?? "";
    const hold = 1600 + text.length * 20;
    const t = setTimeout(() => setCaptionIndex((c) => c + 1), hold);
    timers.current.push(t);
    return () => clearTimeout(t);
  }, [phase, captionIndex, scenario.captions]);

  useEffect(() => {
    if (phase !== "outcome") return;
    const t = setTimeout(() => {
      setScenarioIndex((i) => (i + 1) % SCENARIOS.length);
    }, 2600);
    timers.current.push(t);
    return () => clearTimeout(t);
  }, [phase]);

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");
  const isLive = phase === "live" || phase === "outcome";

  return (
    <div className="relative w-full max-w-[540px] mx-auto">
      <div className="relative rounded-[28px] border border-mono-line bg-white p-8 shadow-xl shadow-black/5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-mono-line pb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={scenario.patientName + scenario.type}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2.5 text-left"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mono-bg text-xs font-medium text-mono-soft">
                {scenario.patientName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-mono-ink">
                  {scenario.patientName} · {scenario.patientLocation}
                </p>
                <p className="flex items-center gap-1 text-xs text-mono-soft">
                  {scenario.direction === "inbound" ? (
                    <BsTelephoneInbound className="text-[11px]" aria-hidden="true" />
                  ) : (
                    <BsTelephoneOutbound className="text-[11px]" aria-hidden="true" />
                  )}
                  {scenario.phone}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="text-right">
            <span className="inline-block rounded-full bg-mono-bg px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-mono-soft">
              {scenario.type} call
            </span>
            <p className="mt-1.5 text-xs font-medium text-mono-soft">
              {phase === "ringing" && "Ringing…"}
              {phase === "connecting" && "Connecting…"}
              {isLive && `${mm}:${ss}`}
            </p>
          </div>
        </div>

        {/* Waveform + captions */}
        <div className="mt-5 flex min-h-[280px] flex-col items-center justify-center gap-7 text-center">
          <div className="flex h-14 items-center gap-1">
            {Array.from({ length: 11 }).map((_, i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full bg-mono-ink"
                animate={
                  isLive
                    ? { height: [6, 10 + ((i * 7) % 34), 6] }
                    : { height: 6 }
                }
                transition={{
                  duration: 0.9 + (i % 4) * 0.15,
                  repeat: isLive ? Infinity : 0,
                  ease: "easeInOut",
                  delay: i * 0.05,
                }}
              />
            ))}
          </div>

          {(phase === "ringing" || phase === "connecting") && (
            <p className="text-sm font-medium text-mono-soft">
              {phase === "ringing" ? "Incoming call…" : "Connecting…"}
            </p>
          )}

          {phase === "live" && activeCaption && (
            <AnimatePresence mode="wait">
              <motion.div
                key={captionIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="max-w-sm"
              >
                <p className="text-xs font-medium text-mono-soft">
                  {activeCaption.speaker === "bot" ? "OperinLabs" : scenario.patientName}
                </p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-mono-ink">
                  {activeCaption.text}
                </p>
              </motion.div>
            </AnimatePresence>
          )}

          {phase === "outcome" && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col items-center gap-2"
            >
              <span
                className={
                  scenario.outcomeTone === "success"
                    ? "inline-flex items-center gap-1.5 rounded-full bg-mono-bg px-3 py-1.5 text-xs font-medium text-mono-ink"
                    : "inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700"
                }
              >
                {scenario.outcomeTone === "success" ? (
                  <BsCheck2 className="text-[13px]" aria-hidden="true" />
                ) : (
                  <BsExclamationTriangleFill className="text-[13px]" aria-hidden="true" />
                )}
                {scenario.outcome}
              </span>

              {scenario.channelChip && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
                  <BsWhatsapp className="text-[13px]" aria-hidden="true" />
                  {scenario.channelChip}
                </span>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
