const express = require('express');
const router = express.Router();
const Staff = require('../Model/staff');


router.get('/', async (req, res) => {
    try {
        const staffMembers = await Staff.find();
        res.json(staffMembers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
