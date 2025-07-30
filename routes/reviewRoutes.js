const express = require("express");
const router = express.Router();
const { addReview } = require("../controllers/reviewController"); 

router.post("/bookings/review/:id", addReview);

module.exports = router;
