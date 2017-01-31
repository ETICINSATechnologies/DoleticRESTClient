(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcOldClientTableController', grcOldClientTableController);

    grcOldClientTableController.$inject = ['$scope', '$state', 'OldClientService', 'SharedVariables', 'DTOptionsBuilder', 'DTColumnDefBuilder'];

    function grcOldClientTableController($scope, $state, OldClientService, SharedVariables, DTOptionsBuilder, DTColumnDefBuilder) {
        console.log($scope.users);
        $scope.users = {};
        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(20);
        $scope.dtColumnDefs = [];
        $scope.goToOldClientDetailsTab = goToOldClientDetailsTab;

        function getAllOldClientData() {
            OldClientService.getAllOldClients()
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
        
        function goToOldClientDetailsTab(user) {
            SharedVariables.grc.selectedOldClient = user;
            $state.go("grc.userDetailsTab");
        }

        getAllOldClientData();
    }
})();
