const admin = require("firebase-admin");

// Import the Firebase service account credentials
const serviceAccount = require("../firebase-service-account.json");

// Initialize the Firebase Admin app if it hasn't been initialized already
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Middleware function to verify Firebase ID token from the Authorization header
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists and is in the correct "Bearer <token>" format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Unauthorized"); // Return 401 if missing or invalid
  }

  // Extract the token from the header
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using Firebase Admin SDK
    const decodedUser = await admin.auth().verifyIdToken(token);

    // Attach the decoded user info (like uid, email, etc.) to the request object
    req.user = decodedUser;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails, return a 403 Forbidden error
    console.error("Token verification error:", error);
    res.status(403).json({ message: "Forbidden" });
  }
};

// Export the middleware to use in protected routes
module.exports = verifyToken;