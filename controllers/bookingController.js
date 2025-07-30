const { getDB } = require("../utils/connectDB");
const { ObjectId } = require("mongodb");

//addBooking
const addBooking = async (req, res) => {
  try {
    const db = getDB();
    const bookingsCollection = db.collection("bookings");

    const {
      eventId,
      eventName,
      date,
      userName,
      email,
      phone,
      tickets,
      paymentMethod,
    } = req.body;

    if (
      !eventId ||
      !eventName ||
      !date ||
      !userName ||
      !email ||
      !phone ||
      !tickets
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await bookingsCollection.insertOne({
      eventId,
      eventName,
      date,
      userName,
      email,
      phone,
      tickets,
      paymentMethod,
      createdAt: new Date(),
    });

    res
      .status(201)
      .json({ message: "Booking successful", bookingId: result.insertedId });
  } catch (err) {
    console.error("Booking POST error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//get booking by email
const getBookingByEmail = async (req, res) => {
  const db = getDB();
  const bookingsCollection = db.collection("bookings");
  const email = req.params.email;

  try {
    const bookings = await bookingsCollection.find({ email }).toArray();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching bookings" });
  }
};

//delete booking
const deleteBooking = async (req, res) => {
  const db = getDB();
  const bookingsCollection = db.collection("bookings");
  const id = req.params.id;

  try {
    const result = await bookingsCollection.deleteOne({
      _id: new ObjectId(id),
    });
    if (result.deletedCount === 1) {
      res.json({ success: true, message: "Booking deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Booking not found" });
    }
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Server error deleting booking" });
  }
};

module.exports = { addBooking, getBookingByEmail, deleteBooking };
