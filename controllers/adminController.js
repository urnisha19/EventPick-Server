require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = process.env.DB_NAME;

// Add a new admin to the "admins" collection
const addAdmin = async (req, res) => {
  try {
    const { email } = req.body; // Extract email from request body

    await client.connect();
    const db = client.db(dbName); // Get the database
    const adminsCollection = db.collection("admins"); // Reference the "admins" collection

    await adminsCollection.insertOne({ email }); // Insert the new admin email
    res.status(201).send("Admin added");
  } catch (error) {
    console.error("Error adding admin:", error);
    res.status(500).send("Failed to add admin");
  }
};

// Retrieve all admins from the database
const getAllAdmin = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const adminsCollection = db.collection("admins");

    const admins = await adminsCollection.find().toArray(); // Get all admin documents
    res.status(200).json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).send("Failed to get admins");
  }
};

// Check if a given email belongs to an admin
const isAdmin = async (req, res) => {
  try {
    const email = req.query.email;

    await client.connect();
    const db = client.db(dbName);
    const adminsCollection = db.collection("admins");

    const isAdmin = await adminsCollection.findOne({ email }); // Find admin by email

    res.status(200).json({ admin: !!isAdmin }); // Return boolean based on existence
  } catch (error) {
    console.error("Error checking admin:", error);
    res.status(500).send("Failed to check admin");
  }
};

// Delete an admin by email
const deleteAdmin = async (req, res) => {
  try {
    const { email } = req.params;

    await client.connect();
    const db = client.db(dbName);
    const adminsCollection = db.collection("admins");

    const result = await adminsCollection.deleteOne({ email }); // Delete admin by email
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Admin not found" }); // If no admin was deleted
    }

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await client.close();
  }
};

// Export all admin-related controllers
module.exports = { addAdmin, getAllAdmin, isAdmin, deleteAdmin };
