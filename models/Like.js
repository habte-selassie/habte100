// models/Like.js
const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  user: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User', 
     required: true
     },

  recipe: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Recipe',
     required: true,
     unique : true, // Ensure only one like document per post
     },

   count: { type: Number, default: 0 }, // Number of likes for the post

   timestamp: { type: Date, default: Date.now }
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
