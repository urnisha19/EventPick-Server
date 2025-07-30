const express = require("express");
const router = express.Router();
const {
  addAdmin,
  getAllAdmin,
  isAdmin,
  deleteAdmin,
} = require("../controllers/adminController");

const verifyToken = require("../middlewares/verifyToken");

// Add Admin
router.post("/addAdmin",verifyToken, addAdmin);

// Get All Admins
router.get("/allAdmin", verifyToken, getAllAdmin);

// Check if a user is admin
router.get("/isAdmin",verifyToken, isAdmin);

// Delete an Admin
router.delete("/deleteAdmin/:email",verifyToken, deleteAdmin);

module.exports = router;
