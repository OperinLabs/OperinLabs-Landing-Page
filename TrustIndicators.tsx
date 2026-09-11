import { BsGlobe2, BsClock, BsRobot, BsBuildings } from "react-icons/bs";

const items = [
  { icon: BsGlobe2, label: "Assamese, Bengali, Hindi", "English"},
  { icon: BsClock, label: "24/7 Availability" },
  { icon: BsRobot, label: "AI-Powered Call Answering" },
  { icon: BsBuildings, label: "Piloting in 6+ Hospitals & OPD Clinics" },
];

export default function TrustIndicators() {
  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-x-8 gap-y-3">
      {items.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex items-center gap-2 text-sm font-medium text-ink-soft"
        >
          <Icon aria-hidden="true" className="text-base" />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
