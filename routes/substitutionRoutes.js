const express = require('express');
const router = express.Router();
const {
  getAllSubstitutions,
  getSubstitutionById,
  addSubstitution,
  updateSubstitution,
  deleteSubstitution
} = require('../controllers/substitutionController');

// Route to get all ingredient substitutions
router.get('/', getAllSubstitutions);

// Route to get a single ingredient substitution by ID
router.get('/:id', getSubstitutionById);

// Route to add a new ingredient substitution
router.post('/', addSubstitution);

// Route to update an ingredient substitution
router.put('/:id', updateSubstitution);

// Route to delete an ingredient substitution
router.delete('/:id', deleteSubstitution);

module.exports = router;
