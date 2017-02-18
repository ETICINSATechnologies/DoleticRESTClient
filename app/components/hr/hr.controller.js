(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrController', hrController);

    hrController.$inject = ['$scope', '$state', 'RHService', 'KernelService'];

    function hrController($scope, $state, RHService, KernelService) {
        $scope.$state = $state;
        $scope.rhService = RHService;
        $scope.kernelService = KernelService;

        RHService.getUserRights(true);
        KernelService.getUserRights(true);
    }
})();