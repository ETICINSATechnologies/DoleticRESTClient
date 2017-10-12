(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaProjectDetailsTabController', uaProjectDetailsTabController);

    uaProjectDetailsTabController.$inject = ['$scope', '$state', 'MessageBoxService', 'ProjectManagerService', 'ProjectContactService', 'ConsultantService', 'ProjectService', 'ConfirmModalService', 'ModalService', 'UserService'];

    function uaProjectDetailsTabController($scope, $state, MessageBoxService, ProjectManagerService, ProjectContactService, ConsultantService, ProjectService, ConfirmModalService, ModalService, UserService) {

        $scope.projectService = ProjectService;
        $scope.projectManagerService = ProjectManagerService;
        $scope.projectContactService = ProjectContactService;
        $scope.consultantService = ConsultantService;
        $scope.userService = UserService;

        $scope.loadProject = function (cache) {
            ProjectService.getProjectDetails($state.params.id, cache).success(function (data) {

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

        $scope.showDisableForm = function () {
            ModalService.showModal({
                templateUrl: "app/components/ua/unsignedTab/disable-form/disable-form.template.html",
                controller: "uaDisableFormController",
                inputs: {
                    project: angular.copy(ProjectService.selectedProject)
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };

        $scope.enableSelectedProject = function () {
            var number = ProjectService.selectedProject.number;
            ConfirmModalService.showConfirmModal(
                "Confirmer la réactivation",
                "Voulez-vous vraiment réactiver l'étude " + number + " ?",
                "remove",
                function () {
                    ProjectService.enableProject(angular.copy(ProjectService.selectedProject)).success(function (data) {
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

        $scope.showTaskForm = function () {
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

        $scope.showDeliveryForm = function () {
            ModalService.showModal({
                templateUrl: "app/components/ua/projectDetailsTab/delivery-form/delivery-form.template.html",
                controller: "uaDeliveryFormController",
                inputs: {
                    editMode: false,
                    delivery: {}
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };

        $scope.showAmendmentForm = function () {
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

        $scope.showSignForm = function () {
            ModalService.showModal({
                templateUrl: "app/components/ua/projectDetailsTab/sign-form/sign-form.template.html",
                controller: "uaSignFormController",
                inputs: {
                    project: angular.copy(ProjectService.selectedProject)
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };

        $scope.showSendDateForm = function () {
            ModalService.showModal({
                templateUrl: "app/components/ua/projectDetailsTab/sendDate-form/sendDate-form.template.html",
                controller: "uaSendDateFormController",
                inputs: {
                    project: angular.copy(ProjectService.selectedProject)
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };

        $scope.showEndForm = function () {
            ModalService.showModal({
                templateUrl: "app/components/ua/projectDetailsTab/end-form/end-form.template.html",
                controller: "uaEndFormController",
                inputs: {
                    project: angular.copy(ProjectService.selectedProject)
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };

        $scope.unsignSelectedProject = function () {
            var number = ProjectService.selectedProject.number;
            ConfirmModalService.showConfirmModal(
                "Confirmer l'annulation",
                "Voulez-vous vraiment annuler la signature de l'étude " + number + " ?",
                "remove",
                function () {
                    ProjectService.unsignProject(angular.copy(ProjectService.selectedProject)).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Annulation réussie !",
                            "La signature de l'étude " + number + " a été annulée."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de l'annulation...",
                            "La signature de l'étude n'a pas pu être annulée..."
                        );
                    });

                }
            );
        };

        $scope.unendSelectedProject = function () {
            var number = ProjectService.selectedProject.number;
            ConfirmModalService.showConfirmModal(
                "Confirmer l'annulation",
                "Voulez-vous vraiment annuler la clôture de l'étude " + number + " ?",
                "remove",
                function () {
                    ProjectService.unendProject(angular.copy(ProjectService.selectedProject)).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Annulation réussie !",
                            "La clôture de l'étude " + number + " a été annulée."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de l'annulation...",
                            "La clôture de l'étude n'a pas pu être annulée..."
                        );
                    });

                }
            );
        };

        UserService.getAllUsers(true);
    }
})();