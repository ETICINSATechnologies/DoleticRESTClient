(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaController', uaController);

    uaController.$inject = ['$scope', '$state', 'UAService', 'ProjectService'];

    function uaController($scope, $state, UAService, ProjectService) {
        $scope.$state = $state;
        $scope.uaService = UAService;
        $scope.projectService = ProjectService;

        UAService.getUserRights();
    }
})();