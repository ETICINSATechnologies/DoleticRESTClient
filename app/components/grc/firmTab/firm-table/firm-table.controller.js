(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcFirmTableController', grcFirmTableController);

    grcFirmTableController.$inject = ['$scope', '$state', 'FirmService', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'ConfirmModalService', 'MessageBoxService', 'ModalService', 'GRCService'];

    function grcFirmTableController($scope, $state, FirmService, DTOptionsBuilder, DTColumnDefBuilder, ConfirmModalService, MessageBoxService, ModalService, GRCService) {
        $scope.firmService = FirmService;
        $scope.grcService = GRCService;

        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(25)
            .withOption('stateSave', true)
            .withColumnFilter({
                aoColumns:[
                    {type: "text"},
                    {type: "text"},
                    {type: "text"},
                    {type: "text"},
                    {type: "text"},
                    {type: "text"},
                    {type: "text"},
                    {type: "reset-button"}
                ]
            });
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

        $scope.showFirmForm = function (firm) {
            ModalService.showModal({
                templateUrl: "app/components/grc/firmTab/firm-form/firm-form.template.html",
                controller: "grcFirmFormController",
                inputs: {
                    editMode: true,
                    firm: angular.copy(firm)
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };

        FirmService.getAllFirms(true);
    }
})();
