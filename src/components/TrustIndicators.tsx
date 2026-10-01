import { BsGlobe2, BsClock, BsRobot, BsBuildings } from "react-icons/bs";

interface TrustIndicatorsProps {
  variant?: "light" | "dark";
}

const items = [
  { icon: BsGlobe2, label: "Assamese, Bengali, Hindi, English" },
  { icon: BsClock, label: "24/7 availability" },
  { icon: BsRobot, label: "AI Employees for Healthcare Operations" },
  { icon: BsBuildings, label: "Piloting in 6+ hospitals" },
];

export default function TrustIndicators({ variant = "light" }: TrustIndicatorsProps) {
  const textClass = variant === "dark" ? "text-abyss-soft" : "text-mono-soft";
  const iconClass = variant === "dark" ? "text-abyss-ink" : "text-mono-ink";

  return (
    <div className="flex flex-row flex-wrap items-center gap-x-8 gap-y-3">
      {items.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className={`flex items-center gap-2 text-sm font-medium ${textClass}`}
        >
          <Icon aria-hidden="true" className={`text-base ${iconClass}`} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
