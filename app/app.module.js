(function () {
    'use strict';

    angular
        .module('doleticApp', [
            'ngResource',
            'ui.router',
            'ngLoadingSpinner',
            'angularModalService',
            'angular-storage',
            'datatables'
        ])
        .run(run)
        .config(config);

    run.$inject = ['$rootScope', '$state', 'SharedVariables'];
    config.$inject = ['$httpProvider'];

    function run($rootScope, $state, SharedVariables) {
        $rootScope.$on("$stateChangeStart", function (evt, toState, toParams, fromState, fromParams) {
            if (toState.name != "login" && !SharedVariables.session.isLogged) {
                $state.go('login');
                evt.preventDefault();
            } else if (toState.name == "login" && SharedVariables.session.isLogged) {
                $state.go('dashboard');
                evt.preventDefault();
            }
        });
    }

    function config($httpProvider) {
        $httpProvider.interceptors.push('APIInterceptorService');
    }
})();
