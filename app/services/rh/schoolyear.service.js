(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('YearService', YearService);

    YearService.$inject = ['$http', 'SERVER_CONFIG'];

    function YearService($http, SERVER_CONFIG){
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/rh/year';
        var yearFactory = {years : {}};

        yearFactory.getAllYears = function (cache) {
            return $http.get(server + urlBase + "s", { cache: cache}).success(function (data) {
                yearFactory.years = data.years;
            }).error(function (data) {
                console.log(data);
            });
        };

        return yearFactory;
    }
});