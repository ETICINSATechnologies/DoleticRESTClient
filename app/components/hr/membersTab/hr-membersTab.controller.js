(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrMembersTabController', hrMembersTabController);

    hrMembersTabController.$inject = ['$scope', 'UserService', 'KernelService'];

    function hrMembersTabController($scope, UserService, KernelService) {
        $scope.userService = UserService;
        $scope.kernelService = KernelService;
    }
})();