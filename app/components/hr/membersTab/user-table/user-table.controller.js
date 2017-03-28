(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrUserTableController', hrUserTableController);

    hrUserTableController.$inject = ['$scope', '$state', 'UserService', 'SharedVariables', 'DTOptionsBuilder', 'DTColumnDefBuilder'];

    function hrUserTableController($scope, $state, UserService, SharedVariables, DTOptionsBuilder, DTColumnDefBuilder) {
        $scope.userService = UserService;
        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(20);
        $scope.dtColumnDefs = [];
        $scope.goToUserDetailsTab = goToUserDetailsTab;
        
        function goToUserDetailsTab(user) {
            SharedVariables.rh.selectedUser = user;
            $state.go("hr.userDetailsTab");
        }

        UserService.getAllUsers(true);
    }
})();
