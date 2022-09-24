const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    rating: {
        upvotes: {
            type: Number,
            required: true,
            default: 0,
        },
        downvotes: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    avatar: {
        type: Number,
        required: true,
        default: 0,
    },
})