(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaDeliveryFormController', uaDeliveryFormController);

    uaDeliveryFormController.$inject = ['$scope', 'close', '$state', '$filter', 'DeliveryService', 'TaskService', 'MessageBoxService', 'editMode', 'delivery'];

    function uaDeliveryFormController($scope, close, $state, $filter, DeliveryService, TaskService, MessageBoxService, editMode, delivery) {

        if (delivery != {}) formatDelivery();
        $scope.delivery = delivery;
        $scope.editMode = editMode ? editMode : false;
        $scope.deliveryService = DeliveryService;
        $scope.taskService = TaskService;

        $scope.resetForm = function () {
            $scope.delivery = {};
            $scope.deliveryForm.$setPristine();
            $scope.editMode = false;
        };

        $scope.addDelivery = function () {
            $scope.delivery.project = $state.params.id;
            DeliveryService.postDelivery($scope.delivery)
                .success(
                    function (data) {
                        $('#delivery_form_modal').modal('hide');
                        $scope.resetForm();
                        MessageBoxService.showSuccess(
                            "Opération réussie !",
                            "Le livrable a été ajoutée."
                        );
                        close();
                    }
                )
                .error(
                    function (data) {
                        $('#delivery_form_modal').modal('hide');
                        MessageBoxService.showError(
                            "Echec de l'ajout...",
                            "Le livrable n'a pas pu être ajoutée."
                        );
                        close();
                    }
                )
        };

        $scope.editDelivery = function () {
            DeliveryService.putDelivery($scope.delivery)
                .success(function (data) {
                    $('#delivery_form_modal').modal('hide');
                    $scope.resetForm();
                    MessageBoxService.showSuccess(
                        "Opération réussie !",
                        "Le livrable  a été modifiée !"
                    );
                    close();
                }).error(function (data) {
                    $('#delivery_form_modal').modal('hide');
                    MessageBoxService.showError(
                        "Echec de la modification...",
                        "Le livrable n'a pas pu être modifiée.");
                }
            );
        };

        function formatDelivery() {
            if (delivery.deliveryDate) delivery.deliveryDate = $filter('date')(delivery.deliveryDate, "dd/MM/y");
            if (delivery.paymentDate) delivery.paymentDate = $filter('date')(delivery.paymentDate, "dd/MM/y");
            if (delivery.task) delivery.task = delivery.task.id;
        }
    }

})();
