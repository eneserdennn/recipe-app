const express = require("express");
const router = express.Router();
const {
  getRecipes,
  setRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");

router.route("/", getRecipes).get(getRecipes).post(setRecipe);
router.route("/:id", updateRecipe).put(updateRecipe).delete(deleteRecipe);

// get method with /api/recipes/search?ingredients=Tavuk,Karabiber
router.route("/search", getRecipes).get(getRecipes);

module.exports = router;
