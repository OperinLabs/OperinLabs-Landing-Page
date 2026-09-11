import { useEffect } from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import PricingPage from "./pages/PricingPage";
import BookDemo from "./pages/BookDemo";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const goToDemo = () => navigate("/book-a-demo");
  const isBookDemoPage = location.pathname === "/book-a-demo";

  // Every route change should land at the top of the new page, unless
  // the link was pointing at a specific in-page anchor (e.g. /#product),
  // in which case we scroll to that section instead.
  useEffect(() => {
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
      <Navbar onBookDemo={goToDemo} />

      <Routes>
        <Route path="/" element={<Home onBookDemo={goToDemo} />} />
        <Route path="/about" element={<AboutUs onBookDemo={goToDemo} />} />
        <Route path="/pricing" element={<PricingPage onBookDemo={goToDemo} />} />
        <Route path="/book-a-demo" element={<BookDemo />} />
      </Routes>

      {!isBookDemoPage && <Footer onBookDemo={goToDemo} />}
    </div>
  );
}

export default App;
