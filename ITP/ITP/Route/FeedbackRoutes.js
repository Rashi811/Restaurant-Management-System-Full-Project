const express = require("express");
const router = express.Router();
const FeedbackController = require("../Controlers/FeedbackControllers");

const Feedback = require("../Model/FeedbackModel");

const FeedbackControllers = require("../Controlers/FeedbackControllers")

router.post("/feedback", FeedbackController.createFeedbacks);
router.get("/getfeedback", FeedbackController.getFeedbackList);
router.put("/updatefeedback/:id", FeedbackController.updateFeedback);
router.delete("/deletefeedback/:id", FeedbackController.deleteFeedback);

module.exports = router;

