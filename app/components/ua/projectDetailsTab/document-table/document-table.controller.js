(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaDocumentTableController', uaDocumentTableController);

    uaDocumentTableController.$inject = ['$scope', '$state', 'ProjectService', 'UAService', 'ProjectDocumentTemplateService', 'ProjectDocumentService', 'ProjectManagerService', 'ProjectContactService', 'ConsultantService', 'ConfirmModalService', 'MessageBoxService', 'ModalService'];

    function uaDocumentTableController($scope, $state, ProjectService, UAService, ProjectDocumentTemplateService, ProjectDocumentService, ProjectManagerService, ProjectContactService, ConsultantService, ConfirmModalService, MessageBoxService, ModalService) {
        $scope.projectService = ProjectService;
        $scope.projectContactService = ProjectContactService;
        $scope.projectManagerService = ProjectManagerService;
        $scope.consultantService = ProjectService;
        $scope.projectDocumentService = ProjectDocumentService;
        $scope.projectDocumentTemplateService = ProjectDocumentTemplateService;
        $scope.publish = {
            project: $state.params.id,
            manager: ProjectManagerService.currentProjectManagers && angular.equals(ProjectManagerService.currentProjectManagers, {}) ?
                null : ProjectManagerService.currentProjectManagers[Object.keys(ProjectManagerService.currentProjectManagers)[0]].id,
            contact: ProjectContactService.currentProjectContacts && angular.equals(ProjectContactService.currentProjectContacts, {}) ?
                null : ProjectContactService.currentProjectContacts[Object.keys(ProjectContactService.currentProjectContacts)[0]].id,
            consultant: ConsultantService.currentProjectConsultants && angular.equals(ConsultantService.currentProjectConsultants, {}) ?
                null : ConsultantService.currentProjectConsultants[Object.keys(ConsultantService.currentProjectConsultants)[0]].id
        };

        $scope.resetForm = function () {
            $scope.publish = {project: $state.params.id};
        };

        $scope.publishDocument = function (template) {
            $scope.publish.template = template.id;
            if ($scope.publishForm.$valid) {
                UAService.publishProjectDocument($scope.publish, template.label, ProjectService.selectedProject.number).success(function (data) {
                    MessageBoxService.showSuccess(
                        "Publipostage réussi !",
                        "Le téléchargement devrait démarrer."
                    );
                }).error(function (data) {
                    MessageBoxService.showError(
                        "Echec du publipostage !",
                        "Impossible de générer le document."
                    );
                });
            } else {
                MessageBoxService.showError(
                    "Données manquantes !",
                    "Impossible de publiposter un document si le chargé d'affaires et le contact ne sont pas selectionnés."
                );
            }
        };

        ProjectDocumentTemplateService.getAllProjectDocumentTemplates(true);
    }
})();
