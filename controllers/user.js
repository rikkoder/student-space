const User = require('../models/user');
const Resource = require('../models/resource');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
};

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Student Space!');
            res.redirect('/');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
};

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
};

module.exports.login = (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    req.logout( function (err) {
        if (err) {return next(err);}
        req.flash('success', 'Logout Successful!');
        res.redirect('/');
    });
};

module.exports.renderProfile = async (req, res) => {
    const username = req.params.username;
    const resources = await Resource.find({ provider: username });
    res.render('users/profile', { user: req.user, username, resources });
};