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

        function showEditProfileForm() {
            
        }
        
        function showEditPassForm() {
            $('#pass_form_modal').modal('show');
        }

        function cancelPassForm() {
            $('#oldpass, #newpass, #confirm').val('');
            $('#pass_form_modal').modal('hide');
        }

        function updatePassword(){
            if(checkPassForm()){
                UserService.updatePassword(
                    $('#oldpass').val(),
                    $('#newpass').val(),
                    $('#confirm').val(),
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
            $('#pass_form.field').removeClass("error");
            var valid = true;
            if ($('#newpass').val() != $('#confirm').val()) {
                $('#newpass.field').addClass("error");
                $('#confirm.field').addClass("error");
                valid = false;
                $('#pass_form').transition('shake');
            }
            return valid;
        }
    }
})();