(function () {
  'use strict';

  angular.module('app')
    .service('dataService', function($http) {
      // test for set up
      this.helloWorld = function() {
        console.log("This is the data service's method!!");
      };

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
      this.recipeForID = function(callback) {
        $http.get('http://localhost:5000/api/recipes/{id}')
          .then(callback)
      };

      // Updates the recipe for the specified ID
      this.updateRecipeForID = function(callback) {
        $http.put('http://localhost:5000/api/recipes/{id}')
          .then(callback)
      };

      // Adds a recipe
      this.addRecipe = function(callback) {
        $http.post('http://localhost:5000/api/recipes')
          .then(callback)
      };

      // Deletes the recipe for the specified ID
      this.deleteRecipeForID = function(recipe, callback) {
        $http.delete(`http://localhost:5000/api/recipes/${recipe._id}`)
          .then(callback)
      };

    });
})();
