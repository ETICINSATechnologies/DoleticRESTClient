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

        projectOriginFactory.getAllProjectOrigins = function (cache) {
            if (!cache) {
                delete projectOriginFactory.projectOrigins;
            } else if (projectOriginFactory.projectOrigins) {
                return;
            }
            return $http.get(server + urlBase + "s").success(function (data) {
                projectOriginFactory.projectOrigins = data.project_origins;
            }).error(function (data) {
                console.log(data);
            });
        };

        projectOriginFactory.getProjectOriginByLabel = function (label) {
            return $http.get(server + urlBase + '/' + label);
        };

        return projectOriginFactory;
    }

})();
