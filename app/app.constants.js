(function () {
    'use strict';

    angular
        .module('doleticApp')
        .constant('VERSION', "0.1.1-SNAPSHOT")
        .constant('DEBUG_INFO_ENABLED', true)
        .constant('LOGIN_CONFIG', loginConfig());

    function loginConfig() {
        return {
            clientId: "1_2gztpmhxuj0gocoo0kcskwwckg840wkwwg0wsgccwsk080c048",
            secretId: "thxmlw1iks0o00wgg8ck4skoog4c80gc4w0gw4ggkck08o0og",
            grantType: "password",
            redirectURL: "localhost"
        }
    }
})();
