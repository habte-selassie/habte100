const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');

// Route to classify recipes by cuisine
router.get('/cuisine/:cuisine', CategoryController.getRecipesByCuisine);

// Route to classify recipes by meal type
router.get('/mealtype/:mealType', CategoryController.getRecipesByMealType);

// Route to classify recipes by ingredients
router.get('/ingredient/:ingredient', CategoryController.getRecipesByIngredients);

// Route to classify recipes by dietary restrictions
router.get('/diet/:restriction', CategoryController.getRecipesByDietaryRestrictions);

module.exports = router;
