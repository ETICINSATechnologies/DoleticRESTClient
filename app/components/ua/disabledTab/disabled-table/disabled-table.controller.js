(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaDisabledTableController', uaDisabledTableController);

    uaDisabledTableController.$inject = ['$scope', '$state', 'ProjectService', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'ConfirmModalService', 'MessageBoxService', 'ModalService', 'UAService', 'UserService'];

    function uaDisabledTableController($scope, $state, ProjectService, DTOptionsBuilder, DTColumnDefBuilder, ConfirmModalService, MessageBoxService, ModalService, UAService, UserService) {
        $scope.projectService = ProjectService;
        $scope.uaService = UAService;
        $scope.userService = UserService;

        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(25)
            .withOption('stateSave', true);
        $scope.dtColumnDefs = [];

        $scope.deleteDisabledProject = function (id) {
            var number = ProjectService.disabledProjects[id].number;
            ConfirmModalService.showConfirmModal(
                "Confirmer la suppression",
                "Voulez-vous vraiment supprimer l'étude " + number + " ?",
                "remove",
                function () {
                    ProjectService.deleteDisabledProject(id).success(function (data) {
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

        $scope.enableProject = function (project) {
            var number = project.number;
            ConfirmModalService.showConfirmModal(
                "Confirmer la réactivation",
                "Voulez-vous vraiment réactiver l'étude " + number + " ?",
                "reply",
                function () {
                    ProjectService.enableProject(id).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Réactivation réussie !",
                            "L'étude " + number + " a été réactivée."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la réactivation...",
                            "L'étude " + number + " n'a pas pu être réactivée."
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

        ProjectService.getAllDisabledProjects(true);
    }
})();
