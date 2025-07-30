const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/connectDB");

// Controller to add a new event to the database
const addEvent = async (req, res) => {
  try {
    const db = getDB(); // Get database instance
    const eventsCollection = db.collection("events"); // Reference the 'events' collection

    // Extract event details from request body
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

    const image = req.file?.filename; // If an image file is uploaded, get its filename

    // Construct the event object to insert
    const newEvent = {
      eventName,
      date,
      location,
      category,
      description,
      seats: parseInt(seats), // Convert seats to a number
      fee,
      deadline,
      organizer,
      image, // Image filename
    };

    // Insert the new event into the collection
    const result = await eventsCollection.insertOne(newEvent);

    // Respond with success message and inserted ID
    res
      .status(201)
      .json({ message: "Event added successfully", id: result.insertedId });
  } catch (error) {
    console.error("Add Event Error:", error);
    res.status(500).json({ message: "Failed to add event" });
  }
};

// Controller to retrieve all events from the database
const getAllEvent = async (req, res) => {
  try {
    const db = getDB();
    const eventsCollection = db.collection("events");

    // Fetch all event documents
    const events = await eventsCollection.find().toArray();

    // Send the list of events
    res.send(events);
  } catch (error) {
    console.error("Fetch events error:", error);
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

// Controller to fetch a single event by its MongoDB _id
const getEventById = async (req, res) => {
  try {
    const db = getDB();
    const eventsCollection = db.collection("events");

    const id = req.params.id; // Extract ID from URL params

    // Find event document by ID
    const event = await eventsCollection.findOne({ _id: new ObjectId(id) });

    // Send the event if found
    res.send(event);
  } catch (error) {
    console.error("Fetch event by ID error:", error);
    res.status(500).json({ message: "Failed to fetch event" });
  }
};

// Controller to update an existing event by its ID
const editEvent = async (req, res) => {
  try {
    const db = getDB();
    const eventsCollection = db.collection("events");

    const id = req.params.id; // ID of the event to update
    const data = req.body; // New data from request body

    // Update event with new data
    const result = await eventsCollection.updateOne(
      { _id: new ObjectId(id) }, // Match by ID
      { $set: data } // Set updated fields
    );

    // Send update result
    res.send(result);
  } catch (error) {
    console.error("Edit Event Error:", error);
    res.status(500).json({ message: "Update failed" });
  }
};

// Controller to delete an event by its ID
const deleteEvent = async (req, res) => {
  try {
    const db = getDB();
    const eventsCollection = db.collection("events");

    const id = req.params.id; // ID of event to delete

    // Attempt to delete the event
    const result = await eventsCollection.deleteOne({ _id: new ObjectId(id) });

    // Send result of delete operation
    res.send(result);
  } catch (error) {
    console.error("Delete Event Error:", error);
    res.status(500).json({ message: "Delete failed" });
  }
};

// Export all event controller functions to be used in routes
module.exports = {
  addEvent,
  getAllEvent,
  getEventById,
  editEvent,
  deleteEvent,
};
