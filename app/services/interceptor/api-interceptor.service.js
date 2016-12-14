(function () {
    'use strict';

    angular
        .module('doleticApp')
        .service('APIInterceptorService', APIInterceptorService);

    APIInterceptorService.$inject = ['$rootScope', '$q', 'AuthService', 'store'];

    function APIInterceptorService($rootScope, $q, AuthService) {
        var service = this;
        service.request = function (config) {
            var access_token = AuthService.getAccessToken();
            var token_type = AuthService.getTokenType();
            if (access_token && token_type) {
                config.headers.Authorization = token_type + " " + access_token;
            }
            return config;
        };
        service.responseError = function (rejection) {
            return $q.reject(rejection);
        };
        service.requestError = function (rejection) {
            //SharedVariables.messageBox.show = true;
            return $q.reject(rejection);
        };
    }

})();