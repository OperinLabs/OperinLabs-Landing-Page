import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BookDemoModal from "./components/BookDemoModal";

function App() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg font-inter">
      <Navbar onBookDemo={() => setDemoOpen(true)} />
      <Hero onBookDemo={() => setDemoOpen(true)} />

      <AnimatePresence>
        {demoOpen && <BookDemoModal onClose={() => setDemoOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
