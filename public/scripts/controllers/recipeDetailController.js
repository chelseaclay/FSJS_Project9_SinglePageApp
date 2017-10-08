// (function () {
  'use strict';

  angular.module('app')
    .controller('RecipeDetailController', function($scope, dataService, $location, $routeParams) {

      if (dataService.isEditing.setting == undefined) {
        $scope.setting = false;
        console.log($scope.setting);
      } else {
        $scope.setting = dataService.isEditing.setting;
        console.log($scope.setting);
      }

      $scope.setting = function(status) {
        dataService.isEditing.setting = status;
        $scope.setting = dataService.isEditing(status).setting;
        console.log($scope.setting);
      }

      // display recipe that already exists
      if($location.url() === '/edit/' + $routeParams.id){
        // Updates the recipe for the specified ID
        dataService.recipeForID($routeParams.id, function(response) {
            $scope.recipe = response.data;
        });
      }

      // Gets all of the categories
      dataService.allCategories(function(response) {
        $scope.allCategories = response.data;
      });

      // Gets all of the food items
      dataService.allFood(function(response) {
        $scope.allFood = response.data;
      });

      // delete the recipe ingredient
      $scope.deleteIngredient = function($index) {
        $scope.recipe.ingredients.splice($index, 1);
      };

      // add the recipe ingredient
      $scope.addIngredient = function(recipe) {
        recipe.ingredients.push({
          "foodItem": "",
          "condition": "",
          "amount": ""
        })
      };

      // delete the recipe step
      $scope.deleteStep = function($index) {
        $scope.recipe.steps.splice($index, 1);
      };

      // add the recipe step
      $scope.addStep = function(recipe) {
        recipe.steps.push({
          "description": ""
        })
      };

      //save recipe
      $scope.saveRecipe = function(recipe) {
        // if editing an existing recipe
        if(`/edit/${recipe._id}` === $location.url()) {
          dataService.updateRecipeForID(recipe, function(response) {
            $scope.recipe = response.data;
          });
        // else add new recipe to list
      } else {
        dataService.addRecipe(recipe, function(response) {
          $scope.recipe = response.data;
        });
      }
      // redirect to home page
      $location.url('/');
      };

      $scope.cancelBtn = function() {
        // set editing back to false
        $scope.editing = false;
        // redirect to home page
        $location.url('/');
      };

      //variables to hold new recipes
        $scope.recipe = {};
        $scope.recipe.ingredients = [];
        $scope.recipe.steps = [];

    })
// })();
