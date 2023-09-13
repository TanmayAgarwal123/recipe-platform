const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');  // Import the Recipe model

// ... (other routes)

// Add a new recipe
router.post('/', async (req, res) => {
    try {
        const newRecipe = new Recipe(req.body);
        const savedRecipe = await newRecipe.save();
        res.json(savedRecipe);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all recipes
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single recipe
router.get('/:id', getRecipe, (req, res) => {
    res.json(res.recipe);
});

// Middleware to fetch a recipe by ID
async function getRecipe(req, res, next) {
    let recipe;
    try {
        recipe = await Recipe.findById(req.params.id);
        if (recipe == null) {
            return res.status(404).json({ message: 'Cannot find recipe' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.recipe = recipe;
    next();
}

// Update a recipe
router.put('/:id', getRecipe, async (req, res) => {
    if (req.body.title != null) {
        res.recipe.title = req.body.title;
    }
    // ... (similarly check and update other fields)

    try {
        const updatedRecipe = await res.recipe.save();
        res.json(updatedRecipe);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a recipe
router.delete('/:id', getRecipe, async (req, res) => {
    try {
        await res.recipe.remove();
        res.json({ message: 'Recipe deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
