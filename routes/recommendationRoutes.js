const express = require('express');
const router = express.Router();
const { fetchRecipeData, preprocessData, extractFeatures, HybridRecommender } = require('../services/recipeService');

// Route to fetch recipe data from the Spoonacular API
router.get('/recipes', async (req, res) => {
    try {
        const recipes = await fetchRecipeData();
        if (!recipes) {
            return res.status(500).json({ success: false, error: 'Failed to fetch recipe data' });
        }
        res.status(200).json({ success: true, data: recipes });
    } catch (error) {
        console.error("Error Fetch recipe data", error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Route to preprocess recipe data
router.get('/recipes/preprocess', async (req, res) => {
    try {
        // Fetch recipe data
        const recipes = await fetchRecipeData();
        if (!recipes) {
            return res.status(500).json({ success: false, error: 'Failed to fetch recipe data' });
        }

        // Preprocess data
        const preprocessedRecipes = preprocessData(recipes);
        
        res.status(200).json({ success: true, data: preprocessedRecipes });
    } catch (error) {
        console.error("Error preprocessing recipe data", error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Route to extract features from recipe data
router.get('/recipes/features', async (req, res) => {
    try {
        // Fetch recipe data
        const recipes = await fetchRecipeData();
        if (!recipes) {
            return res.status(500).json({ success: false, error: 'Failed to fetch recipe data' });
        }

        // Preprocess data
        const preprocessedRecipes = preprocessData(recipes);
        
        // Extract features
        const features = extractFeatures(preprocessedRecipes);
        
        res.status(200).json({ success: true, data: features });
    } catch (error) {
        console.error("Error extracting features from recipe data", error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Route to get hybrid recommendations for a user
router.get('/recommendations/hybrid', async (req, res) => {
    try {
        // Assuming user preferences are available in the request body
        const userPreferences = req.body.userPreferences;

        // Get hybrid recommendations for the user
        const recommendations = HybridRecommender.recommendRecipes(userPreferences);

        res.status(200).json({ success: true, recommendations });
    } catch (error) {
        console.error("Error getting hybrid recommendations", error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

module.exports = router;
