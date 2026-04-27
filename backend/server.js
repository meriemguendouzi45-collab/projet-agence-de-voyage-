require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

// ✅ FIX CORS (allow all vercel domains)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://projet-agence-de-voyage-nfynl2tqg.vercel.app"  
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.static("dist"));

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/trips", require("./routes/tripRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/subscribers", require("./routes/subscriberRoutes"));

// ✅ PORT (important for Render)
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

console.log("JWT:", process.env.JWT_SECRET);