(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('CountryService', CountryService);

    CountryService.$inject = ['$http', 'SERVER_CONFIG'];

    function CountryService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/kernel/countr';
        var countryFactory = {};

        countryFactory.getAllCountries = function (cache) {
            if (!cache) {
                delete countryFactory.countries;
            } else if (countryFactory.countries) {
                return;
            }
            return $http.get(server + urlBase + "ies").success(function (data) {
                countryFactory.countries = data.countries;
            }).error(function (data) {
                console.log(data);
            });
        };

        return countryFactory;
    }

})();