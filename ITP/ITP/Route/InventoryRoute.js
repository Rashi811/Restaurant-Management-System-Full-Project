const express = require("express");
const router = express.Router();
const InventoryController = require("../Controlers/InventoryControllers");

// Define routes for the inventory operations
router.get("/", InventoryController.getAllInventories);  // Fetch all inventories
router.post("/", InventoryController.addInventories);    // Add new inventory item
router.get("/low-stock", InventoryController.getLowStockItems); // Fetch low stock items
router.get("/:iN", InventoryController.getById);         // Get an inventory item by ID
router.put("/:iN", InventoryController.updateInventory); // Update an inventory item by ID
router.delete("/:iN", InventoryController.deleteInventory); // Delete an inventory item by ID

module.exports = router;
