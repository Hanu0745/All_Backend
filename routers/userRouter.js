
const express = require('express');
const router = express.Router();
const userController = require('../userControllers/userController');

const multer = require('multer');
const fs = require('fs');
const path = require('path');

const imgDirectory = path.join(__dirname, '..', 'public', 'userImages');

// Create directory if it doesn't exist
if (!fs.existsSync(imgDirectory)) {
    fs.mkdirSync(imgDirectory, { recursive: true });
}

const tempStorage = multer.diskStorage({
    destination: function(req, file, cb){
        console.log("Saving to directory:", imgDirectory); // Debug path
        cb(null, imgDirectory);
    },
    filename: function(req, file, cb){
        console.log("Original Filename:", file.originalname); // Debug filename
        cb(null, file.originalname);
    }
})

const uploadImage = multer({storage: tempStorage}).single('userImage');

router.post('/add-user',
    uploadImage,
    userController.AddUser);
router.get('/get-user', userController.getUser);
router.put('/update-user/:id', userController.updateUser);
router.delete('/delete-user/:id', userController.deleteUser);
router.post('/user-login', userController.userLogin);

module.exports = router;
