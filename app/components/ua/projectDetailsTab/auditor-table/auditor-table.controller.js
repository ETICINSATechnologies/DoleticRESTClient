(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaAuditorTableController', uaAuditorTableController);

    uaAuditorTableController.$inject = ['$scope', '$state', 'UserService', 'ProjectService', 'ConfirmModalService', 'MessageBoxService', 'UAService'];

    function uaAuditorTableController($scope, $state, UserService, ProjectService, ConfirmModalService, MessageBoxService, UAService) {
        $scope.project = angular.copy(ProjectService.selectedProject);
        $scope.editMode = !ProjectService.selectedProject.auditor;
        $scope.userService = UserService;
        $scope.projectService = ProjectService;
        $scope.uaService = UAService;

        $scope.resetForm = function () {
            $scope.editMode = !ProjectService.selectedProject.auditor;
            $scope.project = {};
        };

        $scope.setAuditor = function () {
            ConfirmModalService.showConfirmModal(
                "Confirmer l'affectation",
                "Voulez-vous vraiment affecter le correspondant qualité à l'étude ?",
                "user",
                function () {
                    ProjectService.setProjectAuditor($scope.project).success(function (data) {
                        $scope.resetForm();
                        MessageBoxService.showSuccess(
                            "Affectation réussie !",
                            "Le correspondant qualité a été affecté à l'étude."
                        );
                    }).error(function (data) {
                        $scope.resetForm();
                        MessageBoxService.showError(
                            "Echec de l'affectation...",
                            "Le correspondant qualité n'a pas pu être affecté à l'étude."
                        );
                    });
                }
            );
        };

        $scope.updateAuditor = function () {
            $scope.project = angular.copy(ProjectService.selectedProject);
            $scope.editMode = true;
        };
    }
})();
