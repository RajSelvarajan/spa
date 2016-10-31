(function() {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
  .directive('foundItems', FoundItemsDirective);

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.thtml',
      scope: {
        items: '<',
        onRemove: '&'
      }
    };

    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;

    // search term 
    ctrl.searchTerm ="";
    // List of found items
    ctrl.found = [];

    //Filter Items based on searchTerm
    ctrl.getMatchedMenuItems = function () {
      ctrl.found = [];
      if (ctrl.searchTerm) {
        var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
        promise.then(function (response) {
          ctrl.found = response;
        })
        .catch(function (error) {
          console.log("Something went terribly wrong.");
        });
      }
    };

    // Remove item at given index
    ctrl.removeItem = function (index) {
      ctrl.found.splice(index, 1);
      if (ctrl.found.length == 0) {
        ctrl.error = "Nothing found";
      }
    }
  };


  MenuSearchService.$inject = ['$http', 'ApiBasePath']
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json"),
      }).then(function (result) {

        // process result and only keep items that match
        var items = result.data.menu_items;
        var foundItems = []
        for (var index = 0; index < items.length; index++) {
          // do a case insensitive check by doing toLowerCase
          if (items[index].description.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1) {
            foundItems.push(items[index]);
          }
        }

        // return processed items
        return foundItems;
      });
    };

  };

})();