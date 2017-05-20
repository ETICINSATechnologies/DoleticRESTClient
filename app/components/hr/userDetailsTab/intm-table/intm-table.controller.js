(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrIntmTableController', hrIntmTableController);

    hrIntmTableController.$inject = ['$scope', '$state', 'ConsultantMembershipService', 'ConfirmModalService', 'MessageBoxService', 'ModalService'];

    function hrIntmTableController($scope, $state, ConsultantMembershipService, ConfirmModalService, MessageBoxService, ModalService) {
        $scope.consultantMembershipService = ConsultantMembershipService;

        $scope.showIntmForm = function (task) {
            ModalService.showModal({
                templateUrl: "app/components/hr/userDetailsTab/intm-form/task-form.template.html",
                controller: "hrIntmFormController",
                inputs: {
                    editMode: true,
                    consultantMembership: angular.copy(task)
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };

        $scope.deleteIntm = function (task) {
            ConfirmModalService.showConfirmModal(
                "Confirmer la suppression",
                "Voulez-vous vraiment supprimer l'adhésion ?",
                "remove",
                function () {
                    ConsultantMembershipService.deleteIntm(task).success(function (data) {
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
