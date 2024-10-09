const Cart = require('../Model/cart.mode.js');
const Items = require('../Model/items.model.js');

//add new items
const Itcreate = async (req, res, next) => {
  const { name,category,description,  price,  image, } = req.body;

  const newItems = new Items({
    name,category,description,  price,  image,
  });
  try {
    const savedItems = await newItems.save();
    res.status(201).json(savedItems);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

//get all items
const getAllItems = async (req, res, next) => {
  try {
    const items = await Items.find();

    if (items.length > 0) {
      res.json({ message: "Items details retrieved successfully", items });
    } else {
      res.json({ message: "Items failed to retrive!", items });
    }
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};

//add cart
const Cartcrete = async (req, res, next) => {
  const { status,name,category,description,  price,email,Iname} =
    req.body;

  const newItems = new Cart({
    status,name,category,description,  price,email,Iname
    
  });
  try {
    const savedItems = await newItems.save();
    res.status(201).json(savedItems);
  } catch (error) {
    next(error);
    console.log(error);
  }
};





const getCartItem = async (req, res, next) => {
    try {
      const items = await Cart.find();
  
      if (items.length > 0) {
        res.json({ message: "Items details retrieved successfully", items });
      } else {
        res.json({ message: "Items failed to retrive!", items });
      }
    } catch (error) {
      console.log(error.message);
  
      next(error);
    }
  };

//romove 1 items in the cart
const deleteItems = async (req, res, next) => {
    try {
      await Cart.findByIdAndDelete(req.params.itemsId);
      res.status(200).json("The post has been deleted");
    } catch (error) {
      next(error);
    }
  };









  





//status
//status 
const updateStatus = async (req, res, next) => {
  try {
    

    const { FormId } = req.params;
    const { status } = req.body;

    const updatedform = await Cart.findByIdAndUpdate(
      FormId ,
      { status },
      { new: true }
    );

    if (!updatedform) {
      return next(errorHandle(404, " form not found"));
    }

    res.status(200).json(updatedform);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  Itcreate,
  getAllItems,
  Cartcrete,
  getCartItem,
  deleteItems,
  updateStatus
}


