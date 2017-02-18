(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcActionTableController', grcActionTableController);

    grcActionTableController.$inject = ['$scope', '$state', 'ContactActionService', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'ConfirmModalService', 'MessageBoxService', 'ModalService'];

    function grcActionTableController($scope, $state, ContactActionService, DTOptionsBuilder, DTColumnDefBuilder, ConfirmModalService, MessageBoxService, ModalService) {
        $scope.contactActionService = ContactActionService;

        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(25)
            .withOption('stateSave', true);
        $scope.dtColumnDefs = [];

        $scope.showActionForm = function (action) {
            ModalService.showModal({
                templateUrl: "app/components/grc/contactDetailsTab/action-form/action-form.template.html",
                controller: "grcActionFormController",
                inputs: {
                    editMode: true,
                    action: angular.copy(action)
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };

        $scope.deleteAction = function (id) {
            ConfirmModalService.showConfirmModal(
                "Confirmer la suppression",
                "Voulez-vous vraiment supprimer la prise de contact ?",
                "remove",
                function () {
                    ContactActionService.deleteContactAction(id).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Suppression réussie !",
                            "La prise de contact a été supprimée."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la suppression...",
                            "La prise de contact n'a pas pu être supprimée."
                        );
                    });
                }
            );
        };

        ContactActionService.getContactActionsByContact($state.params.id, true);
    }
})();
