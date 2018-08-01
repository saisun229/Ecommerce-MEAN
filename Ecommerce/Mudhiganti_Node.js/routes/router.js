'use strict'
let {createUser, updateUserDetails, fetchUserInfo, verifyUser, rateSeller, getAllUsers } = require('../controllers/userController');
let {addCategory, getCategories, deleteCategory} = require('../controllers/categoryController');
let {addProduct, updateProduct, getProduct, deleteProduct, searchProducts, getAvailableProducts, getSoldProducts, buyProduct} = require('../controllers/productController');
let {uploadImage, downloadimage} = require('../controllers/imageProcessor');
let {getAllMsgs, sendMsg, getMsgCount, updateMsg} = require('../controllers/message');
var express = require('express');
var router = express.Router();

/* login users . */
router.get('/', function(req, res, next){
  res.send({test:'test'});
});
router.post('/login', verifyUser);
router.post('/signup', createUser);
router.put('/updateuser', updateUserDetails);
router.put('/rateseller', rateSeller);
router.get('/getuser', fetchUserInfo);
router.get('/getallusers', getAllUsers);

//seller rating is pending need to implement

router.post('/addcategory', addCategory);
router.get('/getcategories', getCategories);
router.delete('/deletecategory', deleteCategory);

router.post('/addproduct', addProduct);
router.delete('/deleteproduct', deleteProduct);
router.post('/searchproducts', searchProducts);
router.get('/getproduct', getProduct);
router.put('/updateproduct', updateProduct);
router.get('/getavailableproducts', getAvailableProducts);
router.get('/getsoldproducts', getSoldProducts);
router.post('/buyproduct', buyProduct);

router.get('/getunreadcount', getMsgCount);
router.get('/getmessages', getAllMsgs);
router.post('/sendMesage', sendMsg);
router.put('/setasread', updateMsg);

router.post('/uploadImage', uploadImage);
router.get('/downloadimage', downloadimage);

module.exports = router;
