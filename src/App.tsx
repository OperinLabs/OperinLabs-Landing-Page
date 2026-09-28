import { useEffect, useLayoutEffect } from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MinimalHeader from "./components/MinimalHeader";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import PricingPage from "./pages/PricingPage";
import BookDemo from "./pages/BookDemo";
import OurThesis from "./pages/OurThesis";
import TalkToReceptionist from "./pages/TalkToReceptionist";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const goToDemo = () => navigate("/book-a-demo");
  const isMinimalHeaderPage =
    location.pathname === "/book-a-demo" ||
    location.pathname === "/talk-to-receptionist";

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen bg-bg font-inter">
      {isMinimalHeaderPage ? <MinimalHeader /> : <Navbar onBookDemo={goToDemo} />}

      <Routes>
        <Route path="/" element={<Home onBookDemo={goToDemo} />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/pricing" element={<PricingPage onBookDemo={goToDemo} />} />
        <Route path="/our-thesis" element={<OurThesis />} />
        <Route path="/book-a-demo" element={<BookDemo />} />
        <Route path="/talk-to-receptionist" element={<TalkToReceptionist />} />
      </Routes>

      {!isMinimalHeaderPage && <Footer onBookDemo={goToDemo} />}
    </div>
  );
}

export default App;
