(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('ProjectDocumentService', ProjectDocumentService);

    ProjectDocumentService.$inject = ['$http', 'SERVER_CONFIG'];

    function ProjectDocumentService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/project_document';
        var projectDocumentFactory = {};

        projectDocumentFactory.getProjectDocument = function (id) {
            return $http.get(server + urlBase + '/' + id);
        };

        projectDocumentFactory.getAllProjectDocuments = function () {
            return $http.get(server + urlBase + 's');
        };

        projectDocumentFactory.getAllProjectDocumentsByProject = function (id) {
            return $http.get(server + urlBase + 's/project/' + id);
        };

        projectDocumentFactory.getAllProjectDocumentsByAuditor = function (id) {
            return $http.get(server + urlBase + 's/auditor/' + id);
        };

        projectDocumentFactory.getAllProjectDocumentsByAuditor = function () {
            return $http.get(server + urlBase + 's/auditor/current');
        };

        projectDocumentFactory.getAllProjectDocumentsByTemplate = function (id) {
            return $http.get(server + urlBase + 's/template/' + id);
        };

        return projectDocumentFactory;
    }

})();