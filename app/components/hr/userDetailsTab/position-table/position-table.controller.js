(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrPositionTableController', hrPositionTableController);

    hrPositionTableController.$inject = ['$scope', '$state', '$filter', 'UserPositionService', 'ConfirmModalService', 'MessageBoxService', 'KernelService', 'PositionService'];

    function hrPositionTableController($scope, $state, $filter, UserPositionService, ConfirmModalService, MessageBoxService, KernelService, PositionService) {
        $scope.userPositionService = UserPositionService;
        $scope.kernelService = KernelService;
        $scope.positionService = PositionService;
        $scope.editMode = false;

        $scope.showUserPositionForm = function() {
            $scope.position = {};
        };

        $scope.cancelUserPositionForm = function() {
            delete $scope.position;
        };

        $scope.addUserPosition = function() {
            $scope.position.user =  $state.params.id;
            UserPositionService.postUserPosition($scope.position).success(function(data) {
                MessageBoxService.showSuccess(
                    "Ajout réussi !",
                    "Le poste a été ajouté."
                );
                delete $scope.position;
            }).error(function(data) {
                MessageBoxService.showError(
                    "Echec de l'ajout...",
                    "Le poste n'a pas pu être ajouté."
                );
            });
        };

        $scope.setAsMainPosition = function(position) {
            ConfirmModalService.showConfirmModal(
                "Confirmer l'opération",
                "Voulez-vous vraiment faire de ce poste le poste principal de l'utilisateur ?",
                "power",
                function () {
                    UserPositionService.setUserPositionAsMain(position).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Opération réussie !",
                            "Le poste est maintenant le poste principal de l'utilisateur."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la désactivation...",
                            "Le poste n'a pas pu être marqué comme principal."
                        );
                    });
                }
            );
        };

        $scope.disableUserPosition = function (position) {
            ConfirmModalService.showConfirmModal(
                "Confirmer la désactivation",
                "Voulez-vous vraiment désactiver ce poste ?",
                "remove",
                function () {
                    UserPositionService.disableUserPosition(position).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Désactivation réussie !",
                            "Le poste a été désactivé."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la désactivation...",
                            "Le poste n'a pas pu être désactivé."
                        );
                    });
                }
            );
        };

        PositionService.getAllPositions(true);
    }
})();
