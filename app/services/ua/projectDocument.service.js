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

        projectDocumentFactory.downloadProjectDocument = function (id, label, number) {
            // ResponseType is mandatory, or else the downloaded PDF will be blank
            return $http.get(server + urlBase + "/" + id + "/download", {responseType: "arraybuffer"}).success(function (data) {
                var blob = new Blob([data], {
                    type: 'application/pdf'
                });
                saveAs(blob, number + "-" + label);
            }).error = function (error) {
                console.log(error);
            };
        };

        // POST
        projectDocumentFactory.postProjectDocument = function (document) {
            return $http.post(server + urlBase, document).success(function (data) {

            }).error(function (error) {
                console.log(error);
            });
        };

        return projectDocumentFactory;
    }

})();