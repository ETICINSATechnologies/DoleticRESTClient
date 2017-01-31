(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcClientTableController', grcClientTableController);

    grcClientTableController.$inject = ['$scope', '$state', 'ClientService', 'SharedVariables', 'DTOptionsBuilder', 'DTColumnDefBuilder'];

    function grcClientTableController($scope, $state, ClientService, SharedVariables, DTOptionsBuilder, DTColumnDefBuilder) {
        console.log($scope.users);
        $scope.users = {};
        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(20);
        $scope.dtColumnDefs = [];
        $scope.goToClientDetailsTab = goToClientDetailsTab;

        function getAllClientData() {
            ClientService.getAllClients()
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
        
        function goToClientDetailsTab(user) {
            SharedVariables.rh.selectedClient = user;
            $state.go("grc.userDetailsTab");
        }

        getAllClientData();
    }
})();
