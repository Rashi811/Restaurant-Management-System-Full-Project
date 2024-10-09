const express = require("express");

const routerProfile = express.Router();

const Profile = require("../Model/profile"); // Adjust the path as necessary

const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Change the destination as needed

// Update a profile by ID
routerProfile.put("/:id", upload.single("profilePicture"), (req, res) => {
  const updateData = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    Contact: req.body.Contact,
    password: req.body.password,
    role: req.body.role,
  };

  // Check if a new file was uploaded
  if (req.file) {
    // Save the uploaded file's path
    updateData.profilePicture = req.file.path; // Or use a URL if you're serving from a cloud storage
  }

  // Check for profile picture URL in the request body
  if (req.body.profilePicture) {
    updateData.profilePicture = req.body.profilePicture; // Use the URL provided
  }

  Profile.findByIdAndUpdate(req.params.id, updateData, { new: true })
    .then((profile) => {
      if (!profile) return res.status(404).json({ msg: "Profile not found" });
      res.json({ msg: "Updated Successfully", profile });
    })
    .catch(() => res.status(400).json({ msg: "Failed to update profile" }));
});

// Create a new profile
routerProfile.post("/", (req, res) => {
  Profile.create(req.body)
    .then(() => res.json({ msg: "Profile added successfully" }))
    .catch(() => res.status(400).json({ msg: "Profile adding failed" }));
});

// Get all profiles
routerProfile.get("/", (req, res) => {
  Profile.find()
    .then((profiles) => res.json(profiles))
    .catch(() => res.status(400).json({ msg: "Failed to fetch profiles" }));
});

// Get a specific profile by ID
routerProfile.get("/:id", (req, res) => {
  Profile.findById(req.params.id)
    .then((profile) => {
      if (!profile) return res.status(404).json({ msg: "Profile not found" });
      res.json(profile);
    })
    .catch(() => res.status(400).json({ msg: "Failed to fetch profile" }));
});

// Update a profile by ID
routerProfile.put("/:id", (req, res) => {
  Profile.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((profile) => {
      if (!profile) return res.status(404).json({ msg: "Profile not found" });
      res.json({ msg: "Updated Successfully", profile });
    })
    .catch(() => res.status(400).json({ msg: "Failed to update profile" }));
});

// Delete a profile by ID
routerProfile.delete("/:id", (req, res) => {
  Profile.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "Deleted successfully" }))
    .catch(() => res.status(400).json({ msg: "Failed to delete profile" }));
});

module.exports = routerProfile;
