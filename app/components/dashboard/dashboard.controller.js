(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope', '$state', 'SharedVariables', 'MessageBoxService', 'UserService'];

    function DashboardController($scope, $state, SharedVariables, MessageBoxService, UserService) {

        $scope.currentUser = UserService.getCurrentUser();
        $scope.currentUser.activePosition = _.find($scope.currentUser.positions, 'active');
        $scope.showEditProfileForm = showEditProfileForm;
        $scope.showEditPassForm = showEditPassForm;
        $scope.cancelPassForm = cancelPassForm;
        $scope.updatePassword = updatePassword;
        $scope.editState = false;
        $scope.olpass = "";
        $scope.nepass = "";
        $scope.confpass = "";

        function showEditProfileForm() {
            
        }

        function showEditPassForm() {
            $scope.editState = true;
        }

        function cancelPassForm() {
            $scope.olpass = "";
            $scope.nepass = "";
            $scope.confpass = "";
            $scope.editState = false;
        }

        function updatePassword(){
            UserService.updatePassword(
                $scope.olpass,
                $scope.nepass,
                $scope.confpass,
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
})();