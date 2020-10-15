const mongoose = require('mongoose');

// User schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
})

const User = module.exports = mongoose.model('User', userSchema);