const express = require('express');
const router = express.Router();
const Feedback = require('../Model/Feedback');


router.post('/', async (req, res) => {
    const { feedbackText, staffID } = req.body;
    const newFeedback = new Feedback({ feedbackText, staffID });

    try {
        const savedFeedback = await newFeedback.save();
        res.status(201).json(savedFeedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
