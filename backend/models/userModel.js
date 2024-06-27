const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        maxlenght: 25,
        required: true,
    },
    fullname: {
        type: String,
        trim: true,
        required: true,
        maxlenght: 25,
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        default: '',
    },
    gender: {
        type: String,
        default: 'male'
    },
    website: {
        type: String,
        default: '',
    },
    phone: {
        type: String,
        default: '',
    },
    avatar: {
        type: String,
        default: '',
    },
    story: {
        type: String,
        default: '',
        maxlenght: 200,
    },
    friends: [{
        type: mongoose.Types.ObjectId, ref: 'user'
    }],
    following: [{
        type: mongoose.Types.ObjectId, ref: 'user'
    }],
    saved: [{
        type: mongoose.Types.ObjectId, ref: 'user'
    }],
}, {
    timestamps: true
});

module.exports = User = mongoose.model('user', userSchema)