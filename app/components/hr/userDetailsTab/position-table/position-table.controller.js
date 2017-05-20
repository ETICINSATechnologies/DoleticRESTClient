(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrPositionTableController', hrPositionTableController);

    hrPositionTableController.$inject = ['$scope', '$state', 'UserPositionService', 'ConfirmModalService', 'MessageBoxService', 'ModalService'];

    function hrPositionTableController($scope, $state, UserPositionService, ConfirmModalService, MessageBoxService, ModalService) {
        $scope.userPositionService = UserPositionService;

        $scope.showPositionForm = function (task) {
            ModalService.showModal({
                templateUrl: "app/components/hr/userDetailsTab/position-form/task-form.template.html",
                controller: "hrPositionFormController",
                inputs: {
                    editMode: true,
                    userPosition: angular.copy(task)
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };

        $scope.deletePosition = function (task) {
            ConfirmModalService.showConfirmModal(
                "Confirmer la suppression",
                "Voulez-vous vraiment supprimer l'adhésion ?",
                "remove",
                function () {
                    UserPositionService.deletePosition(task).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Suppression réussie !",
                            "L'adhésion a été supprimée."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la suppression...",
                            "L'adhésion n'a pas pu être supprimée."
                        );
                    });
                }
            );
        };

    }
})();
