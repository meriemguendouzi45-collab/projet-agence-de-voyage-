import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";

import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Tours from "./pages/Tours";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  const [showBooking, setShowBooking] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  // 🔥 OPEN BOOKING AFTER LOGIN
  useEffect(() => {
    const open = localStorage.getItem("openBooking");
    if (open) {
      setShowBooking(true);
      localStorage.removeItem("openBooking");
    }
  }, []);

  const openBooking = (trip = null) => {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    setSelectedTrip(trip);
    setShowBooking(true);
  };

  return (
    <BrowserRouter>

      <Navbar openBooking={openBooking} />

      {showBooking && (
        <BookingModal
          trip={selectedTrip}
          close={() => setShowBooking(false)}
        />
      )}

      <div className="pt-24">
        <Routes>
          <Route path="/" element={<Home openBooking={openBooking} />} />
          <Route path="/destinations" element={<Destinations openBooking={openBooking} />} />
          <Route path="/tours" element={<Tours openBooking={openBooking} />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
        </Routes>
      </div>

      <Footer />

    </BrowserRouter>
  );
}

export default App;
