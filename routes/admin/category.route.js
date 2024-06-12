// import modules
const express = require('express');
const { getCategories, storeCategory, updateCategory, deleteCategory } = require('../../controllers/admin/category.controller');
const { upload } = require('../../middleware/fileUpload');

// router
const router = express.Router();

// get categories
router.get('/', getCategories)

// store category
router.post('/store', upload.single("image") , storeCategory)

// update category
router.patch('/update/:id', upload.single("image") , updateCategory)

// delete category
router.delete('/destroy/:id', deleteCategory)

module.exports = router;
