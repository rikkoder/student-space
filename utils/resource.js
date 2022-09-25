const Resource = require("../models/resource");

module.exports.searchResources = async function (title) {
    const search_results = await Resource.find(
        { $text: { $search: `${title}` } },
        { score: { $meta: "textScore" } }
    )
        .sort({ score: { $meta: "textScore" } })
        .limit(10);
    return search_results;
};