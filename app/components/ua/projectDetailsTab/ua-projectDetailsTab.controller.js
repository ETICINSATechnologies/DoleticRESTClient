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

        $scope.deleteCurrentProject = function () {
            var service = null;
            var name = ProjectService.selectedProject.fullName;
            ConfirmModalService.showConfirmModal(
                "Confirmer la suppression",
                "Voulez-vous vraiment supprimer le prospect " + name + " ?",
                "remove user",
                function () {
                    var redirect = 'firmTab';

                    switch (ProjectService.selectedProject.type.id) {
                        case 1:
                            service = ProjectService.deleteProspect;
                            redirect = 'prospectTab';
                            break;
                        case 2:
                            service = ProjectService.deleteProjectedProspect;
                            redirect = 'contactedProspectTab';
                            break;
                        case 3:
                            service = ProjectService.deleteClient;
                            redirect = 'clientTab';
                            break;
                        case 4:
                            service = ProjectService.deleteOldClient;
                            redirect = 'oldClientTab';
                            break;
                        default:
                            MessageBoxService.showError(
                                "Erreur !",
                                "Le type du contact est inconnu."
                            );
                            break;
                    }
                    if (service) {
                        service(ProjectService.selectedProject.id).success(function (data) {
                            MessageBoxService.showSuccess(
                                "Suppression réussie !",
                                "Le contact " + name + " a été supprimé."
                            );
                            $state.go('ua.' + redirect);
                        }).error(function (data) {
                            MessageBoxService.showError(
                                "Echec de la suppression...",
                                "Le contact n'a pas pu être supprimé..."
                            );
                        });
                    }
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

        UserService.getAllUsers(true);
    }
})();