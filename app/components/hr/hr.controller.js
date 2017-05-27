(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrController', hrController);

    hrController.$inject = ['$scope', '$state', 'RHService', 'KernelService', 'UserService'];

    function hrController($scope, $state, RHService, KernelService, UserService) {
        $scope.$state = $state;
        $scope.rhService = RHService;
        $scope.kernelService = KernelService;
        $scope.userService = UserService;

        RHService.getUserRights(true);
        KernelService.getUserRights(true);
    }
})();