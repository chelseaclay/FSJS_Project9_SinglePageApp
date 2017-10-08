(function () {
  'use strict';

  angular.module('app')
    .controller('RecipesController', function($scope, dataService, $location) {

      // Gets all of the recipes
      dataService.allRecipes(function(response) {
        // console.log(response.data);
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

      // Clicking the recipe “Delete” button deleted that recipes.
      $scope.deleteRecipe = function(recipe, $index) {
        var confirmation = confirm('Are you sure you would like to delete this recipe?');

        // if the user is sure
        if (confirmation == true) {
          // delete the recipe
          dataService.deleteRecipeForID(recipe, function() {
            $scope.recipes.splice($index, 1);
          });
        }
      };

      // Clicking the recipe “Add” button adds a new recipe
      $scope.addRecipe = function() {
        $location.url('/add');
      };

    })
})();
