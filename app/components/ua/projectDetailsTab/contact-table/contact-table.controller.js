(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaContactTableController', uaContactTableController);

    uaContactTableController.$inject = ['$scope', '$state', 'ContactService', 'ProjectService', 'ProjectContactService', 'ConfirmModalService', 'MessageBoxService'];

    function uaContactTableController($scope, $state, ContactService, ProjectService, ProjectContactService, ConfirmModalService, MessageBoxService) {
        $scope.projectContact = {};
        $scope.contactService = ContactService;
        $scope.projectService = ProjectService;
        $scope.projectContactService = ProjectContactService;
        $scope.prix = 0;

        $scope.resetForm = function () {
            $scope.projectContact = {};
        };

        $scope.addProjectContact = function () {
            if (!ProjectService.selectedProject) {
                MessageBoxService.showError(
                    "Impossible d'ajouter le contact...",
                    "L'étude en cours de consultation n'a pas été chargée correctement."
                );
            }
            ProjectContactService.postProjectContact(ProjectService.selectedProject.id, $scope.projectContact)
                .success(function (data) {
                    $scope.resetForm();
                    MessageBoxService.showSuccess(
                        "Opération réussie !",
                        "Le contact de l'étude a été ajouté."
                    );
                }).error(function (data) {
                    MessageBoxService.showError(
                        "Echec de l'ajout...",
                        "Le contact de l'étude n'a pas pu être ajouté."
                    );
                }
            );
        };

        $scope.deleteProjectContact = function (id) {
            ConfirmModalService.showConfirmModal(
                "Confirmer la suppression",
                "Voulez-vous vraiment supprimer le contact de l'étude ?",
                "remove user",
                function () {
                    ProjectContactService.deleteProjectContact(id).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Suppression réussie !",
                            "Le contact de l'étude a été supprimé."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la suppression...",
                            "Le contact de l'étude n'a pas pu être supprimé."
                        );
                    });
                }
            );
        };

        ContactService.getAllContactsByFirm(ProjectService.selectedProject.firm.id, true);
    }
})();
