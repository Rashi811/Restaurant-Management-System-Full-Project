const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema  = new Schema({

name:{
    type:String,  
    required:true,  
},    

category:{
    type:String,   
    required:true,  
},

description:{
    type:String,   
    required:true,  
},   

price:{
    type:String,   
    required:true,  
}  ,

rating: { 
    type: Number, default: 0,
}

});

module.exports = mongoose.model(
    "MenuModel",   
    menuSchema    
)