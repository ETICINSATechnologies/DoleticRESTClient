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

        $scope.showDeliverForm = function (delivery) {
            ModalService.showModal({
                templateUrl: "app/components/ua/projectDetailsTab/delivery-table/deliver-form/deliver-form.template.html",
                controller: "uaDeliverFormController",
                inputs: {
                    delivery: angular.copy(delivery)
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };

        $scope.showPayForm = function (delivery) {
            ModalService.showModal({
                templateUrl: "app/components/ua/projectDetailsTab/delivery-table/pay-form/pay-form.template.html",
                controller: "uaPayFormController",
                inputs: {
                    delivery: angular.copy(delivery)
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };

        $scope.undeliverDelivery = function (delivery) {
            ConfirmModalService.showConfirmModal(
                "Confirmer l'annulation",
                "Voulez-vous vraiment annuler la livraison du livrable ?",
                "remove",
                function () {
                    DeliveryService.undeliverDelivery(delivery).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Annulation réussie !",
                            "La livraison du livrable a été annulée."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de l'annulation...",
                            "La livraison du livrable n'a pas pu être annulée."
                        );
                    });
                }
            );
        };

        $scope.unpayDelivery = function (delivery) {
            ConfirmModalService.showConfirmModal(
                "Confirmer l'annulation",
                "Voulez-vous vraiment annuler le paiment du livrable ?",
                "remove",
                function () {
                    DeliveryService.unpayDelivery(delivery).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Annulation réussie !",
                            "Le paiment du livrable a été annulé."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la suppression...",
                            "Le paiement du livrable n'a pas pu être annulé."
                        );
                    });
                }
            );
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
