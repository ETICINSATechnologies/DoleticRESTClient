(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('AuthService', authService);

    authService.$inject = ['store', 'SERVER_CONFIG'];

    function authService(store) {
        var authFactory = {};

        var accessToken = null;
        var tokenType = null;
        var isLogged = false;

        authFactory.setLogged = function (logged) {
            isLogged = logged;
            store.set('isLogged', logged);
            return isLogged;
        };
        authFactory.isLogged = function () {
            if (!isLogged) {
                isLogged = store.get('isLogged');
            }
            return isLogged;
        };

        authFactory.setTokenType = function (type) {
            tokenType = type;
            store.set('tokenType', type);
            return tokenType;
        };
        authFactory.getTokenType = function () {
            if (!tokenType || typeof tokenType === 'undefined') {
                tokenType = store.get('tokenType');
            }
            return tokenType;
        };

        authFactory.setAccessToken = function (token) {
            accessToken = token;
            store.set('accessToken', token);
            return accessToken;
        };
        authFactory.getAccessToken = function () {
            if (!accessToken || typeof accessToken === 'undefined') {
                accessToken = store.get('accessToken');
            }
            return accessToken;
        };

        return authFactory;
    }

})();