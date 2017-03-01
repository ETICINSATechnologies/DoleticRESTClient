(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaTaskTableController', uaTaskTableController);

    uaTaskTableController.$inject = ['$scope', '$state', 'TaskService', 'ConfirmModalService', 'MessageBoxService', 'ModalService'];

    function uaTaskTableController($scope, $state, TaskService, ConfirmModalService, MessageBoxService, ModalService) {
        $scope.taskService = TaskService;

        $scope.showTaskForm = function (task) {
            ModalService.showModal({
                templateUrl: "app/components/ua/projectDetailsTab/task-form/task-form.template.html",
                controller: "uaTaskFormController",
                inputs: {
                    editMode: true,
                    task: angular.copy(task)
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };

        $scope.switchTasks = function (task, up) {
            TaskService.switchTasks(task, up).success(function (data) {
                MessageBoxService.showSuccess(
                    "Opération réussie !",
                    "L'ordre des phases a été modifié."
                );
            }).error(function (data) {
                MessageBoxService.showError(
                    "Erreur !",
                    "L'ordre des phases n'a pas pu être modifié."
                );
            });
        };

        $scope.deleteTask = function (task) {
            ConfirmModalService.showConfirmModal(
                "Confirmer la suppression",
                "Voulez-vous vraiment supprimer la phase ?",
                "remove",
                function () {
                    TaskService.deleteTask(task).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Suppression réussie !",
                            "La phase a été supprimée."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la suppression...",
                            "La phase n'a pas pu être supprimée."
                        );
                    });
                }
            );
        };

    }
})();
