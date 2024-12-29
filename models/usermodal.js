
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    userImage: {
        type: String,
    },
    userRoll: {
        type: String,
        required: true,
        unique: true
    },
    userMobile: {
        type: Number,
        required: true,
        unique: true
    },
    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    userPassword: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('user', userSchema);
