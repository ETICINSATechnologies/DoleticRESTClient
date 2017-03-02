(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('PassFormController', PassFormController);

    PassFormController.$inject = ['$scope', 'close', '$state', 'SharedVariables', 'MessageBoxService', 'UserService'];

    function PassFormController($scope, close, $state, SharedVariables, MessageBoxService, UserService)  {

        $scope.$state = $state;
        $scope.sharedVariables = SharedVariables;
        $scope.currentUser = UserService.getCurrentUser();
        $scope.currentUser.activePosition = _.find($scope.currentUser.positions, 'active');
        $scope.updatePassword = updatePassword;
        $scope.pass = {};

        $scope.resetForm = function () {
            $scope.pass = {};
            $scope.passForm.$setPristine();
        };

        function updatePassword() {
            UserService.updatePassword($scope.pass)
                .success(function (data) {
                    $('#pass_form_modal').modal('hide');
                    $scope.resetForm();
                    MessageBoxService.showSuccess(
                        "Opération réussie !",
                        "Le mot de passe a été modifié avec succès !"
                    );
                    close();
                }).error(function (data) {
                    $('#pass_form_modal').modal('hide');
                    MessageBoxService.showError(
                        "Echec de la modification...",
                        "Le mot de passe n'a pas pu être modifié.");
                }
            );
        }

    }
})();