const express = require("express");

const router = express.Router();

const Events = require("../Model/event");

router.post("/", (req, res) => {
  console.log(req.body); // Log the incoming request body
  Events.create(req.body)
    .then(() => res.json({ msg: "Event added successfully" }))
    .catch((err) => {
      console.error(err);
      res.status(400).json({ msg: "Event adding failed" });
    });
});

// Route to get the total count of events
router.get("/count", (req, res) => {
  Events.countDocuments()
    .then((count) => res.json({ totalEvents: count }))
    .catch(() => res.status(400).json({ msg: "Failed to fetch events count" }));
});

router.get("/", (req, res) => {
  Events.find()
    .then((events) => res.json(events))
    .catch(() => res.status(400).json({ msg: "Failed to fetch events" }));
});

router.get("/:id", (req, res) => {
  Events.findById(req.params.id)
    .then((events) => {
      if (!events) return res.status(404).json({ msg: "Event not found" });
      res.json(events);
    })
    .catch(() => res.status(400).json({ msg: "Failed to fetch event" }));
});

router.put("/:id", (req, res) => {
  Events.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((events) => {
      res.json({ msg: "Updated Successfully" });
    })
    .catch(() => res.status(400).json({ msg: "Failed to update event" }));
});

router.delete("/:id", (req, res) => {
  Events.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "Deleted successfully" }))
    .catch(() => res.status(400).json({ msg: "Failed to delete event" }));
});

module.exports = router;
