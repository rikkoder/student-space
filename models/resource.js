const mongoose = require('mongoose');
const path = require('path');

// const branches = ['CSE', 'IT', 'ECE', 'EE', 'MECH', 'CHE', 'META', 'BIOMED', 'BIOTECH'];
// const types = ['BOOK', 'COLLECTION', 'LECTURE', 'ANIMATION', 'NOTES', 'PROBLEM-SET', 'SOLVED-PROBLEMS'];
// const tags = ['MATHS', 'PHYSICS', 'CHEMISTRY', 'COMPUTER NETWORKS', 'DATA STRUCTURES', 'COMMUNICATION SYSTEM', 'COMPUTER PROGRAMMING', 'LINEAR ALGEBRA', 'CALCULUS', 'OBJECT ORIENTED MODEL', 'MACHINE LEARNING', 'ALGORITHMS', 'OBJECT ORIENTED PROGRAMMING', 'FLUID DYNAMICS', 'DIGITAL IMAGE PROCESSING', 'DATA SCIENCE', 'DATA MINING', 'QUESTION PAPER', 'ECONOMICS', 'ENGINEERING GRAPHICS', 'COMPUTER ARCHITECTURE (COA/CSA/ACA)'];

const { branches, types, tags } = require(path.join(__dirname, '../constants.js'));

branch_names = branches.map( branch => branch.name );
type_names = types.map( type => type.name );

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 5,
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
        minLength: 50,
        required: true,
    },
    tag: [{
        type: String,
        // uppercase: true,
        enum: tags,
        required: true,
    }],
});

module.exports = mongoose.model('Resource', resourceSchema);