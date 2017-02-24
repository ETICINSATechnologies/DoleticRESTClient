(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaAmendmentTableController', uaAmendmentTableController);

    uaAmendmentTableController.$inject = ['$scope', '$state', 'AmendmentService', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'ConfirmModalService', 'MessageBoxService', 'ModalService'];

    function uaAmendmentTableController($scope, $state, AmendmentService, DTOptionsBuilder, DTColumnDefBuilder, ConfirmModalService, MessageBoxService, ModalService) {
        $scope.contactAmendmentService = AmendmentService;

        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(25)
            .withOption('stateSave', true);
        $scope.dtColumnDefs = [];

        $scope.showAmendmentForm = function (amendment) {
            ModalService.showModal({
                templateUrl: "app/components/ua/projectDetailsTab/amendment-form/amendment-form.template.html",
                controller: "uaAmendmentFormController",
                inputs: {
                    editMode: true,
                    amendment: angular.copy(amendment)
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };

        $scope.deleteAmendment = function (id) {
            ConfirmModalService.showConfirmModal(
                "Confirmer la suppression",
                "Voulez-vous vraiment supprimer l'avenant ?",
                "remove",
                function () {
                    AmendmentService.deleteAmendment(id).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Suppression réussie !",
                            "L'avenant a été supprimé."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la suppression...",
                            "L'avenant n'a pas pu être supprimé."
                        );
                    });
                }
            );
        };

        AmendmentService.getAmendmentsByProject($state.params.id, true);
    }
})();