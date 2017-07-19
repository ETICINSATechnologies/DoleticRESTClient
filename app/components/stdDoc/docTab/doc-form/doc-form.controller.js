(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('stdDocFormController', stdDocFormController);

    stdDocFormController.$inject = ['$scope', 'close', '$filter', 'MessageBoxService', 'DocumentTemplateService', 'Upload'];

    function stdDocFormController($scope, close, $filter, MessageBoxService, DocumentTemplateService, Upload) {

        $scope.resetForm = function () {
            $scope.document = {};
            $scope.document.visibility = all;
            $scope.docForm.$setPristine();
            $scope.editMode = false;
        };

        $scope.uploadTemplateDocument = function () {
            var f = document.getElementById('file').files[0],
                r = new FileReader();

            r.onloadend = function(e) {
                $scope.document.file=e.target.result;

                DocumentTemplateService.uploadTemplateDocument($scope.document)
                    .success(
                        function () {
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
                        function () {
                            $('#document_form_modal').modal('hide');
                            MessageBoxService.showError(
                                "Echec de l'ajout...",
                                "Le document n'a pas pu être ajouté."
                            );
                        }
                    )


            };
            r.readAsBinaryString(f);
        };


    }

})();
