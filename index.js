const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const path = require('path');

const ExpressError = require('./utils/ExpressError');

const userRoutes = require(path.join(__dirname, '/routes/user'));
const resourceRoutes = require(path.join(__dirname, '/routes/resource'));

const Resource = require(path.join(__dirname, '/models/resource'));
const User = require(path.join(__dirname, '/models/user'));

const { branches } = require(path.join(__dirname, '/utils/constants'));

const app = express();

const MONGO_PORT = process.env.MONGO_PORT || 27017
const DB_URL = process.env.DB_URL || `mongodb://localhost:${MONGO_PORT}/student-space`;

console.log(DB_URL);

const MongoDBStore = require("connect-mongo")(session);

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MONGODB CONNECTED ...');
    })
    .catch(err => {
        console.log(`MONGODB CONNECTION ERROR: ${err}`);
    });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));


const secret = process.env.SECRET || 'somethingsecret';

const store = new MongoDBStore({
    url: DB_URL,
    secret,
    touchAfter: 24 * 60 * 60
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
})

const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


app.use('/', userRoutes);
app.use('/', resourceRoutes);

app.get('/', async (req, res) => {
    const branchesPromises = branches.map( async (branch) => {
        const resources = await Resource.find({ branch: branch.name }).exec();
        const nb = {...branch};
        nb['resources'] = resources.length;
        return nb;
    });

    let branches_with_count = await Promise.all(branchesPromises);
    res.render('home', {branches: branches_with_count, user: req.user });
})


app.get('/branch/:branch', async (req, res) => {
    const branch = req.params.branch;
    const resources = await Resource.find({ branch: branch }).exec();

    res.render('branch', { branch, resources, user: req.user });
})



app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT} ...`);
})