(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('CountryService', CountryService);

    CountryService.$inject = ['$http', 'SERVER_CONFIG'];

    function CountryService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/kernel/countr';
        var projectFactory = {};

        projectFactory.getAllCountries = function () {
            return $http.get(server + urlBase + "ies", { cache:true });
        };

        return projectFactory;
    }

})();