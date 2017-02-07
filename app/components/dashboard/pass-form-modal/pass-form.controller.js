(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('PassFormController', PassFormController);

    PassFormController.$inject = ['$scope', '$state', 'SharedVariables', 'MessageBoxService', 'UserService'];

    function PassFormController($scope, $state, SharedVariables, MessageBoxService, UserService) {

        $scope.$state = $state;
        $scope.sharedVariables = SharedVariables;
        $scope.currentUser = UserService.getCurrentUser();
        $scope.currentUser.activePosition = _.find($scope.currentUser.positions, 'active');
        $scope.cancelPassForm = cancelPassForm;
        $scope.updatePassword = updatePassword;
        $scope.pass = {};

        function updatePassword(){
            UserService.updatePassword(
                $scope.pass.olpass,
                $scope.pass.nepass,
                $scope.pass.confpass,
                function (data) {
                    if(data.code ==0){
                        MessageBoxService.showSuccess('Succès !', 'Mot de passe mis à jour avec succès !' );
                    } else {
                        MessageBoxService.handleServiceError(data);
                    }
                }
            );
        }

    }