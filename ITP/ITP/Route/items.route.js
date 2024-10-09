const express = require('express');
const { Cartcrete, deleteItems,  getAllItems, getCartItem,  Itcreate, updateStatus } = require('../Controlers/items.controller.js');

const router = express.Router();

router.post('/Icreate',Itcreate );
router.get('/IgetAll', getAllItems);
router.post('/Ccreate',Cartcrete );
router.get('/CgetAll', getCartItem);
router.delete('/deletes/:itemsId',deleteItems);
router.put('/adopp/:FormId/status', updateStatus);



module.exports = router;