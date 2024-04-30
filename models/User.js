const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  profilePicture: {
    type: String,
    default: "YOUR_DEFAULT_AVATAR_URL",
  },
  
  jwtToken: {
    type: String,
  },
   // New fields for tracking user interactions
   likedRecipes: [{ 
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Recipe'
     }],

   sharedRecipes: [{ 
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Recipe' 
    }],

   comments: [{ 
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Comment'
     }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
