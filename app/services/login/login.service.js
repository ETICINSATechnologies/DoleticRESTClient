(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('loginService', loginService);

    loginService.$inject = ['$http', 'LOGIN_CONFIG', 'SERVER_CONFIG'];

    function loginService($http, LOGIN_CONFIG, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/oauth/v2/token';
        var dataFactory = {};

        dataFactory.login = function (username, password) {
            return $http.get(server + urlBase + "?" +
                "client_id=" + LOGIN_CONFIG.clientId + "&" +
                "client_secret=" + LOGIN_CONFIG.secretId + "&" +
                "grant_type=" + LOGIN_CONFIG.grantType + "&" +
                "redirect_uri=" + LOGIN_CONFIG.redirectURL + "&" +
                "username=" + username + "&" +
                "password=" + password
            );
        };

        return dataFactory;
    }

})();


