const express = require('express');
const router = express.Router();
const PerformanceReview = require('../Model/performanceReview');


router.post('/add-review', async (req, res) => {
    const { staffId, reviewDate, rating, comments } = req.body;

   
    console.log('Received data:', req.body);

    
    if (!staffId || !reviewDate || !rating || !comments) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const review = new PerformanceReview({
            staffId,
            reviewDate,
            rating: Number(rating), 
            comments,
        });

        await review.save();
        res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
        console.error('Error saving review to database:', error);
        res.status(500).json({ message: 'Error adding review', error });
    }
});


router.get('/get-reviews', async (req, res) => {
    try {
        const reviews = await PerformanceReview.find();
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Error fetching reviews', error });
    }
});

module.exports = router;
