const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  carbohydrates: Number,
  proteins: Number,
  fats: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Nutrition = mongoose.model('Nutrition', nutritionSchema);

module.exports = Nutrition;
