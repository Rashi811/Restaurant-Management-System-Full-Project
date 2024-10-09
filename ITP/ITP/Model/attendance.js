const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
    shiftId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shift', required: true },
    status: { type: String, enum: ['present', 'absent'], required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
