(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('ProjectDocumentService', ProjectDocumentService);

    ProjectDocumentService.$inject = ['$http', 'SERVER_CONFIG', 'Upload'];

    function ProjectDocumentService($http, SERVER_CONFIG, Upload) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/project_document';
        var projectDocumentFactory = {};

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
            return Upload.upload({url: server + urlBase, data: document}).success(function (data) {
                projectDocumentFactory.currentProjectDocuments = angular.equals(projectDocumentFactory.currentProjectDocuments, []) ?
                    {} : projectDocumentFactory.currentProjectDocuments;
                projectDocumentFactory.currentProjectDocuments[data.project_document.template.id] = data.project_document;
            }).error(function (error) {
                console.log(error);
            });
        };

        // PUT
        projectDocumentFactory.putProjectDocument = function (document) {
            return Upload.upload({url: server + urlBase + "/" + document.id, data: document}).success(function (data) {
                projectDocumentFactory.currentProjectDocuments = angular.equals(projectDocumentFactory.currentProjectDocuments, []) ?
                    {} : projectDocumentFactory.currentProjectDocuments;
                projectDocumentFactory.currentProjectDocuments[data.project_document.template.id] = data.project_document;
            }).error(function (error) {
                console.log(error);
            });
        };

        return projectDocumentFactory;
    }

})();