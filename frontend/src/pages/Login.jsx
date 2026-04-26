import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      login(res.data);

      localStorage.setItem("openBooking", "true");

      window.location.href = "/";
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 w-80 rounded shadow">

        <h2 className="text-xl mb-4 text-center">Login</h2>

        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border w-full p-2 mb-3 text-black"
        />

        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border w-full p-2 mb-3 text-black"
        />

        <button className="bg-blue-500 text-white w-full py-2 rounded">
          Login
        </button>

      </form>
    </div>
  );
}