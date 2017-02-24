(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaCurrentTableController', uaCurrentTableController);

    uaCurrentTableController.$inject = ['$scope', '$state', 'ProjectService', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'ConfirmModalService', 'MessageBoxService', 'ModalService', 'UAService', 'UserService'];

    function uaCurrentTableController($scope, $state, ProjectService, DTOptionsBuilder, DTColumnDefBuilder, ConfirmModalService, MessageBoxService, ModalService, UAService, UserService) {
        $scope.projectService = ProjectService;
        $scope.uaService = UAService;
        $scope.userService = UserService;

        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(25)
            .withOption('stateSave', true);
        $scope.dtColumnDefs = [];

        $scope.archiveProject = function (project) {
            var number = project.number;
            ConfirmModalService.showConfirmModal(
                "Confirmer l'archivage",
                "Voulez-vous vraiment archiver l'étude " + number + " ?",
                "archive",
                function () {
                    ProjectService.archiveCurrentProject(id).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Archivage réussi !",
                            "L'étude " + number + " a été archivée."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de l'archivage...",
                            "L'étude " + number + " n'a pas pu être archivée."
                        );
                    });
                }
            )
        };

        $scope.disableProject = function (project) {
            var number = project.number;
            ConfirmModalService.showConfirmModal(
                "Confirmer la désactivation",
                "Voulez-vous vraiment désactiver la sollicitation " + number + " ?",
                "reply",
                function () {
                    ProjectService.disableUnsignedProject(id).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Désactivation réussie !",
                            "La sollicitation " + number + " a été désactivée."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la désactivation...",
                            "La sollicitation " + number + " n'a pas pu être désactivée."
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

        ProjectService.getAllCurrentProjects(true);
    }
})();