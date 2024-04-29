const mongoose = require('mongoose');

const substitutionSchema = new mongoose.Schema({
  originalIngredient: {
    type: String,
    required: true
  },
  substitutionIngredient: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Substitution = mongoose.model('Substitution', substitutionSchema);

module.exports = Substitution;
