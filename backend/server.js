require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/trips", require("./routes/tripRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/messages", require("./routes/messageRoutes")); 
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/subscribers", require("./routes/subscriberRoutes"));

app.listen(5000, () => console.log("Server running"));
console.log("JWT:", process.env.JWT_SECRET);