(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaDisableFormController', uaDisableFormController);

    uaDisableFormController.$inject = ['$scope', 'ProjectService', 'MessageBoxService', 'project'];

    function uaDisableFormController($scope, ProjectService, MessageBoxService, project) {
        $scope.project = project;

        $scope.resetForm = function () {
            $scope.project = {};
            $scope.disableForm.$setPristine();
        };

        $scope.disableProject = function () {
            ProjectService.disableProject(project)
                .success(function (data) {
                    $('#disable_project_form_modal').modal('hide');
                    $scope.resetForm();
                    MessageBoxService.showSuccess(
                        "Opération réussie !",
                        "L'étude a été mise en stand-by."
                    );
                }).error(function (data) {
                    $('#disable_project_form_modal').modal('hide');
                    MessageBoxService.showError(
                        "Echec de la désactivation...",
                        "L'étude n'a pas pu être mise en stand-by. Vérifiez que la date de réactivation est cohérente."
                    );
                }
            );
        };
    }

})();
