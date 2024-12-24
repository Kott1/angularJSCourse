(function () {
    'use strict';
  
    angular.module('LunchCheck', [])
      .controller('LunchCheckController', LunchCheckController);
  
    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
      const vm = this;
      vm.lunchInput = "";
      vm.message = "";
  
      vm.checkLunch = function () {
        if (!vm.lunchInput.trim()) {
          vm.message = "Please enter data first";
          return;
        }
  
        const items = vm.lunchInput.split(',').filter(item => item.trim() !== "");
        if (items.length === 0) {
          vm.message = "Please enter data first";
        } else if (items.length <= 3) {
          vm.message = "Enjoy!";
        } else {
          vm.message = "Too much!";
        }
      };
    }
})();  