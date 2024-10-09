const router = require('express').Router();
const Staff = require('../Model/staff');

// Create a new staff member
router.post('/add', (req, res) => {
    const { staffName, staffID, position, workTime, age, gender, phoneNumber } = req.body; 

    const newStaff = new Staff({
        staffName,
        staffID,
        position,
        workTime,
        age: Number(age), 
        gender,
        phoneNumber 
    });

    newStaff.save()
        .then(() => res.json('Staff Member Added'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

// Fetch all staff members
router.get('/', (req, res) => {
    Staff.find()
        .then(staffMembers => res.json(staffMembers))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

// Update a staff member
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { staffName, staffID, position, workTime, age, gender, phoneNumber } = req.body; 

    try {
        const updatedStaff = await Staff.findByIdAndUpdate(id, {
            staffName,
            staffID,
            position,
            workTime,
            age: Number(age), 
            gender,
            phoneNumber 
        }, { new: true });

        if (!updatedStaff) {
            return res.status(404).json({ error: 'Staff member not found' });
        }

        res.json({ status: 'Staff member updated' });
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

// Delete a staff member
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedStaff = await Staff.findByIdAndDelete(id);
        if (!deletedStaff) {
            return res.status(404).json({ error: 'Staff member not found' });
        }
        res.json({ status: 'Staff member deleted' });
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

// Fetch a single staff member
router.get('/get/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await Staff.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'Staff member not found' });
        }
        res.json({ status: 'Staff member fetched', user });
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

module.exports = router;
