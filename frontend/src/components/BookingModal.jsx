import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function BookingModal({ trip, close }) {
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    adults: 1,
    children: 0,
    departureDate: "",
    returnDate: "",
    packageType: "Standard",
  });

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ FIXED FUNCTION
  const submitBooking = async () => {
    const data = JSON.parse(localStorage.getItem("auth"));

    // إذا ماشي login
    if (!data?.token) {
      window.location.href = "/login";
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`, // ✅ FIX TOKEN
        },
        body: JSON.stringify({
          ...form,
          destination: trip?.name || "Custom Trip", // ✅ FIX NAME
        }),
      });

      if (res.ok) {
        setDone(true);
      } else {
        const err = await res.json();
        alert(err.message || "Booking failed ❌");
      }
    } catch (err) {
      console.log(err);
      alert("Server error ❌");
    }

    setLoading(false);
  };

  const Input = ({ label, name, type = "text" }) => (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-400">{label}</label>

      <input
        name={name}
        type={type}
        value={form[name]}
        onChange={handleChange}
        className="bg-white text-black border border-gray-300 p-3 rounded-xl 
        outline-none focus:border-cyan-500 transition"
      />
    </div>
  );

  const Select = ({ label, name, options }) => (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-400">{label}</label>

      <select
        name={name}
        value={form[name]}
        onChange={handleChange}
        className="bg-white text-black border border-gray-300 p-3 rounded-xl outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-[#0b1220] w-[600px] max-w-full p-6 rounded-2xl border border-white/10">

        {/* HEADER */}
        <div className="flex justify-between mb-4">
          <h2 className="text-white text-lg font-semibold">
            Book: {trip?.name || "Trip"} {/* ✅ FIX NAME */}
          </h2>

          <button onClick={close} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        {/* SUCCESS */}
        {done ? (
          <div className="text-center py-10">
            <p className="text-green-400">
              ✔ Booking sent successfully
            </p>
          </div>
        ) : (
          <>
            {/* FORM */}
            <div className="grid grid-cols-2 gap-4">

              <Input label="Full Name" name="name" />
              <Input label="Email" name="email" type="email" />
              <Input label="Phone" name="phone" />

              <Input label="Departure Date" name="departureDate" type="date" />
              <Input label="Return Date" name="returnDate" type="date" />

              <Input label="Adults" name="adults" type="number" />
              <Input label="Children" name="children" type="number" />

              <Select
                label="Package Type"
                name="packageType"
                options={["Standard", "Premium", "VIP"]}
              />
            </div>

            {/* BUTTON */}
            <button
              onClick={submitBooking}
              className="mt-6 w-full bg-cyan-500 text-white py-3 rounded-xl hover:bg-cyan-600 transition"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </>
        )}

      </div>
    </div>
  );
}