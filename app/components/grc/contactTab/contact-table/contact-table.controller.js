(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcContactTableController', grcContactTableController);

    grcContactTableController.$inject = ['$scope', '$state', 'ContactService', 'SharedVariables', 'DTOptionsBuilder', 'DTColumnDefBuilder'];

    function grcContactTableController($scope, $state, ContactService, SharedVariables, DTOptionsBuilder, DTColumnDefBuilder) {
        console.log($scope.users);
        $scope.users = {};
        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(20);
        $scope.dtColumnDefs = [];
        $scope.goToContactDetailsTab = goToContactDetailsTab;

        function getAllContactData() {
            ContactService.getAllContacts()
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
        
        function goToContactDetailsTab(user) {
            SharedVariables.grc.selectedContact = user;
            $state.go("grc.userDetailsTab");
        }

        getAllContactData();
    }
})();
