(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrUserTableController', hrUserTableController);

    hrUserTableController.$inject = ['$scope', '$state', 'UserService', 'SharedVariables', 'DTOptionsBuilder', 'DTColumnDefBuilder'];

    function hrUserTableController($scope, $state, UserService, SharedVariables, DTOptionsBuilder, DTColumnDefBuilder) {
        $scope.users = {};
        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(20);
        $scope.dtColumnDefs = [];
        $scope.goToUserDetailsTab = goToUserDetailsTab;

        function getAllUserData() {
            UserService.getAllUsers()
                .success(
                    function (data) {
                        $scope.users = data.users;
                        console.log($scope.users);
                    }
                ).error(
                    function (data) {
                        console.log(data);
                    }
                );
        }
        
        function goToUserDetailsTab(user) {
            SharedVariables.rh.selectedUser = user;
            $state.go("hr.userDetailsTab");
        }

        getAllUserData();
    }
})();
