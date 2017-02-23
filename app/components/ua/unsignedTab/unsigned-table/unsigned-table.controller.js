(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaUnsignedTableController', uaUnsignedTableController);

    uaUnsignedTableController.$inject = ['$scope', '$state', 'ProjectService', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'ConfirmModalService', 'MessageBoxService', 'ModalService', 'UAService', 'UserService'];

    function uaUnsignedTableController($scope, $state, ProjectService, DTOptionsBuilder, DTColumnDefBuilder, ConfirmModalService, MessageBoxService, ModalService, UAService, UserService) {
        $scope.projectService = ProjectService;
        $scope.uaService = UAService;
        $scope.userService = UserService;

        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(25)
            .withOption('stateSave', true);
        $scope.dtColumnDefs = [];

        $scope.deleteUnsignedProject = function (id) {
            var number = ProjectService.archivedProjects[id].number;
            ConfirmModalService.showConfirmModal(
                "Confirmer la suppression",
                "Voulez-vous vraiment supprimer l'étude " + number + " ?",
                "remove",
                function () {
                    ProjectService.deleteUnsignedProject(id).success(function (data) {
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

        $scope.abortProject = function (project) {
            var number = project.number;
            ConfirmModalService.showConfirmModal(
                "Confirmer l'avortement",
                "Voulez-vous vraiment avorter la sollicitation " + number + " ?",
                "reply",
                function () {
                    ProjectService.abortUnsignedProject(id).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Avortement réussi !",
                            "La sollicitation " + number + " a été avortée."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de l'avortement...",
                            "La sollicitation " + number + " n'a pas pu être avortée."
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

        ProjectService.getAllUnsignedProjects(true);
    }
})();
