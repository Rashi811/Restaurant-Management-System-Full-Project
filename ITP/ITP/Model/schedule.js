const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    day: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true }
});

module.exports = mongoose.model('Schedule', scheduleSchema);
