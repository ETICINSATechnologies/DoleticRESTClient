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

        $scope.showProjectForm = function () {
            if (ProjectService.selectedProject.type) {
                var args = {
                    templateUrl: "app/components/ua/prospectTab/prospect-form/prospect-form.template.html",
                    controller: "uaProspectFormController",
                    inputs: {
                        editMode: true,
                        prospect: ProjectService.selectedProject
                    }
                };
                switch (ProjectService.selectedProject.type.id) {
                    case 1:
                        break;
                    case 2:
                        args.templateUrl = "app/components/ua/contactedProspectTab/contactedProspect-form/contactedProspect-form.template.html";
                        args.controller = "uaProjectedProspectFormController";
                        delete args.inputs.prospect;
                        args.inputs.contactedProspect = ProjectService.selectedProject;
                        break;
                    case 3:
                        args.templateUrl = "app/components/ua/clientTab/client-form/client-form.template.html";
                        args.controller = "uaClientFormController";
                        delete args.inputs.prospect;
                        args.inputs.client = ProjectService.selectedProject;
                        break;
                    case 4:
                        args.templateUrl = "app/components/ua/oldClientTab/oldClient-form/oldClient-form.template.html";
                        args.controller = "uaOldClientFormController";
                        delete args.inputs.prospect;
                        args.inputs.oldClient = ProjectService.selectedProject;
                        break;
                    default:
                        MessageBoxService.showError(
                            "Erreur !",
                            "Le type du contact est inconnu."
                        );
                        return;
                        break;
                }
                ModalService.showModal(args).then(function (modal) {
                    modal.element.modal('show');
                }).catch(function (error) {
                    // error contains a detailed error message.
                    console.log(error);
                });
            } else {
                MessageBoxService.showError(
                    "Erreur !",
                    "Le type du contact n'est pas défini."
                );
            }
        };

        $scope.showProjectActionForm = function () {
            ModalService.showModal({
                templateUrl: "app/components/ua/contactDetailsTab/action-form/action-form.template.html",
                controller: "uaActionFormController",
                inputs: {
                    editMode: false,
                    action: {}
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