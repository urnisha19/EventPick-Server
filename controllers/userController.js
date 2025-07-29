const { getDB } = require("../utils/connectDB");

// Controller to save or update user information in the database
const saveUser = async (req, res) => {
  try {
    // Get the database instance
    const db = getDB();

    // Extract user data from the request body
    const { uid, name, email, photo } = req.body;

    // Basic validation for required fields
    if (!email || !name) {
      console.error("Missing fields:", { name, email });
      return res.status(400).json({ message: "Missing required user data" });
    }

    // Construct the user object
    const user = {
      uid: uid || req.user?.uid,
      name,
      email,
      photo: photo || null,
    };

    // Check if a user with the given email already exists
    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      // If user exists, update their data
      await db.collection("users").updateOne({ email }, { $set: user });
    } else {
      // If user doesn't exist, insert new user
      await db.collection("users").insertOne(user);
    }

    // Respond with success message
    res.status(200).json({ message: "User saved/updated successfully" });
  } catch (error) {
    console.error("💥 Error saving user:", error);
    // Handle unexpected server errors
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  try {
    const db = getDB();
    const email = req.params.email;
    const user = await db.collection("users").findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Server error while fetching user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const db = getDB();
    const email = req.params.email;
    const { name, photo } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await db
      .collection("users")
      .updateOne({ email }, { $set: { name, photo } });

    res.status(200).json({ message: "Profile updated" });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { saveUser, getUser, updateUser };
