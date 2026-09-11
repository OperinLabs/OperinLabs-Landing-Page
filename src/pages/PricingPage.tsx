import Pricing from "../components/Pricing";

interface PricingPageProps {
  onBookDemo: () => void;
}

export default function PricingPage({ onBookDemo }: PricingPageProps) {
  return (
    <div className="pt-20">
      <Pricing onBookDemo={onBookDemo} />
    </div>
  );
}
