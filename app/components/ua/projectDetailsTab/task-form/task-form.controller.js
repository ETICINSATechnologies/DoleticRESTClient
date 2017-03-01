(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaTaskFormController', uaTaskFormController);

    uaTaskFormController.$inject = ['$scope', 'close', '$state', '$filter', 'TaskService', 'ProjectService', 'MessageBoxService', 'editMode', 'task'];

    function uaTaskFormController($scope, close, $state, $filter, TaskService, ProjectService, MessageBoxService, editMode, task) {

        if (task != {}) formatTask();
        $scope.task = task;
        $scope.editMode = editMode ? editMode : false;
        $scope.TaskService = TaskService;

        $scope.resetForm = function () {
            $scope.task = {};
            $scope.taskForm.$setPristine();
            $scope.editMode = false;
        };

        $scope.addTask = function () {
            $scope.task.project = $state.params.id;
            TaskService.postTask($scope.task)
                .success(
                    function (data) {
                        $('#task_form_modal').modal('hide');
                        $scope.resetForm();
                        MessageBoxService.showSuccess(
                            "Opération réussie !",
                            "La phase a été ajoutée."
                        );
                        close();
                    }
                )
                .error(
                    function (data) {
                        $('#task_form_modal').modal('hide');
                        MessageBoxService.showError(
                            "Echec de l'ajout...",
                            "La phase n'a pas pu être ajoutée."
                        );
                        close();
                    }
                )
        };

        $scope.editTask = function () {
            $scope.task.project = $state.params.id;
            TaskService.putTask($scope.task)
                .success(function (data) {
                    $('#task_form_modal').modal('hide');
                    $scope.resetForm();
                    MessageBoxService.showSuccess(
                        "Opération réussie !",
                        "La phase  a été modifiée !"
                    );
                    close();
                }).error(function (data) {
                    $('#task_form_modal').modal('hide');
                    MessageBoxService.showError(
                        "Echec de la modification...",
                        "La phase n'a pas pu être modifiée.");
                }
            );
        };

        function formatTask() {
            console.log(task);
            if (task.startDate) task.startDate = $filter('date')(task.startDate, "dd/MM/y");
            if (task.endDate) task.endDate = $filter('date')(task.endDate, "dd/MM/y");
        }
    }

})();
