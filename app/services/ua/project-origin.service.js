(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('ProjectOriginService', ProjectOriginService);

    ProjectOriginService.$inject = ['$http', 'SERVER_CONFIG'];

    function ProjectOriginService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/project_origin';
        var projectOriginFactory = {};

        projectOriginFactory.getProjectOrigin = function (id) {
            return $http.get(server + urlBase + '/' + id);
        };

        projectOriginFactory.getAllProjectOrigins = function () {
            return $http.get(server + urlBase + 's');
        };

        projectOriginFactory.getProjectOriginByLabel = function (label) {
            return $http.get(server + urlBase + '/' + label);
        };

        return projectStatusFactory;
    }

})();
