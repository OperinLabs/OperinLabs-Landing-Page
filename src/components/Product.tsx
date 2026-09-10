import { motion } from "framer-motion";
import { BsGlobe2, BsCalendarCheck, BsBellFill, BsTelephoneInbound } from "react-icons/bs";

const features = [
  {
    icon: BsGlobe2,
    heading: "Speaks your patients' language",
    body: "Every call is answered in Assamese, Bengali, Hindi, or English — whichever the caller starts in. No switching, no waiting for a translator.",
  },
  {
    icon: BsCalendarCheck,
    heading: "Books straight into your schedule",
    body: "OperinLabs checks real availability and confirms a slot on the call itself, so appointments land on your calendar without a front-desk handoff.",
  },
  {
    icon: BsBellFill,
    heading: "Sends reminders that cut no-shows",
    body: "Patients get a call or message ahead of their visit, in the language they booked in — fewer empty slots, less time re-filling them.",
  },
  {
    icon: BsTelephoneInbound,
    heading: "Calls back every missed patient",
    body: "After hours or during a rush, OperinLabs logs the missed call and calls the patient back — so a busy morning never costs you a booking.",
  },
];

export default function Product() {
  return (
    <section id="product" className="scroll-mt-24 bg-bg px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-xl"
        >
          <h2 className="font-editorial font-medium text-ink text-[32px] sm:text-[40px] leading-[1.1] tracking-[-0.01em]">
            One line. Every patient handled.
          </h2>
          <p className="mt-4 max-w-[50ch] text-base leading-relaxed text-ink-soft">
            OperinLabs sits on your clinic's phone line and does the work a
            second front-desk hire would — without the training, the shifts,
            or the days off.
          </p>
        </motion.div>

        <div className="mt-16 flex flex-col gap-14 sm:gap-16">
          {features.map(({ icon: Icon, heading, body }, i) => (
            <motion.div
              key={heading}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`flex flex-col gap-6 border-t border-line pt-10 sm:flex-row sm:items-start ${
                i % 2 === 1 ? "sm:flex-row-reverse sm:text-right" : ""
              }`}
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent ${
                  i % 2 === 1 ? "sm:ml-6" : "sm:mr-6"
                }`}
              >
                <Icon className="text-lg" aria-hidden="true" />
              </div>
              <div className="max-w-[46ch]">
                <h3 className="font-editorial text-2xl text-ink">{heading}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
