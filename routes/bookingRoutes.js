const express = require("express");
const router = express.Router();
const {
  addBooking,
  getBookingByEmail,
  deleteBooking,
} = require("../controllers/bookingController");

router.post("/bookings", addBooking);
router.get("/bookings/:email", getBookingByEmail);
router.delete("/bookings/:id", deleteBooking);

module.exports = router;
