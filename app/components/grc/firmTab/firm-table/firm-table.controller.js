(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcFirmTableController', grcFirmTableController);

    grcFirmTableController.$inject = ['$scope', '$state', 'FirmService', 'SharedVariables', 'DTOptionsBuilder', 'DTColumnDefBuilder'];

    function grcFirmTableController($scope, $state, FirmService, SharedVariables, DTOptionsBuilder, DTColumnDefBuilder) {
        $scope.firms = {};
        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(20)
            .withOption('stateSave', true);
        $scope.dtColumnDefs = [];

        function getAllFirms(cache) {
            FirmService.getAllFirms(cache)
                .success(
                    function (data) {
                        $scope.firms = data.firms;
                    }
                ).error(
                function (data) {
                    console.log(data);
                }
            );
        }

        getAllFirms(true);
    }
})();
