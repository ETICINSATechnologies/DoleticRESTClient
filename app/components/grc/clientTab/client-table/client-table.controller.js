(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcClientTableController', grcClientTableController);

    grcClientTableController.$inject = ['$scope', '$state', 'ContactService', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'ConfirmModalService', 'MessageBoxService', 'ModalService'];

    function grcClientTableController($scope, $state, ContactService, DTOptionsBuilder, DTColumnDefBuilder, ConfirmModalService, MessageBoxService, ModalService) {
        $scope.contactService = ContactService;

        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(25)
            .withOption('stateSave', true);
        $scope.dtColumnDefs = [];

        $scope.deleteClient = function (id) {
            console.log(ContactService.clients);
            var name = ContactService.clients[id].fullName;
            ConfirmModalService.showConfirmModal(
                "Confirmer la suppression",
                "Voulez-vous vraiment supprimer le client " + name + " ?",
                "remove user",
                function () {
                    ContactService.deleteClient(id).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Suppression réussie !",
                            "Le client " + name + " a été supprimé."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la suppression...",
                            "Le client " + name + " n'a pas pu être supprimé. Vérifiez qu'il n'est pas référencé ailleurs."
                        );
                    });
                }
            )
        };

        $scope.showClientForm = function (client) {
            ModalService.showModal({
                templateUrl: "app/components/grc/clientTab/client-form/client-form.template.html",
                controller: "grcClientFormController",
                inputs: {
                    editMode: true,
                    client: angular.copy(client)
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };

        $scope.toOldClient = function (client) {
            var name = client.fullName;
            ConfirmModalService.showConfirmModal(
                "Confirmer la modification",
                "Voulez-vous vraiment marquer le client " + name + " comme ancien client ?",
                "student",
                function () {
                    ContactService.clientToOldClient(client).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Modification réussie !",
                            "Le client " + name + " a été marqué comme ancien client."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la modification...",
                            "Le client " + name + " n'a pas pu être marqué comme ancien client."
                        );
                    });
                }
            );
        };

        ContactService.getAllClients(true);
    }
})();
