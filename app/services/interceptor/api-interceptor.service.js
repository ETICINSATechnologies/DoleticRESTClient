(function () {
    'use strict';

    angular
        .module('doleticApp')
        .service('APIInterceptorService', APIInterceptorService);

    APIInterceptorService.$inject = ['$rootScope', '$q', 'AuthService', '$injector', 'MessageBoxService'];

    function APIInterceptorService($rootScope, $q, AuthService, $injector, MessageBoxService) {
        var service = this;
        service.request = function (config) {
            var access_token = AuthService.getAccessToken();
            var token_type = AuthService.getTokenType();
            if (access_token && token_type) {
                config.headers.Authorization = token_type + " " + access_token;
            }
            return config;
        };
        service.responseError = function(response) {
            if (response.status == 401){
                MessageBoxService.showError('Erreur 401',response.statusText);
                logout();
            }
            return $q.reject(response);
        };
        service.requestError = function (rejection) {
            return $q.reject(rejection);
        };

        function logout() {
            AuthService.setLogged(false);
            AuthService.setAccessToken(null);
            $injector.get('$state').go('login');
            // event.preventDefault();
        }
    }

})();