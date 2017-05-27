(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcOldClientTableController', grcOldClientTableController);

    grcOldClientTableController.$inject = ['$scope', 'ContactService', 'DTOptionsBuilder', 'ConfirmModalService', 'MessageBoxService', 'ModalService', 'GRCService', 'UserService'];

    function grcOldClientTableController($scope, ContactService, DTOptionsBuilder, ConfirmModalService, MessageBoxService, ModalService, GRCService, UserService) {
        $scope.contactService = ContactService;
        $scope.grcService = GRCService;
        $scope.userService = UserService;

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

        $scope.toProspect = function (oldClient) {
            var name = oldClient.fullName;
            ConfirmModalService.showConfirmModal(
                "Confirmer la modification",
                "Voulez-vous vraiment demander une nouvelle prospection pour " + name + " ?",
                "reply all",
                function () {
                    ContactService.oldClientToProspect(oldClient).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Modification réussie !",
                            "L'ancien client " + name + " a été marqué comme à prospecter."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la modification...",
                            "L'ancien client " + name + " n'a pas pu être marqué comme à prospecter."
                        );
                    });
                }
            );
        };

        $scope.toClient = function (oldClient) {
            var name = oldClient.fullName;
            ConfirmModalService.showConfirmModal(
                "Confirmer la modification",
                "Voulez-vous vraiment marquer " + name + " comme client actuel ?",
                "reply",
                function () {
                    ContactService.oldClientToClient(oldClient).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Modification réussie !",
                            "L'ancien client " + name + " a été marqué comme client actuel."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la modification...",
                            "L'ancien client " + name + " n'a pas pu être marqué comme client actuel."
                        );
                    });
                }
            );
        };

        ContactService.getAllOldClients(true);
    }
})();
