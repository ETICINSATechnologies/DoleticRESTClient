(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrController', hrController);

    hrController.$inject = ['$scope', '$state', 'SharedVariables'];

    function hrController($scope, $state, SharedVariables) {
        $scope.$state = $state;
        $scope.sharedVariables = SharedVariables;
    }
})();