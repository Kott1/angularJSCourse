(function () {
    angular
      .module('data')
      .service('MenuDataService', MenuDataService);
  
    MenuDataService.$inject = ['$http'];
    function MenuDataService($http) {
      const service = this;
  
      service.getAllCategories = function () {
        return $http
          .get('https://coursera-jhu-default-rtdb.firebaseio.com/categories.json')
          .then((response) => response.data);
      };
  
      service.getItemsForCategory = function (categoryShortName) {
        return $http
          .get(
            `https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/${categoryShortName}.json`
          )
          .then((response) => response.data.menu_items);
      };
    }
})();  