const Resource = require('../models/resource');
const { search } = require('../routes/user');
const { branches, types } = require('../utils/constants');
const { searchResources } = require('../utils/resource');

const type_names = types.map( elem => elem.name );
const branch_names = branches.map( elem => elem.name );

module.exports.renderUpload = (req, res) => {
    res.render('upload', { type_names, branch_names });
};

module.exports.upload = async (req, res) => {
    try {
        const { title, type, branch, semester, url, description } = req.body;
        const resourceData = {
            title,
            provider: req.user.username,
            date: Date(),
            type,
            branch,
            semester,
            url,
            description,
        }

        const resource = new Resource(resourceData);
        await resource.save();

        req.flash('success', 'resource uploaded successfully!');
        res.redirect('/');
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('upload');
    }
};

module.exports.renderSearch = async (req, res) => {
    try {
        const { title } = req.query;
        const resources = await searchResources(title);
        res.render('search', { resources, user: req.user });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/');
    }
};