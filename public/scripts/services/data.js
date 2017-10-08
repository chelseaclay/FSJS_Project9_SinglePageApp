(function () {
  'use strict';

  angular.module('app')
    .service('dataService', function($http) {

      // Gets all of the recipes
      this.allRecipes = function(callback) {
        $http.get('http://localhost:5000/api/recipes')
          .then(callback)
      };

      // Gets all of the categories
      this.allCategories = function(callback) {
        $http.get('http://localhost:5000/api/categories')
          .then(callback)
      };

      // Gets all of the food items
      this.allFood = function(callback) {
        $http.get('http://localhost:5000/api/fooditems')
          .then(callback)
      };

      // Gets all of the recipes for the specified category
      this.allRecipesForCategory = function(category, callback) {
        $http.get(`http://localhost:5000/api/recipes?category=${category.name}`)
          .then(callback)
      };

      // Gets the recipe for the specified ID
      this.recipeForID = function(id, callback) {
        $http.get(`http://localhost:5000/api/recipes/${id}`)
          .then(callback)
      };

      // Updates the recipe for the specified ID
      this.updateRecipeForID = function(recipe) {
        $http.put(`http://localhost:5000/api/recipes/${recipe._id}`, recipe)
      };

      // Adds a recipe
      this.addRecipe = function(recipe) {
        $http.post('http://localhost:5000/api/recipes', recipe)
      };

      // Deletes the recipe for the specified ID
      this.deleteRecipeForID = function(recipe, callback) {
        $http.delete(`http://localhost:5000/api/recipes/${recipe._id}`)
          .then(callback)
      };

      this.isEditing = function(status) {
      	return {
          setting: status
        };
      }

    });
})();
