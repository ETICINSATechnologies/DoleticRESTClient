(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('AmendmentTypeService', AmendmentTypeService);

    AmendmentTypeService.$inject = ['$http', 'SERVER_CONFIG'];

    function AmendmentTypeService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/amendment_type';
        var amendmentTypeFactory = {};

        amendmentTypeFactory.getAmendmentType = function (id) {
            return $http.get(server + urlBase + '/' + id);
        };

        amendmentTypeFactory.getAmendmentTypeByLabel = function (label) {
            return $http.get(server + urlBase + '/' + label);
        };

        amendmentTypeFactory.getAllAmendmentTypes = function (cache) {
            if (!cache) {
                delete amendmentTypeFactory.amendmentTypes;
            } else if (amendmentTypeFactory.amendmentTypes) {
                return;
            }
            return $http.get(server + urlBase + "s").success(function (data) {
                amendmentTypeFactory.amendmentTypes = data.amendment_types;
            }).error(function (data) {
                console.log(data);
            });
        };

        return amendmentTypeFactory;
    }

})();