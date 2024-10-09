const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const staffSchema = new Schema({
    staffName: { 
        type: String,
        required: true 
    },
    staffID: {
        type: String, 
        required: true 
    },
    position: {
        type: String, 
        required: true 
    },
    workTime: {
        type: String, 
        required: true 
    },
    age: { 
        type: Number 
    },
    gender: {    
        type: String 
    },
    phoneNumber: {  
        type: String, 
        required: true 
    }
});

const Staff = mongoose.model('StaffManagement', staffSchema);

module.exports = Staff;
