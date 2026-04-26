import Navbar from "../components/Navbar";
import Destinations from "./Destinations";
import Services from "./Services";
import { useState } from "react";
import API from "../services/api";

import {
  Wallet,
  Headphones,
  ShieldCheck,
  Globe,
  Mail,
} from "lucide-react";

export default function Home({ openBooking }) {

  // ================= STATES =================
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState(1);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchMsg, setSearchMsg] = useState("");
  const [subscribeMsg, setSubscribeMsg] = useState("");

  // ================= SEARCH =================
  const handleSearch = () => {
    setSearchMsg(
      `Searching for ${destination || "Unknown"} (${travelers} travelers)`
    );
  };

  // ================= SUBSCRIBE =================
  const handleSubscribe = async () => {
    try {
      setLoading(true);

      await API.post("/subscribers", { email });

      setSubscribeMsg("✔ Subscribed successfully!");
      setEmail("");
    } catch (err) {
      setSubscribeMsg(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0b1220] text-white">

      <Navbar />

      {/* ================= HERO ================= */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">

        <h1 className="text-5xl md:text-6xl font-bold">
          Unlock the World of Wonders 🌍
        </h1>

        <p className="text-gray-300 mt-5 max-w-2xl">
          Discover stunning places, live unique experiences, and travel the world like never before.
        </p>

        {/* SEARCH BOX */}
        <div className="mt-10 bg-white/10 backdrop-blur-lg p-4 rounded-2xl flex flex-col md:flex-row gap-3">

          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Where to?"
            className="p-3 rounded bg-black/30 outline-none text-white"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-3 rounded bg-black/30 outline-none text-white"
          />

          <input
            value={travelers}
            onChange={(e) => setTravelers(e.target.value)}
            placeholder="Travelers"
            className="p-3 rounded bg-black/30 outline-none w-28 text-white"
          />

          <button
            onClick={handleSearch}
            className="bg-cyan-500 px-6 py-3 rounded-xl font-bold"
          >
            Search
          </button>

        </div>

        {/* SEARCH RESULT */}
        {searchMsg && (
          <p className="mt-4 text-cyan-400 font-medium">
            {searchMsg}
          </p>
        )}

        {/* ================= STATS (FIXED) ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 text-center">

          <div>
            <h2 className="text-3xl font-bold text-cyan-400">150+</h2>
            <p className="text-gray-400">Destinations</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-cyan-400">10,000+</h2>
            <p className="text-gray-400">Happy Travelers</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-cyan-400">50+</h2>
            <p className="text-gray-400">Tour Packages</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-cyan-400">25+</h2>
            <p className="text-gray-400">Years Experience</p>
          </div>

        </div>

      </section>

      {/* ================= SERVICES ================= */}
      <Services />

      {/* ================= DESTINATIONS ================= */}
      <Destinations openBooking={openBooking} />

      {/* ================= WHY US ================= */}
      <section className="px-6 py-20 text-center">

        <h2 className="text-4xl font-bold">Why Travel With Us</h2>
        <p className="text-gray-400 mb-10 mt-2">Your Journey, Our Passion</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white/5 p-8 rounded-2xl">
            <Wallet className="mx-auto text-cyan-400 mb-3" size={32} />
            <h3 className="font-bold">Best Price</h3>
          </div>

          <div className="bg-white/5 p-8 rounded-2xl">
            <Headphones className="mx-auto text-cyan-400 mb-3" size={32} />
            <h3 className="font-bold">24/7 Support</h3>
          </div>

          <div className="bg-white/5 p-8 rounded-2xl">
            <ShieldCheck className="mx-auto text-cyan-400 mb-3" size={32} />
            <h3 className="font-bold">Secure Booking</h3>
          </div>

          <div className="bg-white/5 p-8 rounded-2xl">
            <Globe className="mx-auto text-cyan-400 mb-3" size={32} />
            <h3 className="font-bold">Worldwide Travel</h3>
          </div>

        </div>

      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="px-6 py-20 text-center">

        <div className="max-w-3xl mx-auto bg-white/5 p-10 rounded-2xl">

          <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
            <Mail /> Subscribe to Newsletter
          </h2>

          <div className="mt-6 flex flex-col md:flex-row gap-3 justify-center">

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
              className="p-3 rounded bg-black/40 outline-none w-full md:w-80"
            />

            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="bg-cyan-500 px-6 py-3 rounded-xl font-bold"
            >
              {loading ? "Loading..." : "Subscribe"}
            </button>

          </div>

          {subscribeMsg && (
            <p className="text-green-400 text-sm mt-3">
              {subscribeMsg}
            </p>
          )}

        </div>

      </section>

    </div>
  );
}
