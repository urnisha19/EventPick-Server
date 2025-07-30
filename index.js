const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./utils/connectDB");

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for your frontend origins BEFORE all routes
app.use(
  cors({
    origin: ["https://event-pick.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);

// Connect to MongoDB
connectDB();

// Parse incoming JSON requests
app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const eventRoutes = require("./routes/eventRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

app.use("/api", userRoutes);
app.use("/admin", adminRoutes);
app.use("/api", eventRoutes);
app.use("/api", bookingRoutes);
app.use("/api", reviewRoutes);

// Static files (uploads)
app.use("/uploads", express.static("uploads"));

// Test route to verify CORS
app.get(
  "/test-cors",
  cors({ origin: "https://event-pick.vercel.app" }),
  (req, res) => {
    res.json({ message: "CORS is configured correctly!" });
  }
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${port}`);
});
