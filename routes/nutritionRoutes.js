const express = require('express');
const router = express.Router();
const { calculateNutrition } = require('../controllers/nutritionController');

// Route to calculate nutrition information for a recipe
router.get('/:recipeId/nutrition', calculateNutrition);

module.exports = router;
