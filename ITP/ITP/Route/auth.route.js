const express = require('express');
const {  signin,   signup,  signOut, Ssignin, Ssignup } = require('../Controlers/auth.controller');




const route = express.Router();

route.post("/signup", signup);
route.post("/signin", signin);
route.post("/signout", signOut)
route.post("/ssignup", Ssignup);
route.post("/ssignin", Ssignin);



module.exports = route;
