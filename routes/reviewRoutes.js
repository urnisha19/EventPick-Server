const express = require("express");
const router = express.Router();
const { addReview, getRecentReviews } = require("../controllers/reviewController"); 

router.post("/bookings/review/:id", addReview);
router.get("/reviews/latest", getRecentReviews); 

module.exports = router;
