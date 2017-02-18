(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcContactedProspectTableController', grcContactedProspectTableController);

    grcContactedProspectTableController.$inject = ['$scope', '$state', 'ContactService', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'ConfirmModalService', 'MessageBoxService', 'ModalService'];

    function grcContactedProspectTableController($scope, $state, ContactService, DTOptionsBuilder, DTColumnDefBuilder, ConfirmModalService, MessageBoxService, ModalService) {
        $scope.contactService = ContactService;

        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(25)
            .withOption('stateSave', true);
        $scope.dtColumnDefs = [];

        $scope.deleteContactedProspect = function (id) {
            console.log(ContactService.contactedProspects);
            var name = ContactService.contactedProspects[id].fullName;
            ConfirmModalService.showConfirmModal(
                "Confirmer la suppression",
                "Voulez-vous vraiment supprimer le prospect " + name + " ?",
                "remove user",
                function () {
                    ContactService.deleteContactedProspect(id).success(function (data) {
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
            )
        };

        $scope.showContactedProspectForm = function (contactedProspect) {
            ModalService.showModal({
                templateUrl: "app/components/grc/contactedProspectTab/contactedProspect-form/contactedProspect-form.template.html",
                controller: "grcContactedProspectFormController",
                inputs: {
                    editMode: true,
                    contactedProspect: angular.copy(contactedProspect)
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };

        $scope.toProspect = function (contactedProspect) {
            var name = contactedProspect.fullName;
            ConfirmModalService.showConfirmModal(
                "Confirmer la modification",
                "Voulez-vous vraiment demander une nouvelle prospection pour " + name + " ?",
                "reply",
                function () {
                    ContactService.contactedProspectToProspect(contactedProspect).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Modification réussie !",
                            "Le prospect " + name + " a été marqué comme à prospecter."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la modification...",
                            "Le prospect " + name + " n'a pas pu être marqué comme à prospecter."
                        );
                    });
                }
            );
        };

        $scope.toClient = function (contactedProspect) {
            var name = contactedProspect.fullName;
            ConfirmModalService.showConfirmModal(
                "Confirmer la modification",
                "Voulez-vous vraiment marquer " + name + " comme client actuel ?",
                "suitcase",
                function () {
                    ContactService.contactedProspectToClient(contactedProspect).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Modification réussie !",
                            "Le prospect " + name + " a été marqué comme client actuel."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la modification...",
                            "Le prospect " + name + " n'a pas pu être marqué comme client actuel."
                        );
                    });
                }
            );
        };

        ContactService.getAllContactedProspects(true);
    }
})();
