const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  ingredients: [String],

  categories: [{ type: String }], // Array of category names

  instructions: {
    type: String,
    required: true
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Relationship with User model
    required: true
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category' // Relationship with Category model
  },
  
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag' // Relationship with Tag model
  }],
  
  // Fields for tracking interactions on the recipe
  likes: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Like'
   }],

  shares: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Share'
   }],

  comments: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment' 
  }],

  createdAt: {
    type: Date,
    default: Date.now
  }
});


const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;

