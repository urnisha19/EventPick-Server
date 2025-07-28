const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./utils/connectDB");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
