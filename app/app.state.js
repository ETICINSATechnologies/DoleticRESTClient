(function() {
    'use strict';

    angular
        .module('doleticApp')
        .config(stateConfig);

    stateConfig.$inject = ['$urlRouterProvider','$stateProvider'];

    function stateConfig($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise("/home");

        $stateProvider
            .state('home',
                {
                    url: "/home",
                    templateUrl: "app/layouts/home/home.template.html"
                }
            ).state('login',
                {
                    url: "/login",
                    templateUrl: "app/layouts/login/login.template.html"
                }
            ).state('navbar',
                {
                    url: "/navbar",
                    templateUrl: "app/layouts/navbar/navbar.template.html"
                }
            );
    }
})();
