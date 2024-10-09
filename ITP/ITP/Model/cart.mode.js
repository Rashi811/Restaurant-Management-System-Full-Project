const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
 

  name:{
    type:String,  
    required:true,  
},    

category:{
    type:String,   
    required:true,  
},
email:{
  type:String,  
  required:true,  
},    

Iname:{
  type:String,   
  required:true,  
},

description:{
    type:String,   
    required:true,  
},   
  price: {
    type: Number, 
    required: true
  },

  status: {
    type: String,
    enum: ['processing', 'Approve', 'Reject'], 
    default: 'processing' 
},


 
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
