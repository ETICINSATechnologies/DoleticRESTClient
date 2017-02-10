(function () {
    'use strict';

    angular
        .module('doleticApp', [
            'ngResource',
            'ui.router',
            'ngLoadingSpinner',
            'angularModalService',
            'angular-storage',
            'datatables',
            'ngDropdown'
        ])
        .run(run)
        .config(config);

    run.$inject = ['$rootScope', '$state', 'store', 'AuthService'];
    config.$inject = ['$httpProvider'];

    function run($rootScope, $state, store, AuthService) {
        $rootScope.$on("$stateChangeStart", function (evt, toState, toParams, fromState, fromParams) {
            var isLogged = AuthService.isLogged();
            if (toState.name != "login" && !isLogged) {
                $state.go('login');
                evt.preventDefault();
            } else if (toState.name == "login" && isLogged) {
                $state.go('dashboard');
                evt.preventDefault();
            }
        });
    }

    function config($httpProvider) {
        $httpProvider.interceptors.push('APIInterceptorService');
    }
})();
