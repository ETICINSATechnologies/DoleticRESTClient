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
            clientId: "1_504up3nc36ccgcswwkco80k48cgg8s4c84wg8008w0888c40kg",
            secretId: "2wcwlfs5p8iswk84k08cockko4ok8000sco40skw8cswggk4wg",
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
