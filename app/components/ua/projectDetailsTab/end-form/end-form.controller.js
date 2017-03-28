(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaEndFormController', uaEndFormController);

    uaEndFormController.$inject = ['$scope', 'close', '$state', '$filter', 'ProjectService', 'MessageBoxService', 'project'];

    function uaEndFormController($scope, close, $state, $filter, ProjectService, MessageBoxService, project) {

        if (project != {}) formatProject();
        $scope.project = project;

        $scope.resetForm = function () {
            $scope.project = {};
            $scope.endForm.$setPristine();
        };

        $scope.endProject = function () {
            ProjectService.endProject($scope.project)
                .success(
                    function (data) {
                        $('#end_form_modal').modal('hide');
                        $scope.resetForm();
                        MessageBoxService.showSuccess(
                            "Opération réussie !",
                            "L'étude a été endée."
                        );
                        close();
                    }
                )
                .error(
                    function (data) {
                        $('#end_form_modal').modal('hide');
                        MessageBoxService.showError(
                            "Echec de la clôture...",
                            "L'étude n'a pas pu être endée."
                        );
                        close();
                    }
                )
        };

        function formatProject() {
            if (project.endDate) project.endDate = $filter('date')(project.endDate, "dd/MM/y");
        }
    }

})();
