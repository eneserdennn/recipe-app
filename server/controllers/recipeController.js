const asyncHandler = require("express-async-handler");

const Recipe = require("../models/recipeModel");

const ingrs = ["Tavuk", "Karabiber"];

// @desc Get Recipes
// @route GET /api/goals
// @access Private
const getRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({
    // ingredients: { $all: req.body.ingredients },
  });
  // get method with /api/recipes/search?ingredients=Tavuk,Karabiber

  res.status(200).json(recipes);
});

// @desc Get Recipes from array of ingredients
// @route GET /api/recipesfilter
// @access Private

// @desc Set Recipe
// @route POST /api/recipes
// @access Private
const setRecipe = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({
    ingredients: { $all: req.body.ingredients },
  });

  res.status(200).json(recipes);
});

// @desc Update Recipe
// @route PUT /api/recipes/:id
// @access Private
const updateRecipe = asyncHandler(async (req, res) => {
  res.status(200).json(`message: Update Recipe ${req.params.id}`);
});

// @desc Delete Recipe
// @route DELETE /api/recipes/:id
// @access Private
const deleteRecipe = asyncHandler(async (req, res) => {
  res.status(200).json(`message: Delete Recipe ${req.params.id}`);
});

module.exports = {
  getRecipes,
  setRecipe,
  updateRecipe,
  deleteRecipe,
};
