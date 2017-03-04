(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaAmendmentFormController', uaAmendmentFormController);

    uaAmendmentFormController.$inject = ['$scope', 'close', '$state', '$filter', 'AmendmentService', 'AmendmentTypeService', 'MessageBoxService', 'editMode', 'amendment'];

    function uaAmendmentFormController($scope, close, $state, $filter, AmendmentService, AmendmentTypeService, MessageBoxService, editMode, amendment) {

        if (amendment != {}) formatAmendment();
        $scope.amendment = amendment;
        $scope.editMode = editMode ? editMode : false;
        $scope.amendmentTypeService = AmendmentTypeService;
        $scope.amendmentService = AmendmentService;

        $scope.resetForm = function () {
            $scope.amendment = {};
            $scope.amendmentForm.$setPristine();
            $scope.editMode = false;
        };

        $scope.addAmendment = function () {
            $scope.amendment.project = $state.params.id;
            $scope.amendment.types = $scope.amendment.types.split(',');
            AmendmentService.postAmendment($scope.amendment)
                .success(
                    function (data) {
                        $('#amendment_form_modal').modal('hide');
                        $scope.resetForm();
                        MessageBoxService.showSuccess(
                            "Opération réussie !",
                            "L'avenant a été ajouté."
                        );
                        close();
                    }
                )
                .error(
                    function (data) {
                        $('#amendment_form_modal').modal('hide');
                        MessageBoxService.showError(
                            "Echec de l'ajout...",
                            "L'avenant n'a pas pu être ajouté."
                        );
                    }
                )
        };

        $scope.editAmendment = function () {
            $scope.amendment.project = $state.params.id;
            $scope.amendment.types = $scope.amendment.types.split(',');
            AmendmentService.putAmendment($scope.amendment)
                .success(function (data) {
                    $('#amendment_form_modal').modal('hide');
                    $scope.resetForm();
                    MessageBoxService.showSuccess(
                        "Opération réussie !",
                        "L'avenant  a été modifié !"
                    );
                    close();
                }).error(function (data) {
                    $('#amendment_form_modal').modal('hide');
                    MessageBoxService.showError(
                        "Echec de la modification...",
                        "L'avenant n'a pas pu être modifié.");
                }
            );
        };

        function formatAmendment() {
            if (amendment.date) amendment.date = $filter('date')(amendment.date, "dd/MM/y");
            if (amendment.types) {
                var ids = [];
                for (var i in amendment.types) {
                    ids.push(amendment.types[i].id);
                }
                amendment.types = ids;
            }
        }

        AmendmentTypeService.getAllAmendmentTypes(true);
    }

})();
