const express = require('express');
const router = express.Router();
const Schedule = require('../Model/schedule');

// Add a new shift
router.post('/add-shift', async (req, res) => {
    const { day, start, end } = req.body;
    try {
        const newShift = new Schedule({ day, start, end });
        await newShift.save();
        res.status(201).json({ message: 'Shift added successfully' });
    } catch (error) {
        console.error('Error adding shift:', error);
        res.status(500).json({ message: 'Error adding shift', error });
    }
});

// Get all shifts
router.get('/get-shifts', async (req, res) => {
    try {
        const shifts = await Schedule.find();
        res.status(200).json(shifts);
    } catch (error) {
        console.error('Error fetching shifts:', error);
        res.status(500).json({ message: 'Error fetching shifts', error });
    }
});

// Delete a shift
router.delete('/delete-shift/:id', async (req, res) => {
    try {
        await Schedule.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Shift deleted successfully' });
    } catch (error) {
        console.error('Error deleting shift:', error);
        res.status(500).json({ message: 'Error deleting shift', error });
    }
});

module.exports = router;
