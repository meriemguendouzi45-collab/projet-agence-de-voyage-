import axios from "axios";

// ✅ API BASE URL (local + production)
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// 🔐 Attach token automatically
API.interceptors.request.use((req) => {
  const auth = JSON.parse(localStorage.getItem("auth"));

  if (auth?.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }

  return req;
});

export default API;