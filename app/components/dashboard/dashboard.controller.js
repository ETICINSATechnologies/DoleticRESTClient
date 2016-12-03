(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope', '$state', 'SharedVariables', 'MessageBoxService'];

    function DashboardController($scope, $state, SharedVariables, MessageBoxService) {

    }
})();