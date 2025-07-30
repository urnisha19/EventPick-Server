const express = require("express");
const router = express.Router();

// Middleware to verify token for protected routes
const verifyToken = require("../middlewares/verifyToken.js");

// Controller functions to handle user-related operations
const {
  saveUser,
  getUser,
  updateUser,
} = require("../controllers/userController");

// Route to create or update a user in the database
router.post("/user", verifyToken, saveUser);

// Route to retrieve a user's profile by email
router.get("/user/:email", verifyToken, getUser);

// Route to update a user's profile by email
router.put("/user/:email", verifyToken, updateUser);

module.exports = router;
