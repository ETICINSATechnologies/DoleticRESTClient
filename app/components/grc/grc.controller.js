(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcController', grcController);

    grcController.$inject = ['$scope', '$state', 'SharedVariables'];

    function grcController($scope, $state, SharedVariables) {
        $scope.$state = $state;
        $scope.sharedVariables = SharedVariables;
    }
})();