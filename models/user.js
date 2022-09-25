const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    // username: {
    //     type: String,
    //     required: true,
    // },
    // password: {
    //     type: String,
    //     required: true,
    // },
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

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);