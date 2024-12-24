(function () {
    angular
      .module('MenuApp')
      .config(RoutesConfig);
  
    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
  
      $stateProvider
        .state('home', {
          url: '/',
          template: '<h1>Welcome to our Restaurant</h1><a ui-sref="categories">View Categories</a>',
        })
        .state('categories', {
          url: '/categories',
          template: '<categories categories="$resolve.categories"></categories>',
          resolve: {
            categories: ['MenuDataService', function (MenuDataService) {
              return MenuDataService.getAllCategories();
            }],
          },
        })
        .state('items', {
          url: '/items/{categoryShortName}',
          template: '<items items="$resolve.items"></items>',
          resolve: {
            items: [
              'MenuDataService',
              '$stateParams',
              function (MenuDataService, $stateParams) {
                return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
              },
            ],
          },
        });
    }
})();  