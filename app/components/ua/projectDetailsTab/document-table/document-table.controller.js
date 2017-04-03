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

        $scope.downloadDocument = function (id, template) {
            ProjectDocumentService.downloadProjectDocument(id, template.label, ProjectService.selectedProject.number);
        };

        $scope.replaceDocument = function (e, document) {
            var documentData = angular.copy(document);
            if (documentData.template) documentData.template = documentData.template.id;
            documentData.project = $state.params.id;
            documentData.file = e.files[0];

            ProjectDocumentService.putProjectDocument(documentData).success(function (data) {
                MessageBoxService.showSuccess(
                    "Upload réussi !",
                    "Le nouveau fichier a été uploadé !"
                );
            }).error(function (data) {
                MessageBoxService.showError(
                    "Echec de l'upload !",
                    "Impossible d'uploader le document. Vérifiez qu'il est bien au format PDF."
                );
            });
        };

        $scope.triggerUpload = function (event) {
            angular.element(event.target).siblings('input').trigger('click');
        };

        $scope.uploadDocument = function (e, template) {
            ProjectDocumentService.postProjectDocument({
                file: e.files[0],
                project: $state.params.id,
                template: template.id,
                valid: false
            }).success(function (data) {
                MessageBoxService.showSuccess(
                    "Upload réussi !",
                    "Le fichier a été uploadé !"
                );
            }).error(function (data) {
                MessageBoxService.showError(
                    "Echec de l'upload !",
                    "Impossible d'uploader le document. Vérifiez qu'il est bien au format PDF."
                );
            });
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
