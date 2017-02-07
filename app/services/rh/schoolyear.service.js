(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('YearService', YearService);

    YearService.$inject = ['$http', 'SERVER_CONFIG'];

    function YearService($http, SERVER_CONFIG){
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/rh/year';
        var projectFactory = {};

        projectFactory.getAllYears = function () {
            return $http.get(server + urlBase + "s", {cache :true});
        };

        return projectFactory;
    }
});