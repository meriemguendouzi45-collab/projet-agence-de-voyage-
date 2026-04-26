import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar({ openBooking }) {

  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-0 w-full bg-black/80 text-white z-50">

      <div className="flex justify-between items-center px-6 py-4">

        <h1 className="text-cyan-400 font-bold">Meriem Voyage ✈️</h1>

        {/* DESKTOP */}
        <div className="hidden md:flex gap-6">
          <Link to="/">Home</Link>
          <Link to="/destinations">Destinations</Link>
          <Link to="/tours">Tours</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="hidden md:flex gap-3">

          {!user ? (
            <Link to="/login" className="bg-gray-600 px-3 py-1 rounded">
              Login
            </Link>
          ) : (
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          )}

          <button
            onClick={() => openBooking?.()}
            className="bg-cyan-500 px-3 py-1 rounded"
          >
            Book Now
          </button>

        </div>

        {/* MOBILE BUTTON */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          ☰
        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-4">

          <Link to="/">Home</Link>
          <Link to="/destinations">Destinations</Link>
          <Link to="/tours">Tours</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>

          {!user ? (
            <Link to="/login" className="bg-gray-600 px-3 py-1 rounded w-fit">
              Login
            </Link>
          ) : (
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded w-fit">
              Logout
            </button>
          )}

          <button
            onClick={() => openBooking?.()}
            className="bg-cyan-500 px-3 py-1 rounded w-fit"
          >
            Book Now
          </button>

        </div>
      )}

    </div>
  );
}