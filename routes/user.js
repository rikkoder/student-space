const express = require('express');
const router = express.Router();
const path = require('path');
const User = require(path.join(__dirname, '../models/user'));

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.post('/register', async (req, res) => {
    res.send(req.body);
})

module.exports = router;