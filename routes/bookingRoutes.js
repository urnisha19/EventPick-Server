const express = require("express");
const router = express.Router();

// Import controller functions for booking operations
const {
  addBooking,
  getBookingByEmail,
  deleteBooking,
} = require("../controllers/bookingController");

// Route to create a new booking
router.post("/bookings", addBooking);

// Route to get bookings by user email
router.get("/bookings/:email", getBookingByEmail);

// Route to delete a booking by its ID
router.delete("/bookings/:id", deleteBooking);

module.exports = router;
