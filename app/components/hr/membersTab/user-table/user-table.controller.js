(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrUserTableController', hrUserTableController);

    hrUserTableController.$inject = ['$scope', '$state', 'UserService', 'SharedVariables'];

    function hrUserTableController($scope, $state, UserService, SharedVariables) {
        $scope.users = {};
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
