(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('MessageBoxController', MessageBoxController);

    MessageBoxController.$inject = ['$scope', 'SharedVariables'];

    function MessageBoxController($scope, SharedVariables) {
        $scope.sharedVariables = SharedVariables;
    }
})();