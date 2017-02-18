(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcOldClientTableController', grcOldClientTableController);

    grcOldClientTableController.$inject = ['$scope', '$state', 'ContactService', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'ConfirmModalService', 'MessageBoxService', 'ModalService'];

    function grcOldClientTableController($scope, $state, ContactService, DTOptionsBuilder, DTColumnDefBuilder, ConfirmModalService, MessageBoxService, ModalService) {
        $scope.contactService = ContactService;

        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(25)
            .withOption('stateSave', true);
        $scope.dtColumnDefs = [];

        $scope.deleteOldClient = function (id) {
            console.log(ContactService.oldClients);
            var name = ContactService.oldClients[id].fullName;
            ConfirmModalService.showConfirmModal(
                "Confirmer la suppression",
                "Voulez-vous vraiment supprimer l'ancien client " + name + " ?",
                "remove user",
                function () {
                    ContactService.deleteOldClient(id).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Suppression réussie !",
                            "L'ancien client " + name + " a été supprimé."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la suppression...",
                            "L'ancien client " + name + " n'a pas pu être supprimé. Vérifiez qu'il n'est pas référencé ailleurs."
                        );
                    });
                }
            )
        };

        $scope.showOldClientForm = function (oldClient) {
            ModalService.showModal({
                templateUrl: "app/components/grc/oldClientTab/oldClient-form/oldClient-form.template.html",
                controller: "grcOldClientFormController",
                inputs: {
                    editMode: true,
                    oldClient: angular.copy(oldClient)
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };

        ContactService.getAllOldClients(true);
    }
})();
