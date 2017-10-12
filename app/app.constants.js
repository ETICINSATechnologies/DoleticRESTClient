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
            clientId: "7_mmy16zuzr00s8ssgwgc4cwwoowc0484o4s4cg44o0ow88kgko",
            secretId: "4whn31zlx76s8kggwcw480kkk4wc8c48g4sogko8k8w0cg4kgk",
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
