(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('stdDocController', stdDocController);

    stdDocController.$inject = ['$scope', '$state', 'RHService', 'KernelService', 'UserService'];

    function stdDocController($scope, $state, RHService, KernelService, UserService) {
        $scope.$state = $state;
        $scope.rhService = RHService;
        $scope.kernelService = KernelService;
        $scope.userService = UserService;

        RHService.getUserRights(true);
        KernelService.getUserRights(true);
    }
})();