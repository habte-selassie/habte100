const express = require('express');
const router = express.Router();
const { createRating, updateRating, deleteRating } = require('../controllers/ratingController');

// Route to create a new rating
router.post('/', createRating);

// Route to update an existing rating
router.put('/:ratingId', updateRating);

// Route to delete a rating
router.delete('/:ratingId', deleteRating);

module.exports = router;
