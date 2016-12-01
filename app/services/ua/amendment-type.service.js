(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('AmendmentTypeService', AmendmentTypeService);

    AmendmentTypeService.$inject = ['$http', 'SERVER_CONFIG'];

    function AmendmentTypeService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/amendment_type';
        var amendmentTypeService = {};

        amendmentTypeService.getAmendmentType = function (id) {
            return $http.get(server + urlBase + '/' + id);
        };

        amendmentTypeService.getAmendmentTypeByLabel = function (label) {
            return $http.get(server + urlBase + '/' + label);
        };

        amendmentTypeService.getAllAmendmentTypes = function () {
            return $http.get(server + urlBase + 's');
        };

        return amendmentTypeService;
    }

})();