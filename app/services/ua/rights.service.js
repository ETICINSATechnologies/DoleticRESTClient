(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('RightsService', RightsService);

    RightsService.$inject = ['$http', 'SERVER_CONFIG'];

    function RightsService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/rights';
        var rightsFactory = {};

        rightsFactory.getRights = function () {
            return $http.get(server + urlBase);
        };

        return rightsFactory;
    }

})();