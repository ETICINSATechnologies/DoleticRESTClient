(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcActionTableController', grcActionTableController);

    grcActionTableController.$inject = ['$scope', '$state', 'ContactService', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'ConfirmModalService', 'MessageBoxService', 'ContactActionService'];

    function grcActionTableController($scope, $state, ContactService, DTOptionsBuilder, DTColumnDefBuilder, ConfirmModalService, MessageBoxService, ContactActionService) {
        $scope.contactService = ContactService;

        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(25)
            .withOption('stateSave', true);
        $scope.dtColumnDefs = [];

        $scope.deleteAction = function (id) {

        };
    }
})();
