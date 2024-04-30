const Comment = require("../Models/commentModel");
const Like = require("../Models/likeModel");
const Share = require("../Models/shareModel");
const Recipe = require("../Models/recipeModel");

const addComment = async (req, res) => {
  try {
    const { recipeId, text } = req.body;
    const userId = req.user._id;

    // Create a new comment
    const comment = new Comment({ user: userId, recipe: recipeId, text });
    await comment.save();

    // Update comment count for the recipe
    await Recipe.findByIdAndUpdate(recipeId, { $inc: { commentCount: 1 } });

    res.status(200).send({
      status: "success",
      message: "Comment has been created",
    });
  } catch (error) {
    res.status(500).send({
      status: "failure",
      message: error.message,
    });
  }
};

const likeRecipe = async (req, res) => {
  try {
    const { recipeId } = req.body;
    const userId = req.user._id;

    // Check if the user has already liked the recipe
    const existingLike = await Like.findOne({ user: userId, recipe: recipeId });
    if (existingLike) {
      return res.status(400).send({
        status: "failure",
        message: "You have already liked this recipe",
      });
    }

    // Create a new like
    const like = new Like({ user: userId, recipe: recipeId });
    await like.save();

    // Update like count for the recipe
    await Recipe.findByIdAndUpdate(recipeId, { $inc: { likeCount: 1 } });

    res.status(200).send({
      status: "success",
      message: "Recipe has been liked",
    });
  } catch (error) {
    res.status(500).send({
      status: "failure",
      message: error.message,
    });
  }
};

const shareRecipe = async (req, res) => {
  try {
    const { recipeId, recipientId } = req.body;
    const userId = req.user._id;

    // Check if the user has already shared the recipe
    const existingShare = await Share.findOne({ user: userId, recipe: recipeId });
    if (existingShare) {
      return res.status(400).send({
        status: "failure",
        message: "You have already shared this recipe",
      });
    }

    // Create a new share
    const share = new Share({ user: userId, recipe: recipeId, recipient: recipientId });
    await share.save();

    // Update share status for the sharer
    await Share.updateOne({ user: userId, recipe: recipeId }, { status: "shared" });

    // Make the shared recipe visible to the recipient
    await Share.create({ user: recipientId, recipe: recipeId, recipient: userId, status: "received" });

    // Update share count for the recipe
    await Recipe.findByIdAndUpdate(recipeId, { $inc: { shareCount: 1 } });

    res.status(200).send({
      status: "success",
      message: "Recipe has been shared",
    });
  } catch (error) {
    res.status(500).send({
      status: "failure",
      message: error.message,
    });
  }
};

const getCommentsByRecipeId = async (req, res) => {
  const recipeId = req.params.recipeId;
  try {
    // Fetch recipe with comments in chronological order
    const recipe = await Recipe.findOne({ _id: recipeId }).populate({
      path: "comments",
      options: { sort: { createdAt: -1 } } // Sort comments by creation date in descending order
    });

    res.status(200).send({
      status: "success",
      comments: recipe.comments,
    });
  } catch (error) {
    res.status(500).send({
      status: "failure",
      message: error.message,
    });
  }
};

module.exports = { addComment, likeRecipe, shareRecipe, getCommentsByRecipeId };
