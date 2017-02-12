(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcFirmTableController', grcFirmTableController);

    grcFirmTableController.$inject = ['$scope', '$state', 'FirmService', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'ConfirmModalService', 'MessageBoxService'];

    function grcFirmTableController($scope, $state, FirmService, DTOptionsBuilder, DTColumnDefBuilder, ConfirmModalService, MessageBoxService) {
        $scope.firmService = FirmService;

        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(25)
            .withOption('stateSave', true);
        $scope.dtColumnDefs = [];

        $scope.deleteFirm = function (id) {
            var name = FirmService.firms[id].name;
            ConfirmModalService.showConfirmModal(
                "Confirmer la suppression",
                "Voulez-vous vraiment supprimer la société " + name + " ?",
                "remove",
                function () {
                    FirmService.deleteFirm(id).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Suppression réussie !",
                            "La société " + name + " a été supprimée."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la suppression...",
                            "La société " + name + " n'a pas pu être supprimée. Vérifiez qu'elle n'est pas référencée ailleurs."
                        );
                    });
                }
            )
        };

        FirmService.getAllFirms(true);
    }
})();
