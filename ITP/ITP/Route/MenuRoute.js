const express = require("express");
const router = express.Router();
const MenuControl = require('../Controlers/MenuControl'); // Import the controller
const Menu = require("../Model/MenuModel"); // Import the Menu model

// Existing routes
router.get("/", MenuControl.getAllMenus);
router.get("/filter", MenuControl.getAllMenusWithFilter);
router.post("/", MenuControl.addMenus);
router.get("/:id", MenuControl.getById);
router.put("/:id", MenuControl.updateMenu);
router.delete("/:id", MenuControl.deleteMenu);

// New PATCH route for updating the rating of a menu item
router.patch("/:id/rate", async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body; // Expecting rating in the request body

  try {
    const menuItem = await Menu.findById(id);

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' }); // Handle not found case
    }

    // If ratings is not already an array, initialize it
    if (!Array.isArray(menuItem.ratings)) {
      menuItem.ratings = [];
    }

    // Push the new rating to the ratings array
    menuItem.ratings.push(rating);

    // Calculate the average rating
    const averageRating = menuItem.ratings.reduce((acc, val) => acc + val, 0) / menuItem.ratings.length;

    // Update the rating and ratings array
    menuItem.rating = averageRating; // Store the average rating
    await menuItem.save(); // Save the updated menu item

    res.status(200).json(menuItem); // Send back the updated menu
  } catch (error) {
    console.error('Error updating rating:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error updating rating' }); // Error handling
  }
});

module.exports = router; // Export the router
