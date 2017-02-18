(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcContactDetailsTabController', grcContactDetailsTabController);

    grcContactDetailsTabController.$inject = ['$scope', '$state', 'MessageBoxService', 'ContactService', 'ConfirmModalService', 'ContactActionService', 'ModalService'];

    function grcContactDetailsTabController($scope, $state, MessageBoxService, ContactService, ConfirmModalService, ContactActionService, ModalService) {

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
                                "Le type du contact est inconnu."
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

        $scope.updateHistory = function () {
            ContactActionService.getContactActionsByContact($state.params.id, false);
        };

        $scope.showContactForm = function () {
            if (ContactService.selectedContact.type) {
                var args = {
                    templateUrl: "app/components/grc/prospectTab/prospect-form/prospect-form.template.html",
                    controller: "grcProspectFormController",
                    inputs: {
                        editMode: true,
                        prospect: ContactService.selectedContact
                    }
                };
                switch (ContactService.selectedContact.type.id) {
                    case 1:
                        break;
                    case 2:
                        args.templateUrl = "app/components/grc/contactedProspectTab/contactedProspect-form/contactedProspect-form.template.html";
                        args.controller = "grcContactedProspectFormController";
                        delete args.inputs.prospect;
                        args.inputs.contactedProspect = ContactService.selectedContact;
                        break;
                    case 3:
                        args.templateUrl = "app/components/grc/clientTab/client-form/client-form.template.html";
                        args.controller = "grcClientFormController";
                        delete args.inputs.prospect;
                        args.inputs.client = ContactService.selectedContact;
                        break;
                    case 4:
                        args.templateUrl = "app/components/grc/oldClientTab/oldClient-form/oldClient-form.template.html";
                        args.controller = "grcOldClientFormController";
                        delete args.inputs.prospect;
                        args.inputs.oldClient = ContactService.selectedContact;
                        break;
                    default:
                        MessageBoxService.showError(
                            "Erreur !",
                            "Le type du contact est inconnu."
                        );
                        return;
                        break;
                }
                ModalService.showModal(args).then(function (modal) {
                    modal.element.modal('show');
                }).catch(function (error) {
                    // error contains a detailed error message.
                    console.log(error);
                });
            } else {
                MessageBoxService.showError(
                    "Erreur !",
                    "Le type du contact n'est pas défini."
                );
            }
        };
    }
})();