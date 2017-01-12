(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('ProjectFileService', ProjectFileService);

    ProjectFileService.$inject = ['$http', 'SERVER_CONFIG'];

    function ProjectFileService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/project_file';
        var projectFileFactory = {};

        projectFileFactory.getProjectFile = function (id) {
            return $http.get(server + urlBase + '/' + id);
        };

        projectFileFactory.getAllProjectFilesByCurrentAuditor = function () {
            return $http.get(server + urlBase + 's/auditor/current');
        };

        projectFileFactory.getAllProjectFiles = function () {
            return $http.get(server + urlBase + 's');
        };

        projectFileFactory.getAllProjectFilesByProject = function (id) {
            return $http.get(server + urlBase + 's/project/' + id);
        };

        projectFileFactory.getAllProjectFilesByAuditor = function (id) {
            return $http.get(server + urlBase + 's/auditor/' + id);
        };

        return projectFileFactory;
    }

})();
