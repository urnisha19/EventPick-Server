const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsAllowInvalidCertificates: true,
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

const connectDB = async () => {
  try {
    await client.connect();
    db = client.db("EventPick");
    console.log("✅ MongoDB connected to EventPick database");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
  }
};

const getDB = () => db;

module.exports = { connectDB, getDB };
