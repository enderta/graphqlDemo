const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        match: /.+\@.+\..+/, // Simple regex for email validation
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    
});

const User = mongoose.model('User', userSchema);

module.exports = User;