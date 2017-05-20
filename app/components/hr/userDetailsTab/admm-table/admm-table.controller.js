(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrAdmmTableController', hrAdmmTableController);

    hrAdmmTableController.$inject = ['$scope', '$state', 'AdministratorMembershipService', 'ConfirmModalService', 'MessageBoxService', 'ModalService'];

    function hrAdmmTableController($scope, $state, AdministratorMembershipService, ConfirmModalService, MessageBoxService, ModalService) {
        $scope.administratorMembershipService = AdministratorMembershipService;

        $scope.showAdmmForm = function (task) {
            ModalService.showModal({
                templateUrl: "app/components/hr/userDetailsTab/admm-form/task-form.template.html",
                controller: "hrAdmmFormController",
                inputs: {
                    editMode: true,
                    administratorMembership: angular.copy(task)
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };

        $scope.deleteAdmm = function (task) {
            ConfirmModalService.showConfirmModal(
                "Confirmer la suppression",
                "Voulez-vous vraiment supprimer l'adhésion ?",
                "remove",
                function () {
                    AdministratorMembershipService.deleteAdmm(task).success(function (data) {
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
