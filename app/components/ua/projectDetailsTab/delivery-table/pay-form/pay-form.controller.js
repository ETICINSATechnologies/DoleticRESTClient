(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaPayFormController', uaPayFormController);

    uaPayFormController.$inject = ['$scope', 'close', '$state', '$filter', 'DeliveryService', 'MessageBoxService', 'delivery'];

    function uaPayFormController($scope, close, $state, $filter, DeliveryService, MessageBoxService, delivery) {

        if (delivery != {}) formatDelivery();
        $scope.delivery = delivery;

        $scope.resetForm = function () {
            $scope.delivery = {};
            $scope.payForm.$setPristine();
        };

        $scope.payDelivery = function () {
            DeliveryService.payDelivery($scope.delivery)
                .success(
                    function (data) {
                        $('#pay_form_modal').modal('hide');
                        $scope.resetForm();
                        MessageBoxService.showSuccess(
                            "Opération réussie !",
                            "Le livrable a été payé."
                        );
                        close();
                    }
                )
                .error(
                    function (data) {
                        $('#pay_form_modal').modal('hide');
                        MessageBoxService.showError(
                            "Echec du paiement...",
                            "Le livrable n'a pas pu être payé."
                        );
                        close();
                    }
                )
        };

        function formatDelivery() {
            if (delivery.paymentDate) delivery.paymentDate = $filter('date')(delivery.paymentDate, "dd/MM/y");
            if (delivery.task) delivery.task = delivery.task.id;
        }
    }

})();
