(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrDisabledMembersTabController', hrDisabledMembersTabController);

    hrDisabledMembersTabController.$inject = ['$scope', 'UserService', 'KernelService'];

    function hrDisabledMembersTabController($scope, UserService, KernelService) {
        $scope.userService = UserService;
        $scope.kernelService = KernelService;
    }
})();