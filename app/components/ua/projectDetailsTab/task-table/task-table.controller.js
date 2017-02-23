(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaTaskTableController', uaTaskTableController);

    uaTaskTableController.$inject = ['$scope', '$state', 'TaskService', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'ConfirmModalService', 'MessageBoxService', 'ModalService'];

    function uaTaskTableController($scope, $state, TaskService, DTOptionsBuilder, DTColumnDefBuilder, ConfirmModalService, MessageBoxService, ModalService) {
        $scope.contactTaskService = TaskService;

        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(25)
            .withOption('stateSave', true);
        $scope.dtColumnDefs = [];

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

        $scope.deleteTask = function (id) {
            ConfirmModalService.showConfirmModal(
                "Confirmer la suppression",
                "Voulez-vous vraiment supprimer la phase ?",
                "remove",
                function () {
                    TaskService.deleteTask(id).success(function (data) {
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

        TaskService.getTasksByProject($state.params.id, true);
    }
})();
