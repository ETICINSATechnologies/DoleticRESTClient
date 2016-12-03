(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('loginController', loginController);

    loginController.$inject = ['$scope', '$state', 'loginService', 'SharedVariables', 'MessageBoxService', 'UserService'];

    function loginController($scope, $state, loginService, SharedVariables, MessageBoxService, UserService) {
        $scope.login = login;
        $scope.resetFields = resetFields;
        $scope.loginError = false;
        $scope.inputError = false;

        function login() {
            loginService.login($scope.username, $scope.password)
                .success(function (data) {
                    SharedVariables.session.accessToken = data.access_token;
                    SharedVariables.session.isLogged = true;
                    UserService.getServerCurrentUser()
                        .then(function (response) {
                                SharedVariables.session.currentUser = response.data.user;
                                $state.go("dashboard");
                            },
                            function (data) {
                                console.log("Error :", error);
                                resetFields();
                                MessageBoxService.showError("Erreur de connexion", "La combinaison login/mot de passe est incorrecte !");
                                $scope.loginError = true;
                            });
                })
                .error(function (error) {
                    console.error("Error :", error);
                    resetFields();
                    MessageBoxService.showError("Erreur de connexion", "La combinaison login/mot de passe est incorrecte !");
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