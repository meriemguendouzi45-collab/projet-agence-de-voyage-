import { useState } from "react";
import API from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/auth/register", form);

    alert("Account created ✔️");
    window.location.href = "/login";
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 w-80 rounded">

        <input name="name" onChange={handleChange} placeholder="Name" className="border w-full p-2 mb-2" />
        <input name="email" onChange={handleChange} placeholder="Email" className="border w-full p-2 mb-2" />
        <input name="password" type="password" onChange={handleChange} placeholder="Password" className="border w-full p-2 mb-2" />

        <button className="bg-green-500 w-full py-2 text-white">
          Register
        </button>

      </form>
    </div>
  );
}