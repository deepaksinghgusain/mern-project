// import modules
const express = require('express');
const { upload } = require('../../middleware/fileUpload');
const { getProducts, storeProduct, updateProduct, deleteProduct } = require('../../controllers/admin/product.controller');

// router
const router = express.Router();

// get products
router.get('/', getProducts)

// store product
router.post('/store', upload.single("image") , storeProduct)

// update product
router.patch('/update/:id', upload.single("image") , updateProduct)

// delete product
router.delete('/destroy/:id', deleteProduct)

module.exports = router;
