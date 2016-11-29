(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('loginController', loginController);

    loginController.$inject = ['$scope', '$state', 'loginService', 'SharedVariables', 'MessageBoxService'];

    function loginController($scope, $state, loginService, SharedVariables, MessageBoxService) {
        $scope.login = login;
        $scope.resetFields = resetFields;
        $scope.loginError = false;
        $scope.inputError = false;

        function login() {
            loginService.login($scope.username, $scope.password)
                .success(function (data) {
                    console.log(data);
                    SharedVariables.session.accessToken = data.access_token;
                    SharedVariables.session.tokenType = data.token_type;
                    SharedVariables.session.isLogged = true;
                    $state.go("dashboard");
                })
                .error(function (error) {
                    console.log("Error :", error);
                    resetFields();
                    MessageBoxService.showError("Erreur de connexion", "La combinaison login/mot de passe est incorrecte !")
                    $scope.loginError = true;
                });
        }

        function resetFields() {
            $scope.username = "";
            $scope.password = "";
            $scope.loginError = false;
            $scope.inputError = false;
        }
    }
})();