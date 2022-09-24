const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const userRoutes = require(path.join(__dirname, '/routes/user'));

const Resource = require(path.join(__dirname, '/models/resource'));

const { branches } = require(path.join(__dirname, '/constants'));

const app = express();

const MONGO_PORT = process.env.MONGO_PORT || 27017

mongoose.connect(`mongodb://localhost:${MONGO_PORT}/student-space`,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MONGODB CONNECTED ...');
    })
    .catch(err => {
        console.log(`MONGODB CONNECTION ERROR: ${err}`);
    });

app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


app.use('/', userRoutes);

let user = null;

app.get('/', async (req, res) => {
    const branchesPromises = branches.map( async (branch) => {
        const resources = await Resource.find({ branch: branch.name }).exec();
        const nb = {...branch};
        nb['resources'] = resources.length;
        return nb;
    });
    
    let branches_with_count = await Promise.all(branchesPromises);
    res.render('home', {branches: branches_with_count, user});
})


app.get('/branch/:branch', async (req, res) => {
    const branch = req.params.branch;
    const resources = await Resource.find({ branch: branch }).exec();

    res.render('branch', { branch, resources, user});
})


app.listen(3000, () => {
    console.log("SERVER RUNNING ON PORT 3000 ...");
})