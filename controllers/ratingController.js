const Rating = require('../models/Rating');
const Item = require('../models/Item'); // Assuming there's an Item model
const User = require('../models/User'); // Assuming there's a User model
const Notification = require('../models/Notification'); // Assuming there's a Notification model

// Controller to handle creating a new rating
exports.createRating = async (req, res) => {
  try {
    // Validate input
    if (!req.body.item || !req.body.rating || !req.body.user) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    // Check if the user is authenticated
    const isAuthenticated = await authenticateUser(req.body.user);
    if (!isAuthenticated) {
      return res.status(401).json({ success: false, error: 'Unauthorized access' });
    }

    // Check if the item exists
    const item = await Item.findById(req.body.item);
    if (!item) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }

    // Check if the rating value is valid
    const isValidRating = validateRating(req.body.rating);
    if (!isValidRating) {
      return res.status(400).json({ success: false, error: 'Invalid rating value' });
    }

    // Check if the user has already rated the item
    const existingRating = await Rating.findOne({ item: req.body.item, user: req.body.user });
    if (existingRating) {
      return res.status(400).json({ success: false, error: 'You have already rated this item' });
    }

    // Create the rating
    const rating = await Rating.create(req.body);

    // Optionally, notify the user about the new rating
    await notifyUser(req.body.user, req.body.item);

    res.status(201).json({ success: true, data: rating });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Controller method to get review details by rating ID
exports.getReview = async (req, res) => {
  try {
    // Retrieve rating ID from request parameters
    const ratingId = req.params.ratingId;

    // Retrieve rating details from the database
    const rating = await Rating.findById(ratingId);

    // Check if the rating exists
    if (!rating) {
      return res.status(404).json({ success: false, error: 'Rating not found' });
    }

    // Return the rating details
    res.status(200).json({ success: true, data: rating });
  } catch (error) {
    // Handle errors
    console.error('Error retrieving review:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};



// Controller to handle updating a rating
exports.updateRating = async (req, res) => {
  try {
    // Validate input
    if (!req.body.rating) {
      return res.status(400).json({ success: false, error: 'Missing rating field' });
    }

    // Check if the rating exists
    const rating = await Rating.findById(req.params.ratingId);
    if (!rating) {
      return res.status(404).json({ success: false, error: 'Rating not found' });
    }

    // Check if the user is authorized to update the rating
    if (rating.user.toString() !== req.body.user) {
      return res.status(403).json({ success: false, error: 'You are not authorized to update this rating' });
    }

    // Update the rating
    rating.rating = req.body.rating;
    const updatedRating = await rating.save();

    res.status(200).json({ success: true, data: updatedRating });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Controller to handle deleting a rating
exports.deleteRating = async (req, res) => {
  try {
    // Check if the rating exists
    const rating = await Rating.findById(req.params.ratingId);
    if (!rating) {
      return res.status(404).json({ success: false, error: 'Rating not found' });
    }

    // Check if the user is authorized to delete the rating
    if (rating.user.toString() !== req.body.user) {
      return res.status(403).json({ success: false, error: 'You are not authorized to delete this rating' });
    }

    // Delete the rating
    await rating.remove();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
};





// Validate the rating value against a valid range (e.g., 1 to 5)
const validateRating = (ratingValue) => {
  return ratingValue >= 1 && ratingValue <= 5;
};

// Authenticate the user based on the user ID
const authenticateUser = async (userId) => {
  const user = await User.findById(userId);
  return user !== null; // Return true if the user exists (authenticated), false otherwise
};

// Optionally, notify the user about the new rating
const notifyUser = async (userId, itemId) => {
  const notification = new Notification({
    user: userId,
    message: `Your item ${itemId} received a new rating.`,
    read: false // Mark the notification as unread initially
  });
  await notification.save();
};

