(function () {
  'use strict';

  angular.module('app')
    .controller('RecipesController', function($scope, dataService, $location) {
      // test for set up
      $scope.helloWorld = dataService.helloWorld;

      // test for set up
      $scope.addTodo = function() {
        console.log('controller logged message');
      };

      // Gets all of the recipes
      dataService.allRecipes(function(response) {
        console.log(response.data);
        $scope.recipes = response.data;
      });

      // Gets all of the categories
      dataService.allCategories(function(response) {
        $scope.allCategories = response.data;
      });

      // The list of recipes can be filtered by the selected category
      $scope.getRecipesForCategory = function (category) {
        var selectMenu = document.querySelector('select');
        var selectedOption = selectMenu.options[selectMenu.selectedIndex].text;
        console.log(selectOption)

        // If all categories is selected
        if(selectedOption === 'All Categories') {
          dataService.allRecipes(function(response) {
            $scope.recipes = response.data;
          });
        // if a category is selected other than all categories
        } else if(category){
          // Gets all of the recipes for the specified category
          dataService.allRecipesForCategory(category, function(response) {
            $scope.recipes = response.data;
          });
        // if there is no category  
        } else {
          dataService.allRecipes(function(response) {
            $scope.recipes = response.data;
          });
        }
      };

      // // Gets all of the food items
      // dataService.allFood(function(response) {
      //   $scope.recipes = response.data;
      // });

      // Gets the recipe for the specified ID
      // dataService.recipeForID(function(response) {
      //   $scope.recipeForID = response.data;
      // });

      // When a recipe “Edit” button is clicked, the user is taken to the “Recipe Detail” screen, where they can view and edit the details of the recipe.
      // $scope.editRecipe = function(recipe) {
      //   $location.url(`/#/edit/${recipe._id}`);
      // };

      // Clicking the recipe “Delete” button deleted that recipes.
      $scope.deleteRecipe = function(recipe, $index) {
        console.log('recipe ' + $index + ' deleted');
        dataService.deleteRecipeForID(recipe, function() {
          $scope.recipes.splice($index, 1);
        });
      };

      // Clicking the recipe “Add” button adds a new recipe
      $scope.addRecipe = function() {
        $location.url('/add');
      };
    })
})();
