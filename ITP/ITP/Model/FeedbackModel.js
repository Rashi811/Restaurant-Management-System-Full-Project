// Model/FeedbackModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone_no: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: { 
        type: Date,
        default: Date.now, 
    },
    rating: { // Add rating field
        type: Number,
        required: true, // Make this required if necessary
        min: 1, // Minimum rating value
        max: 5, // Maximum rating value
    }
});

module.exports = mongoose.model("FeedbackModel", feedbackSchema);
