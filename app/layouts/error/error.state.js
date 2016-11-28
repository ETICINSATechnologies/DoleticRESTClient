(function() {
    'use strict';

    angular
        .module('doleticApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
            .state('error', {
                parent: 'app',
                url: '/erreur',
                data: {
                    authorities: [],
                    pageTitle: 'Doletic | Erreur'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/layouts/error/error.html'
                    }
                }
            })
            .state('accessdenied', {
                parent: 'app',
                url: '/accesrefuse',
                data: {
                    authorities: [],
                    pageTitle: 'Doletic | Accès refusé'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/layouts/error/accessdenied.html'
                    }
                }
            });
    }
})();
