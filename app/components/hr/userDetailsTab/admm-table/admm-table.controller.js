(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrAdmmTableController', hrAdmmTableController);

    hrAdmmTableController.$inject = ['$scope', '$state', '$filter', 'AdministratorMembershipService', 'ConfirmModalService', 'MessageBoxService', 'ModalService', 'RHService'];

    function hrAdmmTableController($scope, $state, $filter, AdministratorMembershipService, ConfirmModalService, MessageBoxService, ModalService, RHService) {
        $scope.administratorMembershipService = AdministratorMembershipService;
        $scope.rhService = RHService;
        $scope.editMode = false;

        $scope.showMembershipForm = function(editMode, admm) {
            $scope.administratorMembership = admm ? angular.copy(admm) : {};
            if(editMode) {
                formatAdministratorMembership();
                $scope.editMode = editMode;
            }
        };

        $scope.cancelMembershipForm = function() {
            delete $scope.administratorMembership;
            $scope.editMode = false;
        };

        $scope.addAdministratorMembership = function() {
            $scope.administratorMembership.user =  $state.params.id;
            AdministratorMembershipService.postMembership($scope.administratorMembership).success(function(data) {
                MessageBoxService.showSuccess(
                    "Ajout réussi !",
                    "L'adhésion a été ajoutée."
                );
                delete $scope.administratorMembership;
            }).error(function(data) {
                MessageBoxService.showError(
                    "Echec de l'ajout...",
                    "L'adhésion n'a pas pu être ajoutée."
                );
            });
        };

        $scope.updateAdministratorMembership = function() {
            $scope.administratorMembership.user =  $state.params.id;
            AdministratorMembershipService.putMembership($scope.administratorMembership).success(function(data) {
                MessageBoxService.showSuccess(
                    "Modification réussie !",
                    "L'adhésion a été modifiée."
                );
                delete $scope.administratorMembership;
                $scope.editMode = false;
            }).error(function(data) {
                MessageBoxService.showError(
                    "Echec de la modification...",
                    "L'adhésion n'a pas pu être modifiée."
                );
            });
        };

        $scope.deleteMembership = function (membership) {
            ConfirmModalService.showConfirmModal(
                "Confirmer la suppression",
                "Voulez-vous vraiment supprimer l'adhésion ?",
                "remove",
                function () {
                    AdministratorMembershipService.deleteMembership(membership).success(function (data) {
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

        function formatAdministratorMembership() {
            if ($scope.administratorMembership.startDate) $scope.administratorMembership.startDate = $filter('date')($scope.administratorMembership.startDate, "dd/MM/y");
            if ($scope.administratorMembership.endDate) $scope.administratorMembership.endDate = $filter('date')($scope.administratorMembership.endDate, "dd/MM/y");
        }

    }
})();
