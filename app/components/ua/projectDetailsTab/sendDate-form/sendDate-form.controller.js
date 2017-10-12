(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaSendDateFormController', uaSendDateFormController);

    uaSendDateFormController.$inject = ['$scope', 'close', '$state', '$filter', 'ProjectService', 'MessageBoxService', 'project'];

    function uaSendDateFormController($scope, close, $state, $filter, ProjectService, MessageBoxService, project) {

        if (project != {}) formatProject();
        $scope.project = project;

        $scope.resetForm = function () {
            $scope.project = {};
            $scope.sendDateForm.$setPristine();
        };

        $scope.sendDateProject = function () {
            ProjectService.sendDateProject($scope.project)
                .success(
                    function (data) {
                        $('#sendDate_form_modal').modal('hide');
                        $scope.resetForm();
                        MessageBoxService.showSuccess(
                            "Opération réussie !",
                            "La date a été modifiée."
                        );
                        close();
                    }
                )
                .error(
                    function (data) {
                        $('#sendDate_form_modal').modal('hide');
                        MessageBoxService.showError(
                            "Echec de la modification...",
                            "La date n'a pas été modifiée."
                        );
                        close();
                    }
                )
        };

        function formatProject() {
            if (project.sendDate) project.sendDate = $filter('date')(project.sendDate, "dd/MM/y");
        }
    }

})();
