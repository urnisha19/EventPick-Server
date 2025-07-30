const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/connectDB");

const addReview = async (req, res) => {
  const db = getDB();
  const { rating, comment } = req.body;
  const bookingId = req.params.id;

  if (!rating || !comment) {
    return res.status(400).json({ message: "Rating and comment required" });
  }

  try {
    const booking = await db
      .collection("bookings")
      .findOne({ _id: new ObjectId(bookingId) });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const review = {
      bookingId: new ObjectId(bookingId),
      eventId: booking.eventId,
      eventName: booking.eventName,
      userEmail: booking.email,
      userName: booking.userName,
      rating: parseInt(rating),
      comment,
      createdAt: new Date(),
    };

    await db.collection("reviews").insertOne(review);

    res.status(201).json({ message: "Review submitted" });
  } catch (err) {
    console.error("Review submission failed:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addReview };
