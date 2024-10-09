const express = require('express');
const router = express.Router();
const Attendance = require('../Model/attendance');

// Mark Attendance
router.post('/mark-attendance', async (req, res) => {
    const { shiftId, staffId, status } = req.body;
    try {
        const newAttendance = new Attendance({ shiftId, staffId, status });
        await newAttendance.save();
        res.status(201).json({ message: 'Attendance marked successfully' });
    } catch (error) {
        console.error('Error marking attendance:', error);
        res.status(500).json({ message: 'Error marking attendance', error });
    }
});

module.exports = router;
