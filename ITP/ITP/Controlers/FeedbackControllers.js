// Controllers/FeedbackControllers.js
const Feedback = require("../Model/FeedbackModel");

exports.createFeedbacks = async (req, res) => {
    try {
        const { firstName, lastName, email, phone_no, description,rating } = req.body;
        const feedback = new Feedback({ 
            firstName, 
            lastName, 
            email, 
            phone_no, 
            description,
            date: new Date(), // Set the current date when creating feedback
            rating
        });
        await feedback.save();
        res.status(201).json({ success: true, data: feedback });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.getFeedbackList = async (req, res) => {
    try {
        const feedbackList = await Feedback.find();
        res.status(200).json(feedbackList);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.updateFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, phone_no, description, date } = req.body;

        const updatedFeedback = await Feedback.findByIdAndUpdate(
            id,
            { firstName, lastName, email, phone_no, description, date }, // Include the date here
            { new: true }
        );

        if (!updatedFeedback) {
            return res.status(404).json({ success: false, message: "Feedback not found" });
        }

        res.status(200).json({ success: true, data: updatedFeedback });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFeedback = await Feedback.findByIdAndDelete(id);

        if (!deletedFeedback) {
            return res.status(404).json({ success: false, message: "Feedback not found" });
        }

        res.status(200).json({ success: true, message: "Feedback deleted successfully" });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};