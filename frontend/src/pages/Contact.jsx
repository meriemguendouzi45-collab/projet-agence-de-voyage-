import { useState } from "react";
import API from "../services/api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/messages", form);

      alert("Message sent ✔️");

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      alert("Error sending message ❌");
    }
  };

  return (
    <div className="bg-[#0b1220] text-white px-6 py-20">

      <h1 className="text-4xl font-bold text-center">
        Get in Touch 📞
      </h1>

      <p className="text-center text-gray-400 mt-3">
        Have questions? We'd love to hear from you.
      </p>

      <div className="grid md:grid-cols-2 gap-10 mt-12 max-w-6xl mx-auto">

        {/* INFO */}
        <div className="space-y-6">
          <h3 className="text-cyan-400 font-bold">Visit Us</h3>
          <p>Beaulieu, Alger</p>

          <h3 className="text-cyan-400 font-bold">Call Us</h3>
          <p>0554 868 511</p>

          <h3 className="text-cyan-400 font-bold">Email</h3>
          <p>meriemguendouzi45@gmail.com</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="bg-black/40 p-6 rounded-xl space-y-4">

          <input name="name" onChange={handleChange} value={form.name} placeholder="Full Name" className="w-full p-3 bg-black rounded" />

          <input name="email" onChange={handleChange} value={form.email} placeholder="Email" className="w-full p-3 bg-black rounded" />

          <input name="phone" onChange={handleChange} value={form.phone} placeholder="Phone" className="w-full p-3 bg-black rounded" />

          <select name="subject" onChange={handleChange} value={form.subject} className="w-full p-3 bg-black rounded">

            <option value="">Select subject</option>
            <option>Booking Inquiry</option>
            <option>Support</option>
            <option>Other</option>

          </select>

          <textarea name="message" onChange={handleChange} value={form.message} placeholder="Message" className="w-full p-3 bg-black rounded" />

          <button className="w-full bg-cyan-500 py-3 rounded">
            Send Message
          </button>

        </form>

      </div>
    </div>
  );
}