(function () {
    'use strict';

    angular
        .module('doleticApp')
        .constant('VERSION', "0.1.1-SNAPSHOT")
        .constant('DEBUG_INFO_ENABLED', true)
        .constant('LOGIN_CONFIG', loginConfig())
        .constant('SERVER_CONFIG', serverConfig());

    function loginConfig() {
        return {
            clientId: "1_20cpdghyq9msgg84wkg40cgokkk80w44gowgkcgskk8ckc4g88",
            secretId: "3vtkh5n5rl6ok4ogosskow40o048swcsw80k4g8c0scggcg4k8",
            grantType: "password",
            redirectURL: "localhost"
        }
    }

    function serverConfig() {
        return {
            url: "http://127.0.0.1:8000"
        }
    }
})();
