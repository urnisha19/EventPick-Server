const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {
  addEvent,
  getAllEvent,
  getEventById,
  editEvent,
  deleteEvent,
} = require("../controllers/eventController");

// Create event (with image upload)
router.post("/events/add", upload.single("eventImage"), addEvent);

// Get all events
router.get("/events", getAllEvent);

// Get event by ID
router.get("/events/:id", getEventById);

// Update event (with image upload)
router.put("/events/:id", upload.single("eventImage"), editEvent);

// Delete event
router.delete("/events/:id", deleteEvent);

module.exports = router;
