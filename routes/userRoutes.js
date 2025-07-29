const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken.js");
const { saveUser } = require("../controllers/userController.jsx"); // Controller function to save or update user data in the database

// Route to create or update a user in the database.
router.post("/user", verifyToken, saveUser);

// Route to get user data by email. 
router.get("/user/:email", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error while fetching user" });
  }
});

module.exports = router;
