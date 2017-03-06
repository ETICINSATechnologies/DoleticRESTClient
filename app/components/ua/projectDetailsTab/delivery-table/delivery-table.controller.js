(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaDeliveryTableController', uaDeliveryTableController);

    uaDeliveryTableController.$inject = ['$scope', '$state', 'ProjectService', 'DeliveryService', 'ConfirmModalService', 'MessageBoxService', 'ModalService'];

    function uaDeliveryTableController($scope, $state, ProjectService, DeliveryService, ConfirmModalService, MessageBoxService, ModalService) {
        $scope.deliveryService = DeliveryService;
        $scope.projectService = ProjectService;

        $scope.showDeliveryForm = function (delivery) {
            ModalService.showModal({
                templateUrl: "app/components/ua/projectDetailsTab/delivery-form/delivery-form.template.html",
                controller: "uaDeliveryFormController",
                inputs: {
                    editMode: true,
                    delivery: angular.copy(delivery)
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };

        $scope.deleteDelivery = function (id) {
            ConfirmModalService.showConfirmModal(
                "Confirmer la suppression",
                "Voulez-vous vraiment supprimer le livrable ?",
                "remove",
                function () {
                    DeliveryService.deleteDelivery(id).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Suppression réussie !",
                            "Le livrable a été supprimé."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la suppression...",
                            "Le livrable n'a pas pu être supprimé."
                        );
                    });
                }
            );
        };

    }
})();
