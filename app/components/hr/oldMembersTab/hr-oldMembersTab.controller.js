(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrOldMembersTabController', hrOldMembersTabController);

    hrOldMembersTabController.$inject = ['$scope', 'UserService', 'KernelService'];

    function hrOldMembersTabController($scope, UserService, KernelService) {
        $scope.userService = UserService;
        $scope.kernelService = KernelService;
    }
})();