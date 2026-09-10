import { BsGlobe2, BsClock, BsRobot, BsBuildings } from "react-icons/bs";

const items = [
  { icon: BsGlobe2, label: "Assamese, Bengali, Hindi" },
  { icon: BsClock, label: "24/7 availability" },
  { icon: BsRobot, label: "AI-powered call answering" },
  { icon: BsBuildings, label: "Piloting in 6+ hospitals" },
];

export default function TrustIndicators() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-x-8 gap-y-3">
      {items.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex items-center gap-2 text-sm font-medium text-mono-soft"
        >
          <Icon aria-hidden="true" className="text-base text-mono-ink" />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
