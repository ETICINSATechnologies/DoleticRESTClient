(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('stdDocFormController', stdDocFormController);

    stdDocFormController.$inject = ['$scope', 'close', '$filter', 'MessageBoxService', 'editMode', 'DocumentTemplateService'];

    function stdDocFormController($scope, close, $filter, MessageBoxService, editMode, DocumentTemplateService) {

        $scope.resetForm = function () {
            $scope.document = {};
            $scope.docForm.$setPristine();
            $scope.editMode = false;
        };

        $scope.uploadTemplateDocument = function () {
            DocumentTemplateService.uploadTemplateDocument($scope.document)
                .success(
                    function (data) {
                        $('#document_form_modal').modal('hide');
                        $scope.resetForm();
                        MessageBoxService.showSuccess(
                            "Opération réussie !",
                            "Le document a été ajouté."
                        );
                        close();
                    }
                )
                .error(
                    function (data) {
                        $('#document_form_modal').modal('hide');
                        MessageBoxService.showError(
                            "Echec de l'ajout...",
                            "Le document n'a pas pu être ajouté."
                        );
                    }
                )
        };


    }

})();
