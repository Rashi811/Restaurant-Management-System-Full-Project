const express = require("express");

const router = express.Router();

const Booking = require("../Model/booking"); // Adjust the path as necessary

router.get("/total-attendees", (req, res) => {
  Booking.aggregate([
    {
      $group: {
        _id: null,
        totalAttendees: { $sum: "$numberOfAttendees" },
      },
    },
  ])
    .then((result) => {
      const totalAttendees = result.length > 0 ? result[0].totalAttendees : 0;
      res.json({ totalAttendees });
    })
    .catch(() => res.status(400).json({ msg: "Failed to fetch bookings" }));
});

// Create a new booking
router.post("/", (req, res) => {
  Booking.create(req.body)
    .then(() => res.json({ msg: "Booking added successfully" }))
    .catch(() => res.status(400).json({ msg: "Booking adding failed" }));
});

// Get all bookings
router.get("/", (req, res) => {
  Booking.find()
    .populate("eventBooked") // Populate event details if needed
    .then((bookings) => res.json(bookings))
    .catch(() => res.status(400).json({ msg: "Failed to fetch bookings" }));
});

// Get a specific booking by ID
router.get("/:id", (req, res) => {
  Booking.findById(req.params.id)
    .populate("eventBooked") // Populate event details if needed
    .then((booking) => {
      if (!booking) return res.status(404).json({ msg: "Booking not found" });
      res.json(booking);
    })
    .catch(() => res.status(400).json({ msg: "Failed to fetch booking" }));
});

// Update a booking by ID
router.put("/:id", (req, res) => {
  Booking.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((booking) => {
      if (!booking) return res.status(404).json({ msg: "Booking not found" });
      res.json({ msg: "Updated Successfully", booking });
    })
    .catch(() => res.status(400).json({ msg: "Failed to update booking" }));
});

// Delete a booking by ID
router.delete("/:id", (req, res) => {
  Booking.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "Deleted successfully" }))
    .catch(() => res.status(400).json({ msg: "Failed to delete booking" }));
});

// Add this to your existing router code

module.exports = router;
