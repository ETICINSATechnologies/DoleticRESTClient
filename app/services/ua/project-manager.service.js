(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('ProjectManagerService', ProjectManagerService);

    ProjectManagerService.$inject = ['$http', 'SERVER_CONFIG'];

    function ProjectManagerService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/project_manager';
        var projectManagerFactory = {};

        projectManagerFactory.getProjectManager = function (id) {
            return $http.get(server + urlBase + '/' + id);
        };

        projectManagerFactory.getAllProjectManagers = function () {
            return $http.get(server + urlBase + 's');
        };

        projectManagerFactory.getAllProjectManagersById = function (id) {
            return $http.get(server + urlBase + 's/' + id);
        };

        return projectManagerFactory;
    }

})();
