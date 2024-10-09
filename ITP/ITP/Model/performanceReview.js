const mongoose = require('mongoose');

const performanceReviewSchema = new mongoose.Schema({
    staffId: { type: String, required: true },
    reviewDate: { type: Date, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comments: { type: String, required: true },
});

module.exports = mongoose.model('PerformanceReview', performanceReviewSchema);
