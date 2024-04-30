// Import necessary modules
const axios = require('axios');

// Service for calculating nutrition information

// Function to calculate nutrition information for a recipe
const calculateNutrition = async (recipe) => {
    try {
        // Construct request payload
        const payload = {
            title: recipe.title,
            ingredients: recipe.ingredients.join(', ')
        };

        // Make POST request to a nutrition API (e.g., Spoonacular)
        const response = await axios.post('https://api.spoonacular.com/recipes/parseIngredients', {
            ...payload,
            apiKey: process.env.SPOONACULAR_API_KEY // Your API key
        });

        // Extract nutrition information from the response
        const { calories, carbs, fat, protein } = response.data;

        // Return the calculated nutrition information
        return { calories, carbs, fat, protein };
    } catch (error) {
        // Handle errors
        console.error('Error calculating nutrition:', error);
        throw new Error('Failed to calculate nutrition information');
    }
};

// Export service functions
module.exports = {
    calculateNutrition
};
