const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const trainingSchema = new Schema({
    trainingName: { 
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
});

const Training = mongoose.model('Training', trainingSchema);

module.exports = Training;
