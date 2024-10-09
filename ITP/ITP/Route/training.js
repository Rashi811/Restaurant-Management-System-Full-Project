const express = require('express');
const router = express.Router();
const Training = require('../Model/Training');


router.post('/', async (req, res) => {
    const { trainingName, staffID } = req.body;
    const newTraining = new Training({ trainingName, staffID });

    try {
        const savedTraining = await newTraining.save();
        res.status(201).json(savedTraining);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const trainings = await Training.find();
        res.json(trainings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
