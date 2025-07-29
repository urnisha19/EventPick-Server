const multer = require("multer");
const path = require("path");

// Configure storage settings for uploaded files
const storage = multer.diskStorage({
  // Define the destination folder for uploaded files
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Files will be saved in the 'uploads/' directory
  },
  // Define the filename format for uploaded files
  filename: function (req, file, cb) {
    // Create a unique suffix using current timestamp and a random number
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Concatenate the unique suffix with the file's original extension
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Create the multer upload middleware with the defined storage configuration
const upload = multer({ storage: storage });

// Export the upload middleware to use in routes (e.g., for handling file uploads)
module.exports = upload;
