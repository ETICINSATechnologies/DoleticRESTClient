(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcProspectTableController', grcProspectTableController);

    grcProspectTableController.$inject = ['$scope', '$state', 'ContactService', 'SharedVariables', 'DTOptionsBuilder', 'DTColumnDefBuilder'];

    function grcProspectTableController($scope, $state, ContactService, SharedVariables, DTOptionsBuilder, DTColumnDefBuilder) {
        $scope.prospects = {};
        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(20)
            .withOption('stateSave', true);
        $scope.dtColumnDefs = [];

        function getAllProspects() {
            ContactService.getAllContactsByType(1, true)
                .success(
                    function (data) {
                        $scope.prospects = data.contacts;
                    }
                ).error(
                    function (data) {
                        console.log(data);
                    }
                );
        }

        getAllProspects();
    }
})();
