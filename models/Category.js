const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
 // Field for storing image URL of the category icon
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'RecipeCategory' }, // Reference to parent category

  imageUrl: String, 
  description: String,
  recipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});



const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
