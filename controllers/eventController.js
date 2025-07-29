const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/connectDB");

// Controller to add a new event
const addEvent = async (req, res) => {
  try {
    const db = getDB(); // Get the database connection
    const eventsCollection = db.collection("events"); // Reference to the 'events' collection

    // Destructure data from the request body
    const {
      eventName,
      date,
      location,
      category,
      description,
      seats,
      fee,
      deadline,
      organizer,
    } = req.body;

    const image = req.file?.filename; // Get uploaded image filename, if available

    // Create a new event object
    const newEvent = {
      eventName,
      date,
      location,
      category,
      description,
      seats: parseInt(seats), // Ensure seats is stored as a number
      fee,
      deadline,
      organizer,
      image,
    };

    // Insert the event into the database
    const result = await eventsCollection.insertOne(newEvent);

    // Send success response
    res
      .status(201)
      .json({ message: "Event added successfully", id: result.insertedId });
  } catch (error) {
    console.error("Add Event Error:", error);
    res.status(500).json({ message: "Failed to add event" });
  }
};

// Controller to retrieve all events
const getAllEvent = async (req, res) => {
  try {
    const db = getDB();
    const eventsCollection = db.collection("events");

    const events = await eventsCollection.find().toArray(); // Get all events
    res.send(events); // Send as response
  } catch (error) {
    console.error("Fetch events error:", error);
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

// Controller to retrieve a single event by its ID
const getEventById = async (req, res) => {
  try {
    const db = getDB();
    const eventsCollection = db.collection("events");

    const id = req.params.id; // Extract event ID from request params

    const event = await eventsCollection.findOne({ _id: new ObjectId(id) }); // Find event by ID
    res.send(event);
  } catch (error) {
    console.error("Fetch event by ID error:", error);
    res.status(500).json({ message: "Failed to fetch event" });
  }
};

// Controller to update an existing event
const editEvent = async (req, res) => {
  try {
    const db = getDB();
    const eventsCollection = db.collection("events");

    const id = req.params.id; // Event ID to be updated
    const data = req.body; // Updated data from request body

    const result = await eventsCollection.updateOne(
      { _id: new ObjectId(id) }, // Match event by ID
      { $set: data } // Set new values
    );
    res.send(result);
  } catch (error) {
    console.error("Edit Event Error:", error);
    res.status(500).json({ message: "Update failed" });
  }
};

// Controller to delete an event
const deleteEvent = async (req, res) => {
  try {
    const db = getDB();
    const eventsCollection = db.collection("events");

    const id = req.params.id; // Event ID to be deleted
    const result = await eventsCollection.deleteOne({ _id: new ObjectId(id) }); // Delete by ID
    res.send(result);
  } catch (error) {
    console.error("Delete Event Error:", error);
    res.status(500).json({ message: "Delete failed" });
  }
};

// Export all event-related controllers
module.exports = {
  addEvent,
  getAllEvent,
  getEventById,
  editEvent,
  deleteEvent,
};
