const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const catchAsync = require(path.join(__dirname, '../utils/catchAsync'));
// const User = require(path.join(__dirname, '../models/user'));
const user = require(path.join(__dirname, '../controllers/user'));

router.route('/register')
    .get(user.renderRegister)
    .post(catchAsync(user.register));

router.route('/login')
    .get(user.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), user.login)

router.get('/logout', user.logout);

router.get('/profile/:username', user.renderProfile);

module.exports = router;