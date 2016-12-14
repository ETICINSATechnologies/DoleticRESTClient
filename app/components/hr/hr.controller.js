(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrController', hrController);

    hrController.$inject = ['$scope', '$state'];

    function hrController($scope, $state) {
        $scope.$state = $state;
    }
})();