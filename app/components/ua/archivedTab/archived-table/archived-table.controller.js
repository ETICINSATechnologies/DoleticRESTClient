(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaArchivedTableController', uaArchivedTableController);

    uaArchivedTableController.$inject = ['$scope', '$state', 'ProjectService', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'ConfirmModalService', 'MessageBoxService', 'ModalService', 'UAService', 'UserService'];

    function uaArchivedTableController($scope, $state, ProjectService, DTOptionsBuilder, DTColumnDefBuilder, ConfirmModalService, MessageBoxService, ModalService, UAService, UserService) {
        $scope.projectService = ProjectService;
        $scope.uaService = UAService;
        $scope.userService = UserService;

        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(25)
            .withOption('stateSave', true);
        $scope.dtColumnDefs = [];

        $scope.deleteArchivedProject = function (id) {
            var number = ProjectService.archivedProjects[id].number;
            ConfirmModalService.showConfirmModal(
                "Confirmer la suppression",
                "Voulez-vous vraiment supprimer l'étude " + number + " ?",
                "remove",
                function () {
                    ProjectService.deleteArchivedProject(id).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Suppression réussie !",
                            "L'étude " + number + " a été supprimée."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la suppression...",
                            "L'étude " + number + " n'a pas pu être supprimée."
                        );
                    });
                }
            )
        };

        $scope.restoreProject = function (project) {
            var number = project.number;
            ConfirmModalService.showConfirmModal(
                "Confirmer la restauration",
                "Voulez-vous vraiment restaurer l'étude " + number + " ?",
                "reply",
                function () {
                    ProjectService.restoreArchivedProject(project).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Restauration réussie !",
                            "L'étude " + number + " a été restaurée."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la restauration...",
                            "L'étude " + number + " n'a pas pu être restaurée."
                        );
                    });
                }
            )
        };

        $scope.showProjectForm = function (project) {
            ModalService.showModal({
                templateUrl: "app/components/ua/unsignedTab/project-form/project-form.template.html",
                controller: "uaProjectFormController",
                inputs: {
                    editMode: true,
                    project: angular.copy(project)
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };

        ProjectService.getAllArchivedProjects(true);
    }
})();
