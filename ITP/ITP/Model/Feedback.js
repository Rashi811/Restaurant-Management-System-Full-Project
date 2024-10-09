const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    feedbackText: { 
        type: String,
        required: true 
    },
    staffID: { 
        type: String,
        required: true 
    },
    date: { 
        type: Date,
        default: Date.now 
    }
}, { collection: 'staffFeedback' }); 

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
