import Hero from "../components/Hero";
import Product from "../components/Product";
import Thesis from "../components/Thesis";

interface HomeProps {
  onBookDemo: () => void;
}

export default function Home({ onBookDemo }: HomeProps) {
  return (
    <>
      <Hero onBookDemo={onBookDemo} />
      <Product />
      <Thesis />
    </>
  );
}
