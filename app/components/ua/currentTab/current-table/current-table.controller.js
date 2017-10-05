(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaCurrentTableController', uaCurrentTableController);

    uaCurrentTableController.$inject = ['$scope', 'ProjectService', 'DTOptionsBuilder', 'ConfirmModalService', 'MessageBoxService', 'ModalService', 'UAService', 'UserService'];

    function uaCurrentTableController($scope, ProjectService, DTOptionsBuilder, ConfirmModalService, MessageBoxService, ModalService, UAService, UserService) {
        $scope.projectService = ProjectService;
        $scope.uaService = UAService;
        $scope.userService = UserService;

        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(25)
            .withOption('stateSave', true)
            .withColumnFilter({
                aoColumns:[
                    {type: "text"},
                    {type: "text"},
                    {type: "text"},
                    {type: "text"},
                    {type: "text"},
                    {type: "text"},
                    {type: "text"},
                    {type: "text"},
                    {type: "reset-button"}
                ]
            });
        $scope.dtColumnDefs = [];

        $scope.archiveProject = function (project) {
            var number = project.number;
            ConfirmModalService.showConfirmModal(
                "Confirmer l'archivage",
                "Voulez-vous vraiment archiver l'étude " + number + " ?",
                "archive",
                function () {
                    ProjectService.archiveCurrentProject(project).success(function (data) {
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

        $scope.showDisableForm = function (project) {
            ModalService.showModal({
                templateUrl: "app/components/ua/unsignedTab/disable-form/disable-form.template.html",
                controller: "uaDisableFormController",
                inputs: {
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
