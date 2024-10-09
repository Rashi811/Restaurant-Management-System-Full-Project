const Menu = require("../Model/MenuModel");

const getAllMenus = async (req, res, next) => {
    let menus;

    try {
        menus = await Menu.find();
    } catch (err) {
        console.log(err);
    }

    if (!menus) {
        return res.status(404).json({ message: "Menu items not found" });
    }

    return res.status(200).json({ menus });
};


// Function to filter menus by price
const getAllMenusWithFilter = async (req, res, next) => {
    const { maxPrice } = req.query; // This for Get maxPrice from query parameters
    let menus;

    try {
        
        menus = await Menu.find();

        if (maxPrice) {
            // Converting maxPrice to a number
            const numericMaxPrice = Number(maxPrice);

            
            menus = menus.filter((menu) => {
                
                const menuPrice = parseFloat(menu.price.replace(/[^0-9.]/g, '')); 
                return menuPrice <= numericMaxPrice; 
            });
        }
    } catch (err) {
        console.log(err);
    }

    if (!menus || menus.length === 0) {
        return res.status(404).json({ message: "Menu items not found" });
    }

    return res.status(200).json({ menus });
};


const addMenus = async (req, res, next) => {
    const { name, category, description, price } = req.body;

    let menu;

    try {
        menu = new Menu({ name, category, description, price }); 
        await menu.save();
    } catch (err) {
        console.log(err);
    }

    if (!menu) {
        return res.status(500).json({ message: "Menu item not inserted" }); 
    }

    return res.status(201).json({ menu }); 
};


const getById = async (req, res, next) => {
    const id = req.params.id;

    let menu;

    try {
        menu = await Menu.findById(id);
    } catch (err) {
        console.log(err);
    }

    if (!menu) {
        return res.status(500).json({ message: "Menu item not found" }); 
    }

    return res.status(200).json({ menu });
}


const updateMenu = async (req, res, next) => {
    const id = req.params.id;
    const { name, category, description, price } = req.body;
    let menu;

    try {
        menu = await Menu.findByIdAndUpdate(id,
            { name, category, description, price },
            { new: true } 
        );
    } catch (err) {
        console.log(err);
    }

    if (!menu) {
        return res.status(500).json({ message: "Unable to update menu details" }); 
    }

    return res.status(200).json({ menu });
};


const deleteMenu = async (req, res, next) => {
    const id = req.params.id;

    let menu;

    try {
        menu = await Menu.findByIdAndDelete(id);
    } catch (err) {
        console.log(err); 
    }

    if (!menu) {
        return res.status(500).json({ message: "Unable to delete menu details" }); 
    }

    return res.status(200).json({ menu });
};

module.exports = {
    getAllMenus,
    getAllMenusWithFilter,
    addMenus,
    getById,
    updateMenu,
    deleteMenu
};
