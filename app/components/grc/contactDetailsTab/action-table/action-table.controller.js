(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcActionTableController', grcActionTableController);

    grcActionTableController.$inject = ['$scope', '$state', 'ContactActionService', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'ConfirmModalService', 'MessageBoxService'];

    function grcActionTableController($scope, $state, ContactActionService, DTOptionsBuilder, DTColumnDefBuilder, ConfirmModalService, MessageBoxService) {
        $scope.contactActionService = ContactActionService;

        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(25)
            .withOption('stateSave', true);
        $scope.dtColumnDefs = [];

        $scope.deleteAction = function (id) {

        };

        ContactActionService.getContactActionsByContact($state.params.id, true);
    }
})();
