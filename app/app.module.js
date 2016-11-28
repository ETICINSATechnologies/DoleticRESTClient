(function() {
    'use strict';

    angular
        .module('doleticApp', [
            'ngResource',
            'ui.router',
            'ngLoadingSpinner',
            'angularModalService'
        ])
        .run(run)
        .config(config);

    run.$inject = ['$rootScope', '$timeout'];
    config.$inject = ['$httpProvider'];

    function run($rootScope, $timeout) {
    }

    function config($httpProvider){
        $httpProvider.defaults.headers.common['Authorization'] = "Bearer 265662";
    }
})();
