(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrDisabledMembersTabController', hrDisabledMembersTabController);

    hrDisabledMembersTabController.$inject = ['$scope', 'UserService'];

    function hrDisabledMembersTabController($scope, UserService) {
        $scope.userService = UserService;
    }
})();