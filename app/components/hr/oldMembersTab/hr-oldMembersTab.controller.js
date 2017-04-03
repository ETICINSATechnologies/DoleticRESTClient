(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrOldMembersTabController', hrOldMembersTabController);

    hrOldMembersTabController.$inject = ['$scope', 'UserService'];

    function hrOldMembersTabController($scope, UserService) {
        $scope.userService = UserService;
    }
})();