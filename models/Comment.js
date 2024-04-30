// models/Comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
     required: true
     },

  recipe: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Recipe',
     required: true
     },

  text: {
     type: String,
     required: true
     },

  commentNumber: { 
    type: Number,
    default: 0
    }, // Start comment number from 0
  
  allComments: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
   }],

  timestamp: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
