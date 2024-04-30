const express = require('express');
const router = express.Router();
const { createRecipe, getRecipes, getRecipeById, updateRecipe, deleteRecipe } = require('../controllers/recipeController');

// Route to create a new recipe
router.post('/', createRecipe);

// Route to get all recipes
router.get('/', getRecipes);

// Route to get a single recipe by ID
router.get('/:id', getRecipeById);

// Route to update a recipe by ID
router.put('/:id', updateRecipe);

// Route to delete a recipe by ID
router.delete('/:id', deleteRecipe);

module.exports = router;
