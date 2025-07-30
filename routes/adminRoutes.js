const express = require("express");
const router = express.Router();
const {
  addAdmin,
  getAllAdmin,
  isAdmin,
  deleteAdmin,
} = require("../controllers/adminController");

// Add Admin
router.post("/addAdmin", addAdmin);

// Get All Admins
router.get("/allAdmin", getAllAdmin);

// Check if a user is admin
router.get("/isAdmin", isAdmin);

// Delete an Admin
router.delete("/deleteAdmin/:email", deleteAdmin);

module.exports = router;
