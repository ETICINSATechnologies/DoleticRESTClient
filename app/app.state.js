(function () {
    'use strict';

    angular
        .module('doleticApp')
        .config(stateConfig);

    stateConfig.$inject = ['$urlRouterProvider', '$stateProvider'];

    function stateConfig($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise("/dashboard");

        $stateProvider
            .state('dashboard',
                {
                    url: "/dashboard",
                    templateUrl: "app/components/dashboard/dashboard.template.html",
                    controller: "DashboardController"
                }).state('login',
            {
                url: "/login",
                templateUrl: "app/components/login/login.template.html",
                controller: "loginController"
            }).state('hr',
            {
                url: "/hr",
                abstract: true,
                templateUrl: "app/components/hr/hr.template.html",
                controller: "hrController"
            }).state('grc',
            {
                url: "/grc",
                abstract: true,
                templateUrl: "app/components/grc/grc.template.html",
                controller: "grcController"
            }).state('ua',
            {
                url: "/ua",
                abstract: true,
                templateUrl: "app/components/ua/ua.template.html",
                controller: "uaController"
            }).state('tools',
            {
                url: "/tools",
                abstract: true,
                templateUrl: "app/components/tools/tools.template.html",
                controller: "toolsController"
            }).state('support',
            {
                url: "/support",
                abstract: true,
                templateUrl: "app/components/support/support.template.html",
                controller: "supportController"
            });
    }
})();
