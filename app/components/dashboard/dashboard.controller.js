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
        $scope.checkPassForm = checkPassForm;
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
            if(checkPassForm()){
                UserService.updatePassword(
                    $scope.olpass,
                    $scope.nepass,
                    $scope.confpass,
                    function (data) {
                        if(data.code ==0){
                            checkPassForm();
                            MessageBoxService.showSuccess('Succès !', 'Mot de passe mis à jour avec succès !' );
                        } else {
                            MessageBoxService.handleServiceError(data);
                        }
                    }
                )
            }
        }

        function checkPassForm(){
            element.find("pass_form").removeClass("error");
            var valid = true;
            if ($scope.nepass != $scope.confpass) {
                element.find('newpass_field').addClass("error");
                element.find('confirm_field').addClass("error");
                valid = false;
                element.find('pass_form').transition('shake');
            }
            return valid;
        }
    }
})();