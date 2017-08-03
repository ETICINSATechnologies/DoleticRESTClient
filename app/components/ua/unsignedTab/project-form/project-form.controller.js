(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaProjectFormController', uaProjectFormController);

    uaProjectFormController.$inject = ['$scope', 'close', 'ProjectService', 'ProjectFieldService', 'ProjectOriginService', 'FirmService', 'MessageBoxService', 'UserService', 'UAService', 'editMode', 'project', 'ContactService'];

    function uaProjectFormController($scope, close, ProjectService, ProjectFieldService, ProjectOriginService, FirmService, MessageBoxService, UserService, UAService, editMode, project, ContactService) {

        if (project !== {}) formatProject();
        $scope.project = project;
        $scope.editMode = editMode ? editMode : false;
        $scope.projectFieldService = ProjectFieldService;
        $scope.projectOriginService = ProjectOriginService;
        $scope.firmService = FirmService;
        $scope.contactService = ContactService;
        $scope.userService = UserService;

        $scope.resetForm = function () {
            $scope.project = {};
            $scope.projectForm.$setPristine();
            $scope.editMode = false;
        };

        $scope.addProject = function () {
            ProjectService.postProject($scope.project)
                .success(function (data) {
                    $('#project_form_modal').modal('hide');
                    $scope.resetForm();
                    MessageBoxService.showSuccess(
                        "Opération réussie !",
                        "L'étude a été ajoutée."
                    );
                    close();
                }).error(function (data) {
                    $('#project_form_modal').modal('hide');
                    MessageBoxService.showError(
                        "Echec de l'ajout...",
                        "L'étude n'a pas pu être ajoutée."
                    );
                }
            );
        };

        $scope.editProject = function () {
            var number = $scope.project.number;
            ProjectService.putProject($scope.project)
                .success(function (data) {
                    $('#project_form_modal').modal('hide');
                    $scope.resetForm();
                    MessageBoxService.showSuccess(
                        "Opération réussie !",
                        "L'étude " + number + " a été modifiée !"
                    );
                    close();
                }).error(function (data) {
                    $('#project_form_modal').modal('hide');
                    MessageBoxService.showError(
                        "Echec de la modification...",
                        "L'étude n'a pas pu être modifiée.");
                }
            );
        };

        ProjectFieldService.getAllProjectFields(true);
        ProjectOriginService.getAllProjectOrigins(true);
        FirmService.getAllFirms(true);
        ContactService.getAllContacts(false);
        UserService.getAllCurrentUsers(false);

        function formatProject() {
            if (project.firm) project.firm = project.firm.id;
            if (project.contacts) project.contacts = project.contacts.id;
            if (project.field) project.field = project.field.id;
            if (project.origin) project.origin = project.origin.id;
        }
    }

})();
