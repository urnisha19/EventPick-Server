const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken.js");
const {
  saveUser,
  getUser,
  updateUser,
} = require("../controllers/userController"); // Controller function to save or update user data in the database

router.post("/user", verifyToken, saveUser); // Route to create or update a user in the database.
router.get("/user/:email", verifyToken, getUser); // GET profile
router.put("/user/:email", verifyToken, updateUser); // UPDATE profile

module.exports = router;
