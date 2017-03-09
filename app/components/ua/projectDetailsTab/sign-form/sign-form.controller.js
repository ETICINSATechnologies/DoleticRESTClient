(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaSignFormController', uaSignFormController);

    uaSignFormController.$inject = ['$scope', 'close', '$state', '$filter', 'ProjectService', 'MessageBoxService', 'project'];

    function uaSignFormController($scope, close, $state, $filter, ProjectService, MessageBoxService, project) {

        if (project != {}) formatProject();
        $scope.project = project;

        $scope.resetForm = function () {
            $scope.project = {};
            $scope.signForm.$setPristine();
        };

        $scope.signProject = function () {
            ProjectService.signProject($scope.project)
                .success(
                    function (data) {
                        $('#sign_form_modal').modal('hide');
                        $scope.resetForm();
                        MessageBoxService.showSuccess(
                            "Opération réussie !",
                            "L'étude a été signée."
                        );
                        close();
                    }
                )
                .error(
                    function (data) {
                        $('#sign_form_modal').modal('hide');
                        MessageBoxService.showError(
                            "Echec de la signature...",
                            "L'étude n'a pas pu être signée."
                        );
                        close();
                    }
                )
        };

        function formatProject() {
            if (project.signDate) project.signDate = $filter('date')(project.signDate, "dd/MM/y");
        }
    }

})();
