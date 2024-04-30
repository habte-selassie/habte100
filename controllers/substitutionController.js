const Substitution = require("../models/substitutionModel");

// Controller to get all ingredient substitutions
const getAllSubstitutions = async (req, res) => {
  try {
    const substitutions = await Substitution.find();
    res.status(200).json({
      status: "success",
      data: substitutions
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

// Controller to get a single ingredient substitution by ID
const getSubstitutionById = async (req, res) => {
  try {
    const { id } = req.params;
    const substitution = await Substitution.findById(id);
    if (!substitution) {
      return res.status(404).json({
        status: "error",
        message: "Substitution not found"
      });
    }
    res.status(200).json({
      status: "success",
      data: substitution
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

// Controller to add a new ingredient substitution
const addSubstitution = async (req, res) => {
  try {
    const { originalIngredient, substituteIngredient } = req.body;

    // Check if the substitution already exists
    const existingSubstitution = await Substitution.findOne({ originalIngredient, substituteIngredient });
    if (existingSubstitution) {
      return res.status(400).json({
        status: "error",
        message: "This substitution already exists"
      });
    }

    // Create a new substitution
    const substitution = await Substitution.create({ originalIngredient, substituteIngredient });

    res.status(201).json({
      status: "success",
      data: substitution
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

// Controller to update an ingredient substitution
const updateSubstitution = async (req, res) => {
  try {
    const { id } = req.params;
    const { originalIngredient, substituteIngredient } = req.body;

    // Check if the substitution exists
    const substitution = await Substitution.findById(id);
    if (!substitution) {
      return res.status(404).json({
        status: "error",
        message: "Substitution not found"
      });
    }

    // Update the substitution
    substitution.originalIngredient = originalIngredient;
    substitution.substituteIngredient = substituteIngredient;
    await substitution.save();

    res.status(200).json({
      status: "success",
      data: substitution
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

// Controller to delete an ingredient substitution
const deleteSubstitution = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the substitution
    await Substitution.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "Substitution deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

module.exports = { getAllSubstitutions, getSubstitutionById, addSubstitution, updateSubstitution, deleteSubstitution };
