(function() {
    'use strict';

    angular
        .module('doleticApp')
        .config(stateConfig);

    stateConfig.$inject = ['$urlRouterProvider','$stateProvider'];

    function stateConfig($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise("/dashboard");

        $stateProvider
            .state('dashboard',
                {
                    url: "/dashboard",
                    templateUrl: "app/layouts/dashboard/dashboard.template.html"
                }
            ).state('login',
                {
                    url: "/login",
                    templateUrl: "app/layouts/login/login.template.html"
                }
            );
    }
})();
