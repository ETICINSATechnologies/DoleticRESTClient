(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcContactDetailsTabController', grcContactDetailsTabController);

    grcContactDetailsTabController.$inject = ['$scope', '$state', 'MessageBoxService', 'ContactService', 'ConfirmModalService'];

    function grcContactDetailsTabController($scope, $state, MessageBoxService, ContactService, ConfirmModalService) {

        $scope.contactService = ContactService;

        $scope.loadContact = function () {
            ContactService.getContactDetails($state.params.id, true).success(function (data) {

            }).error(function (data) {
                MessageBoxService.showError(
                    "Echec du chargement",
                    "Le contact n'a pas pu être chargé. Il est possible qu'un autre utilisateur vienne de le supprimer."
                );
            });
        };

        $scope.deleteCurrentContact = function () {
            var service = null;
            var name = ContactService.selectedContact.fullName;
            ConfirmModalService.showConfirmModal(
                "Confirmer la suppression",
                "Voulez-vous vraiment supprimer le prospect " + name + " ?",
                "remove user",
                function () {
                    var redirect = 'firmTab';

                    switch (ContactService.selectedContact.type.id) {
                        case 1:
                            service = ContactService.deleteProspect;
                            redirect = 'prospectTab';
                            break;
                        case 2:
                            service = ContactService.deleteContactedProspect;
                            redirect = 'contactedProspectTab';
                            break;
                        case 3:
                            service = ContactService.deleteClient;
                            redirect = 'clientTab';
                            break;
                        case 4:
                            service = ContactService.deleteOldClient;
                            redirect = 'oldClientTab';
                            break;
                        default:
                            MessageBoxService.showError(
                                "Erreur !",
                                "Le type du contact n'est pas reconnu."
                            );
                            break;
                    }
                    if (service) {
                        service(ContactService.selectedContact.id).success(function (data) {
                            MessageBoxService.showSuccess(
                                "Suppression réussie !",
                                "Le contact " + name + " a été supprimé."
                            );
                            $state.go('grc.' + redirect);
                        }).error(function (data) {
                            MessageBoxService.showError(
                                "Echec de la suppression...",
                                "Le contact n'a pas pu être supprimé..."
                            );
                        });
                    }
                }
            );
        };
    }
})();