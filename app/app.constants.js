(function () {
    'use strict';

    angular
        .module('doleticApp')
        .constant('VERSION', "0.1.1-SNAPSHOT")
        .constant('DEBUG_INFO_ENABLED', true)
        .constant('LOGIN_CONFIG',loginConfig());

    function loginConfig() {
        return {
            clientId:"1_2gl4uzl21wysg44g8cg400gcgg8ogcokck8k8s8k4kwgg0ks84",
            secretId:"1nt6ji8m00lc08ogwgko48o0sk40o0w4ooc4wo0goo80sokgkg",
            grantType:"password",
            redirectURL:"localhost"
        }
    }
})();
