(function() {
    'use strict';

    angular
        .module('doleticApp')
        .controller('loginController', loginController);

    loginController.$inject = ['$scope', '$state', 'loginService', 'SharedVariables'];

    function loginController($scope, $state, loginService, SharedVariables) {
        $scope.login = login;
        $scope.resetFields = resetFields;
        $scope.loginError = false;
        $scope.inputError = false;

        function login() {
            loginService.login($scope.username,$scope.password)
                .then(function (response) {
                    console.log(response);
                    SharedVariables.session.accessToken = response.data.access_token;
                    SharedVariables.session.tokenType = response.data.token_type;
                }, function (error) {
                    console.log("Error :",error);
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