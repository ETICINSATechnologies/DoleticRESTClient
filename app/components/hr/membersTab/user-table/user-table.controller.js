(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrUserTableController', hrUserTableController);

    hrUserTableController.$inject = ['$scope', '$state', 'UserService'];

    function hrUserTableController($scope, $state, UserService) {
        $scope.users = {};

        function getAllUserData() {
            UserService.getAllUsers()
                .success(
                    function (data) {
                        console.log(data);
                    }
                ).error(
                    function (data) {
                        console.log(data);
                    }
                );
        }

        getAllUserData();
    }
})();
