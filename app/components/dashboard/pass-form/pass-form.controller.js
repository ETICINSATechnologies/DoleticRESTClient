(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('PassFormController', PassFormController);

    PassFormController.$inject = ['$scope', 'close', 'MessageBoxService', 'UserService'];

    function PassFormController($scope, close, MessageBoxService, UserService)  {
        $scope.pass = {};

        $scope.resetForm = function () {
            $scope.pass = {};
            $scope.passForm.$setPristine();
        };

        $scope.updatePassword =  function() {
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