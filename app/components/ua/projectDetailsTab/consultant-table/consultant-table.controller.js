(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaConsultantTableController', uaConsultantTableController);

    uaConsultantTableController.$inject = ['$scope', '$state', 'UserService', 'ProjectService', 'ConsultantService', 'ConfirmModalService', 'MessageBoxService', 'UAService'];

    function uaConsultantTableController($scope, $state, UserService, ProjectService, ConsultantService, ConfirmModalService, MessageBoxService, UAService) {
        $scope.consultant = {};
        $scope.userService = UserService;
        $scope.projectService = ProjectService;
        $scope.consultantService = ConsultantService;
        $scope.uaService = UAService;

        $scope.resetForm = function () {
            $scope.consultant = {};
            $scope.consultantForm.$setPristine();
        };

        $scope.addConsultant = function () {
            if (!ProjectService.selectedProject) {
                MessageBoxService.showError(
                    "Impossible d'ajouter le consultant...",
                    "L'étude en cours de consultation n'a pas été chargée correctement."
                );
            }
            $scope.consultant.project = ProjectService.selectedProject.id;
            ConsultantService.postConsultant(ProjectService.selectedProject.id, $scope.consultant)
                .success(function (data) {
                    $scope.resetForm();
                    MessageBoxService.showSuccess(
                        "Opération réussie !",
                        "Le consultant de l'étude a été ajouté."
                    );
                }).error(function (data) {
                    MessageBoxService.showError(
                        "Echec de l'ajout...",
                        "Le consultant de l'étude n'a pas pu être ajouté."
                    );
                }
            );
        };

        $scope.deleteConsultant = function (id) {
            ConfirmModalService.showConfirmModal(
                "Confirmer la suppression",
                "Voulez-vous vraiment supprimer le consultant de l'étude ?",
                "remove user",
                function () {
                    ConsultantService.deleteConsultant(id).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Suppression réussie !",
                            "Le consultant de l'étude a été supprimé."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la suppression...",
                            "Le consultant de l'étude n'a pas pu être supprimé."
                        );
                    });
                }
            );
        };

        UserService.getAllUsers(true);
        ConsultantService.getAllConsultantsByProject($state.params.id, true);
    }
})();
