// Import necessary modules
const Recipe = require('../models/Recipe');
const NutritionService = require('../services/NutritionService');

// Controller functions for managing nutrition-related operations

// Calculate nutrition information for a recipe
const calculateNutrition = async (req, res) => {
    try {
        // Retrieve recipe ID from request parameters
        const recipeId = req.params.recipeId;

        // Retrieve recipe from the database
        const recipe = await Recipe.findById(recipeId);

        // Check if the recipe exists
        if (!recipe) {
            return res.status(404).json({ success: false, message: 'Recipe not found' });
        }

        // Calculate nutrition information for the recipe
        const nutritionInfo = NutritionService.calculateNutrition(recipe);

        // Return the calculated nutrition information
        res.status(200).json({ success: true, nutrition: nutritionInfo });
    } catch (error) {
        // Handle errors
        console.error('Error calculating nutrition:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Export controller functions
module.exports = {
    calculateNutrition
};
