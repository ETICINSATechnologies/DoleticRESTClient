(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcProspectTableController', grcProspectTableController);

    grcProspectTableController.$inject = ['$scope', '$state', 'ContactService', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'ConfirmModalService', 'MessageBoxService'];

    function grcProspectTableController($scope, $state, ContactService, DTOptionsBuilder, DTColumnDefBuilder, ConfirmModalService, MessageBoxService) {
        $scope.contactService = ContactService;

        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(25)
            .withOption('stateSave', true);
        $scope.dtColumnDefs = [];

        $scope.deleteProspect = function (id) {
            var name = ContactService.prospects[id].fullName;
            ConfirmModalService.showConfirmModal(
                "Confirmer la suppression",
                "Voulez-vous vraiment supprimer le prospect " + name + " ?",
                "remove user",
                function () {
                    ContactService.deleteProspect(id).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Suppression réussie !",
                            "Le prospect " + name + " a été supprimé."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la suppression...",
                            "Le prospect " + name + " n'a pas pu être supprimé. Vérifiez qu'il n'est pas référencé ailleurs."
                        );
                    });
                }
            );
        };

        ContactService.getAllProspects(true);
    }
})();
