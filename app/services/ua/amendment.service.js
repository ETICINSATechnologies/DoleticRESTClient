(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('AmendmentService', AmendmentService);

    AmendmentService.$inject = ['$http', 'SERVER_CONFIG'];

    function AmendmentService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/amendment';
        var amendmentService = {};

        amendmentService.getAmendment = function (id) {
            return $http.get(server + urlBase + '/' + id);
        };

        amendmentService.getAllAmendments = function () {
            return $http.get(server + urlBase + 's');
        };

        amendmentService.getAllAmendmentsByProject = function (id) {
            return $http.get(server + urlBase + 's/project/' + id);
        };

        amendmentService.getAllAmendmentsByType = function (id) {
            return $http.get(server + urlBase + 's/type/' + id);
        };

        return amendmentService;
    }

})();