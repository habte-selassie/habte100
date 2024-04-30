const express = require('express');
const router = express.Router();
const { addComment, likeRecipe, shareRecipe, getCommentsByRecipeId } = require('../controllers/interactionController');

// Route to add a comment to a recipe
router.post('/comment', addComment);

// Route to like a recipe
router.post('/like', likeRecipe);

// Route to share a recipe with another user
router.post('/share', shareRecipe);

// Route to get comments for a specific recipe
router.get('/comments/:recipeId', getCommentsByRecipeId);

module.exports = router;
