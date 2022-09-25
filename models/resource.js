const mongoose = require('mongoose');
const path = require('path');

const { branches, types, tags } = require(path.join(__dirname, '../utils/constants.js'));

branch_names = branches.map( branch => branch.name );
type_names = types.map( type => type.name );

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        lowercase: true,
        required: true,
        minLength: 5,
        maxLength: 15,
    },
    provider: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        // uppercase: true,
        enum: type_names,
        required: true,
    },
    url: {
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
    branch: {
        type: String,
        // uppercase: true,
        enum: branch_names,
        required: true,
    },
    semester: {
        type: String,
        min: 1,
        max: 8,
        required: true,
    },
    description: {
        type: String,
        minLength: 20,
        maxLength: 100,
        required: true,
    },
    tag: [{
        type: String,
        // uppercase: true,
        enum: tags,
        required: true,
    }],
});

resourceSchema.index({ title: 'text' });

module.exports = mongoose.model('Resource', resourceSchema);