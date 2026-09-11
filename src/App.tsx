import { useNavigate, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import PricingPage from "./pages/PricingPage";
import BookDemo from "./pages/BookDemo";

function App() {
  const navigate = useNavigate();
  const goToDemo = () => navigate("/book-a-demo");

  return (
    <div className="min-h-screen bg-bg font-inter">
      <Navbar onBookDemo={goToDemo} />

      <Routes>
        <Route path="/" element={<Home onBookDemo={goToDemo} />} />
        <Route path="/about" element={<AboutUs onBookDemo={goToDemo} />} />
        <Route path="/pricing" element={<PricingPage onBookDemo={goToDemo} />} />
        <Route path="/book-a-demo" element={<BookDemo />} />
      </Routes>
    </div>
  );
}

export default App;
