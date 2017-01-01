(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('FirmTypeService', FirmTypeService);

    FirmTypeService.$inject = ['$http', 'SERVER_CONFIG'];

    function FirmTypeService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/grc/firm_type';
        var projectFactory = {};

        projectFactory.getAllFirmTypes = function () {
            return $http.get(server + urlBase + "s", {cache: true});
        };

        return projectFactory;
    }

})();