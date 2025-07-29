const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db; // Declare a variable to hold the reference to the connected database

const connectDB = async () => {
  try {
    await client.connect(); // Establish a connection to the MongoDB server
    db = client.db("EventPick"); // Select the database named "EventPick"
    console.log("✅ MongoDB connected to EventPick database");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
  }
};

const getDB = () => db; // Function to return the connected database instance for use elsewhere in the app

module.exports = { connectDB, getDB }; // Export the connectDB and getDB functions to be imported in other files