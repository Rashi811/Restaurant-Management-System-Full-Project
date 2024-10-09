const Inventory = require("../Model/InventoryModel");
const multer = require("multer");
const path = require("path");

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage }).single('image');

// Add new or update existing inventories
const addInventories = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Upload Error:', err);
            return res.status(500).json({ message: err.message });
        }

        console.log(req.body)
        console.log("arrivced")

        const { itemName, description, price, amount, category, low_stock_threshold } = req.body;
        const imagePath = req.file ? path.join('uploads', req.file.filename) : null;

        try {
            // Check if an item with the same name exists
            let inventory = await Inventory.findOne({ itemName });

            if (inventory) {
                // If it exists, update the existing item
                inventory.description = description || inventory.description;
                inventory.price = price || inventory.price;
                inventory.amount += parseInt(amount); // Add to the existing amount
                inventory.category = category || inventory.category;
                if (imagePath) inventory.image = imagePath;
                inventory.low_stock_threshold = low_stock_threshold || inventory.low_stock_threshold;

                await inventory.save();
                return res.status(200).json({ message: "Item updated successfully", inventory });
            } else {
                // If it doesn't exist, create a new inventory item
                inventory = new Inventory({
                    itemName,
                    description,
                    price,
                    amount,
                    category,
                    image: imagePath,
                    low_stock_threshold: low_stock_threshold || 10 // Default to 10 if not provided
                });
                await inventory.save();
                return res.status(201).json({ message: "New item added successfully", inventory });
            }
        } catch (err) {
            console.error('Save Error:', err);
            return res.status(500).json({ message: "Unable to add to inventory" });
        }
    });
};

// Update existing inventory by ID
const updateInventory = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Upload Error:', err);
            return res.status(500).json({ message: err.message });
        }

        const id = req.params.iN; // Extract the ID from req.params
        console.log('Updating inventory with ID:', id);
        
        const { itemName, description, price, amount, category, low_stock_threshold } = req.body;
        const imagePath = req.file ? path.join('uploads', req.file.filename) : null;

        try {
            let inventory = await Inventory.findById(id);
            if (!inventory) {
                return res.status(404).json({ message: "Inventory not found" });
            }

            // Update fields if provided
            inventory.itemName = itemName || inventory.itemName;
            inventory.description = description || inventory.description;
            inventory.price = price || inventory.price;
            inventory.amount = amount || inventory.amount;
            inventory.category = category || inventory.category;
            if (imagePath) inventory.image = imagePath;
            inventory.low_stock_threshold = low_stock_threshold || inventory.low_stock_threshold;

            await inventory.save();
            return res.status(200).json({ message: "Item updated successfully", inventory });
        } catch (err) {
            console.error('Update Error:', err);
            return res.status(500).json({ message: "Unable to update inventory" });
        }
    });
};


const getLowStockItems = async (req, res) => {
    console.log("Fetching low stock items...");
    try {
        const lowStockItems = await Inventory.find({
            $expr: { $lte: ["$amount", "$low_stock_threshold"] }
        });
        console.log("Low stock items found:", lowStockItems);
        return res.status(200).json(lowStockItems);
    } catch (err) {
        console.error('Low Stock Fetch Error:', err);
        return res.status(500).json({ message: "Error fetching low stock items" });
    }
};

const getAllInventories = async (req, res) => {
    try {
        const inventories = await Inventory.find();
        return res.status(200).json({ inventories });
    } catch (err) {
        console.error('Fetch Error:', err);
        return res.status(500).json({ message: "Error fetching inventory" });
    }
};

const getById = async (req, res) => {
    const id = req.params.iN;
    try {
        const inventory = await Inventory.findById(id);
        if (!inventory) {
            return res.status(404).json({ message: "Inventory not found" });
        }
        return res.status(200).json({ inventory });
    } catch (err) {
        console.error('Fetch Error:', err);
        return res.status(500).json({ message: "Error fetching inventory" });
    }
};

const deleteInventory = async (req, res) => {
    const id = req.params.iN;
    try {
        const inventory = await Inventory.findByIdAndDelete(id);
        if (!inventory) {
            return res.status(404).json({ message: "Inventory not found" });
        }
        return res.status(200).json({ message: "Item deleted successfully", inventory });
    } catch (err) {
        console.error('Delete Error:', err);
        return res.status(500).json({ message: "Unable to delete inventory" });
    }
};

exports.getAllInventories = getAllInventories;
exports.addInventories = addInventories;
exports.getById = getById;
exports.deleteInventory = deleteInventory;
exports.getLowStockItems = getLowStockItems;
exports.updateInventory = updateInventory;