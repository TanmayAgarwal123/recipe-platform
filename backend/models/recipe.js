const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: String,
    description: String,
    ingredients: [String],
    steps: [String],
    author: String,
    // Add more fields as needed
});

module.exports = mongoose.model('Recipe', recipeSchema);
