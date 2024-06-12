// import modules
const express = require('express');
const { upload } = require('../../middleware/fileUpload');
const { getUsers, storeUser, updateUser, deleteUser } = require('../../controllers/admin/user.controller');

// router
const router = express.Router();

// get users
router.get('/', getUsers)

// store user
router.post('/store', upload.single("image") , storeUser)

// update user
router.patch('/update/:id', upload.single("image") , updateUser)

// delete user
router.delete('/destroy/:id', deleteUser)

module.exports = router;
