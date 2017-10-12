(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('stdDocFormController', stdDocFormController);

    stdDocFormController.$inject = ['$scope', 'editMode', 'template', 'DocumentTemplateService'];

    function stdDocFormController($scope, editMode, template, DocumentTemplateService) {

        $scope.template = template;
        $scope.editMode = editMode;

        $scope.resetForm = function () {
            $scope.template = {};
            $scope.template.visibility = all;
            $scope.docForm.$setPristine();
            $scope.editMode = false;
        };


        $scope.uploadTemplateDocument = function () {
            if(angular.isDefined($scope.template.id)) {
                DocumentTemplateService.disableDocumentTemplate($scope.template.id);
            }
            DocumentTemplateService.sendRequest($scope.template, '/ua/standard_document_template');
        };


    }

})();
