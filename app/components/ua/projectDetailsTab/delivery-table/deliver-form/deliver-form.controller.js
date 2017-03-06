(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaDeliverFormController', uaDeliverFormController);

    uaDeliverFormController.$inject = ['$scope', 'close', '$state', '$filter', 'DeliveryService', 'MessageBoxService', 'delivery'];

    function uaDeliverFormController($scope, close, $state, $filter, DeliveryService, MessageBoxService, delivery) {

        if (delivery != {}) formatDelivery();
        $scope.delivery = delivery;

        $scope.resetForm = function () {
            $scope.delivery = {};
            $scope.deliverForm.$setPristine();
        };

        $scope.deliverDelivery = function () {
            DeliveryService.deliverDelivery($scope.delivery)
                .success(
                    function (data) {
                        $('#deliver_form_modal').modal('hide');
                        $scope.resetForm();
                        MessageBoxService.showSuccess(
                            "Opération réussie !",
                            "Le livrable a été livré."
                        );
                        close();
                    }
                )
                .error(
                    function (data) {
                        $('#deliver_form_modal').modal('hide');
                        MessageBoxService.showError(
                            "Echec de la livraison...",
                            "Le livrable n'a pas pu être livré."
                        );
                        close();
                    }
                )
        };

        function formatDelivery() {
            if (delivery.deliveryDate) delivery.deliveryDate = $filter('date')(delivery.deliveryDate, "dd/MM/y");
            if(delivery.task) delivery.task = delivery.task.id;
        }
    }

})();
