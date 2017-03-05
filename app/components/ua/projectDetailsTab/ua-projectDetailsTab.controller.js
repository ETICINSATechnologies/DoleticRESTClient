(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaProjectDetailsTabController', uaProjectDetailsTabController);

    uaProjectDetailsTabController.$inject = ['$scope', '$state', 'MessageBoxService', 'ProjectService', 'ConfirmModalService', 'ModalService', 'UserService'];

    function uaProjectDetailsTabController($scope, $state, MessageBoxService, ProjectService, ConfirmModalService, ModalService, UserService) {

        $scope.projectService = ProjectService;
        $scope.userService = UserService;

        $scope.loadProject = function () {
            ProjectService.getProjectDetails($state.params.id, true).success(function (data) {

            }).error(function (data) {
                MessageBoxService.showError(
                    "Echec du chargement",
                    "L'étude n'a pas pu être chargée. Il est possible qu'un autre utilisateur vienne de la supprimer."
                );
            });
        };

        $scope.showProjectForm = function () {
            ModalService.showModal({
                templateUrl: "app/components/ua/unsignedTab/project-form/project-form.template.html",
                controller: "uaProjectFormController",
                inputs: {
                    editMode: true,
                    project: ProjectService.selectedProject
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };

        $scope.disableSelectedProject = function () {
            var number = ProjectService.selectedProject.number;
            ConfirmModalService.showConfirmModal(
                "Confirmer la désactivation",
                "Voulez-vous vraiment mettre l'étude " + number + " en stand-by ?",
                "remove",
                function () {
                    ProjectService.disableProject(ProjectService.selectedProject).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Désactivation réussie !",
                            "L'étude " + number + " a été mise en stand-by."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la désactivation...",
                            "L'étude n'a pas pu être mise en stand-by..."
                        );
                    });

                }
            );
        };

        $scope.enableSelectedProject = function () {
            var number = ProjectService.selectedProject.number;
            ConfirmModalService.showConfirmModal(
                "Confirmer la réactivation",
                "Voulez-vous vraiment réactiver l'étude " + number + " ?",
                "remove",
                function () {
                    ProjectService.enableProject(ProjectService.selectedProject).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Réactivation réussie !",
                            "L'étude " + number + " a été réactivée."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la réactivation...",
                            "L'étude n'a pas pu être réactivée..."
                        );
                    });

                }
            );
        };

        $scope.showTaskForm = function (task) {
            ModalService.showModal({
                templateUrl: "app/components/ua/projectDetailsTab/task-form/task-form.template.html",
                controller: "uaTaskFormController",
                inputs: {
                    editMode: false,
                    task: {}
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };

        $scope.showAmendmentForm = function (task) {
            ModalService.showModal({
                templateUrl: "app/components/ua/projectDetailsTab/amendment-form/amendment-form.template.html",
                controller: "uaAmendmentFormController",
                inputs: {
                    editMode: false,
                    amendment: {}
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };

        UserService.getAllUsers(true);
    }
})();