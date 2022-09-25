const express = require('express');
const router = express.Router();
const path = require('path');
const catchAsync = require(path.join(__dirname, '../utils/catchAsync'));
const resource = require(path.join(__dirname, '../controllers/resource'));

router.route('/upload')
    .get(resource.renderUpload)
    .post(catchAsync(resource.upload));


// router.route('/upload')
//     .get(catchAsync(resource.renderUpload))

router.get('/search', resource.renderSearch);

// router.route('/login')
//     .get(users.renderLogin)
//     .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

// router.get('/logout', users.logout);

// router.get('/profile/:username', users.renderProfile);

// router.get('/profile/:username', (req, res) => {
//     res.send("hemlo");
// });

module.exports = router;
