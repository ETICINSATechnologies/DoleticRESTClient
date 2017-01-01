(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('FirmService', FirmService);

    FirmService.$inject = ['$http', 'SERVER_CONFIG'];

    function FirmService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/grc/firm';
        var projectFactory = {};

        projectFactory.getAllFirms = function (cache) {
            return $http.get(server + urlBase + "s", {cache: cache});
        };

        projectFactory.postFirm = function (firm) {
            return $http.post(server + urlBase, firm);
        };

        return projectFactory;
    }

})();