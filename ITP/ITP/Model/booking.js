const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
    trim: true,
  },
  customerPhone: {
    type: String,
    required: true,
    trim: true,
  },
  eventBooked: {
    type: String,
    required: true,
  },
  numberOfAttendees: {
    type: Number,
    required: true,
    min: 1,
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  specialRequests: {
    type: String,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
