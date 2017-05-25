(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrIntmTableController', hrIntmTableController);

    hrIntmTableController.$inject = ['$scope', '$state', '$filter', 'ConsultantMembershipService', 'ConfirmModalService', 'MessageBoxService', 'RHService'];

    function hrIntmTableController($scope, $state, $filter, ConsultantMembershipService, ConfirmModalService, MessageBoxService, RHService) {
        $scope.consultantMembershipService = ConsultantMembershipService;
        $scope.rhService = RHService;
        $scope.editMode = false;

        $scope.showMembershipForm = function(editMode, intm) {
            $scope.consultantMembership = intm ? angular.copy(intm) : {};
            if(editMode) {
                formatConsultantMembership();
                $scope.editMode = editMode;
            }
        };

        $scope.cancelMembershipForm = function() {
            delete $scope.consultantMembership;
            $scope.editMode = false;
        };

        $scope.addConsultantMembership = function() {
            $scope.consultantMembership.user =  $state.params.id;
            ConsultantMembershipService.postMembership($scope.consultantMembership).success(function(data) {
                MessageBoxService.showSuccess(
                    "Ajout réussi !",
                    "L'adhésion a été ajoutée."
                );
                delete $scope.consultantMembership;
            }).error(function(data) {
                MessageBoxService.showError(
                    "Echec de l'ajout...",
                    "L'adhésion n'a pas pu être ajoutée."
                );
            });
        };

        $scope.updateConsultantMembership = function() {
            $scope.consultantMembership.user =  $state.params.id;
            ConsultantMembershipService.putMembership($scope.consultantMembership).success(function(data) {
                MessageBoxService.showSuccess(
                    "Modification réussie !",
                    "L'adhésion a été modifiée."
                );
                delete $scope.consultantMembership;
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
                    ConsultantMembershipService.deleteMembership(membership).success(function (data) {
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

        function formatConsultantMembership() {
            if ($scope.consultantMembership.startDate) $scope.consultantMembership.startDate = $filter('date')($scope.consultantMembership.startDate, "dd/MM/y");
        }

    }
})();
