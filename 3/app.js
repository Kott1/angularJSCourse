(function () {
    'use strict';
  
    angular.module('NarrowItDownApp', [])
      .controller('NarrowItDownController', NarrowItDownController)
      .service('MenuSearchService', MenuSearchService);
  
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
      var narrow = this;
      narrow.found = [];
      narrow.searchTerm = "";
      narrow.searched = false;
  
      narrow.narrowItDown = function () {
        if (narrow.searchTerm.trim() === "") {
          narrow.found = [];
          narrow.searched = true;
          return;
        }
  
        MenuSearchService.getMatchedMenuItems(narrow.searchTerm)
          .then(function (result) {
            narrow.found = result;
            narrow.searched = true;
          });
      };
  
      narrow.removeItem = function (index) {
        narrow.found.splice(index, 1);
      };
    }
  
    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
      var service = this;
  
      service.getMatchedMenuItems = function (searchTerm) {
        return $http({
          method: "GET",
          url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"
        }).then(function (response) {
          var foundItems = [];
          var menuItems = response.data;
  
          for (var category in menuItems) {
            menuItems[category].menu_items.forEach(function (item) {
              if (item.description.toLowerCase().includes(searchTerm.toLowerCase())) {
                foundItems.push(item);
              }
            });
          }
  
          return foundItems;
        });
      };
    }
  })();  