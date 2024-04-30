const Recipe = require('../models/Recipe');

// Controller method to classify recipes by cuisine
exports.getRecipesByCuisine = async (req, res) => {
  try {
    const { cuisine } = req.params;
    const recipes = await Recipe.find({ categories: cuisine });
    res.status(200).json({ success: true, data: recipes });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Controller method to classify recipes by meal type
exports.getRecipesByMealType = async (req, res) => {
  try {
    const { mealType } = req.params;
    const recipes = await Recipe.find({ categories: mealType });
    res.status(200).json({ success: true, data: recipes });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Controller method to classify recipes by ingredients
exports.getRecipesByIngredients = async (req, res) => {
  try {
    const { ingredient } = req.params;
    const recipes = await Recipe.find({ categories: ingredient });
    res.status(200).json({ success: true, data: recipes });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Controller method to classify recipes by dietary restrictions
exports.getRecipesByDietaryRestrictions = async (req, res) => {
  try {
    const { restriction } = req.params;
    const recipes = await Recipe.find({ categories: restriction });
    res.status(200).json({ success: true, data: recipes });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
