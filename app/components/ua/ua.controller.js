(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaController', uaController);

    uaController.$inject = ['$scope', '$state', 'UAService'];

    function uaController($scope, $state, UAService) {
        $scope.$state = $state;
        $scope.uaService = UAService;

        UAService.getUserRights();
    }
})();