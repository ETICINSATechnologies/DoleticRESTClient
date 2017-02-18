(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('toolsController', toolsController);

    toolsController.$inject = ['$scope', '$state', 'KernelService'];

    function toolsController($scope, $state, KernelService) {
        $scope.$state = $state;
        $scope.kernelService = KernelService;

        KernelService.getUserRights();
    }
})();