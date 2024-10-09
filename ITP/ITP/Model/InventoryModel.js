const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    itemName: {
        type: String,
        required: true,
        unique: true, // Add uniqueness constraint to prevent duplicates
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: null,
    },
    low_stock_threshold: {
        type: Number,
        required: true,  // Required field for low stock threshold
        default: 10      // Default threshold (can be changed)
    },
});

module.exports = mongoose.model("Inventory", inventorySchema);
