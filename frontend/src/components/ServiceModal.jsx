import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Input, Select } from "./Inputs";
import API from "../services/api";

export default function ServiceModal({ type, close }) {
  const { user } = useContext(AuthContext);

  const initialState = {
    from: "",
    to: "",
    airline: "",
    date: "",
    passengers: "",
    class: "",
    destination: "",
    hotel: "",
    hotelType: "",
    checkin: "",
    checkout: "",
    guests: "",
    rooms: "",
    country: "",
    passport: "",
    budget: "",
    duration: "",
    style: "",
    coverage: "",
  };

  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(initialState);
  }, [type]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ FIXED SUBMIT (ONLY ONE FUNCTION)
  const submit = async () => {
    if (!user) return alert("Login first");

    if (type === "flight" && (!form.from || !form.to || !form.date)) {
      return alert("Fill all flight fields");
    }

    setLoading(true);

    try {
      await API.post("/services", {
        ...form,
        type,
        name: user.name,
        email: user.email,
      });

      alert("✅ Request sent!");
      close();
    } catch (err) {
      console.log(err);
      alert("❌ Error");
    }

    setLoading(false);
  };

  const destinations = [
    "Paris, France","Rome, Italy","Santorini, Greece","Dubai, UAE",
    "Bali, Indonesia","Maldives","London, UK","New York, USA",
    "Tokyo, Japan","Istanbul, Turkey","Barcelona, Spain",
    "Cairo, Egypt","Marrakech, Morocco","Singapore","Sydney, Australia"
  ];

  const hotels = [
    "Hilton","Marriott","Sheraton","Ritz Carlton","Ibis","Hyatt"
  ];

  const airlines = [
    "Air Algérie",
    "Turkish Airlines",
    "Air France",
    "Emirates",
    "Qatar Airways",
    "Lufthansa"
  ];

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
      <div className="bg-[#0b1220] p-6 rounded-xl w-[550px] text-white">

        <button onClick={close} className="float-right text-xl">✕</button>
        <h2 className="text-xl mb-4 capitalize">{type}</h2>

        {/* ✈️ FLIGHT */}
        {type === "flight" && (
          <div className="grid grid-cols-2 gap-3">
            <Input name="from" label="From" value={form.from} onChange={handleChange} />
            <Select name="to" label="To" value={form.to} onChange={handleChange} options={destinations} />
            <Select name="airline" label="Airline" value={form.airline} onChange={handleChange} options={airlines} />
            <Input name="date" label="Departure Date" type="date" value={form.date} onChange={handleChange} />
            <Input name="passengers" label="Passengers" type="number" value={form.passengers} onChange={handleChange} />
            <Select name="class" label="Class" value={form.class} onChange={handleChange} options={["Economy","Business","First Class"]} />
          </div>
        )}

        {/* 🏨 HOTEL */}
        {type === "hotel" && (
          <div className="grid grid-cols-2 gap-3">
            <Select name="destination" label="Destination" value={form.destination} onChange={handleChange} options={destinations} />
            <Select name="hotel" label="Hotel" value={form.hotel} onChange={handleChange} options={hotels} />
            <Select name="hotelType" label="Type" value={form.hotelType} onChange={handleChange} options={["Standard","Luxury","All Inclusive","Budget"]} />
            <Input name="checkin" label="Check-in" type="date" value={form.checkin} onChange={handleChange} />
            <Input name="checkout" label="Check-out" type="date" value={form.checkout} onChange={handleChange} />
            <Input name="guests" label="Guests" value={form.guests} onChange={handleChange} />
            <Input name="rooms" label="Rooms" value={form.rooms} onChange={handleChange} />
          </div>
        )}

        {/* 🛂 VISA */}
        {type === "visa" && (
          <div className="grid grid-cols-2 gap-3">
            <Input name="country" label="Country" value={form.country} onChange={handleChange} />
            <Input name="passport" label="Passport" value={form.passport} onChange={handleChange} />
            <Input name="date" label="Travel Date" type="date" value={form.date} onChange={handleChange} />
          </div>
        )}

        {/* 🌍 CUSTOM */}
        {type === "custom" && (
          <div className="grid grid-cols-2 gap-3">
            <Input name="destination" label="Destination" value={form.destination} onChange={handleChange} />
            <Input name="budget" label="Budget" value={form.budget} onChange={handleChange} />
            <Input name="duration" label="Duration" value={form.duration} onChange={handleChange} />
            <Input name="style" label="Style" value={form.style} onChange={handleChange} />
          </div>
        )}

        {/* 🛡️ INSURANCE */}
        {type === "insurance" && (
          <div className="grid grid-cols-2 gap-3">
            <Input name="destination" label="Destination" value={form.destination} onChange={handleChange} />
            <Input name="duration" label="Days" value={form.duration} onChange={handleChange} />
            <Input name="passengers" label="Travelers" value={form.passengers} onChange={handleChange} />
            <Select name="coverage" label="Coverage" value={form.coverage} onChange={handleChange} options={["Basic","Standard","Premium"]} />
          </div>
        )}

        <button
          onClick={submit}
          className="mt-5 w-full bg-cyan-500 p-3 rounded hover:bg-cyan-600"
        >
          {loading ? "Sending..." : "Submit"}
        </button>

      </div>
    </div>
  );
}