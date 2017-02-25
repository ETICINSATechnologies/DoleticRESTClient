(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaManagerTableController', uaManagerTableController);

    uaManagerTableController.$inject = ['$scope', '$state', 'UserService', 'ProjectService', 'ProjectManagerService', 'ConfirmModalService', 'MessageBoxService', 'UAService'];

    function uaManagerTableController($scope, $state, UserService, ProjectService, ProjectManagerService, ConfirmModalService, MessageBoxService, UAService) {
        $scope.projectManager = {};
        $scope.userService = UserService;
        $scope.projectService = ProjectService;
        $scope.projectManagerService = ProjectManagerService;
        $scope.uaService = UAService;

        $scope.resetForm = function () {
            $scope.projectManager = {};
        };

        $scope.addProjectManager = function () {
            if (!ProjectService.selectedProject) {
                MessageBoxService.showError(
                    "Impossible d'ajouter le chargé d'affaires...",
                    "L'étude en cours de consultation n'a pas été chargée correctement."
                );
            }
            ProjectManagerService.postProjectManager(ProjectService.selectedProject.id, $scope.projectManager)
                .success(function (data) {
                    $scope.resetForm();
                    MessageBoxService.showSuccess(
                        "Opération réussie !",
                        "Le chargé d'affaires de l'étude a été ajouté."
                    );
                }).error(function (data) {
                    MessageBoxService.showError(
                        "Echec de l'ajout...",
                        "Le chargé d'affaires de l'étude n'a pas pu être ajouté."
                    );
                }
            );
        };

        $scope.deleteProjectManager = function (id) {
            ConfirmModalService.showConfirmModal(
                "Confirmer la suppression",
                "Voulez-vous vraiment supprimer le chargé d'affaires de l'étude ?",
                "remove user",
                function () {
                    ProjectManagerService.deleteProjectManager(id).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Suppression réussie !",
                            "Le chargé d'affaires de l'étude a été supprimé."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la suppression...",
                            "Le chargé d'affaires de l'étude n'a pas pu être supprimé."
                        );
                    });
                }
            );
        };

        UserService.getAllUsers(true);
        ProjectManagerService.getAllManagersByProject($state.params.id, true);
    }
})();
