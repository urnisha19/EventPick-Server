// Import required modules
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./utils/connectDB");

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true })); //Allow requests from frontend running on localhost:5173 with credentials
app.use(express.json()); // Middleware to parse incoming JSON payloads

// Import and use user-related routes
const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
