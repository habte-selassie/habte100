const mongoose = require('mongoose');

const shareSchema = new mongoose.Schema({
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true
  },
  sharedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sharedTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  sharedAt: {
    type: Date,
    default: Date.now
  }
});

const Share = mongoose.model('Share', shareSchema);

module.exports = Share;
