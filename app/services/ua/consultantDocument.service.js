(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('ConsultantDocumentService', ConsultantDocumentService);

    ConsultantDocumentService.$inject = ['$http', 'SERVER_CONFIG', 'Upload'];

    function ConsultantDocumentService($http, SERVER_CONFIG, Upload) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/consultant_document';
        var consultantDocumentFactory = {};

        consultantDocumentFactory.downloadConsultantDocument = function (id, label, number, consultantNumber) {
            // ResponseType is mandatory, or else the downloaded PDF will be blank
            return $http.get(server + urlBase + "/" + id + "/download", {responseType: "arraybuffer"}).success(function (data) {
                var blob = new Blob([data], {
                    type: 'application/pdf'
                });
                saveAs(blob, number + "-" + label + consultantNumber);
            }).error = function (error) {
                console.log(error);
            };
        };

        // POST
        consultantDocumentFactory.postConsultantDocument = function (document, consultantId) {
            return Upload.upload({url: server + urlBase, data: document}).success(function (data) {
                consultantDocumentFactory.currentProjectConsultantDocuments = angular.equals(consultantDocumentFactory.currentProjectConsultantDocuments, []) ?
                    {} : consultantDocumentFactory.currentProjectConsultantDocuments;
                consultantDocumentFactory.currentProjectConsultantDocuments[consultantId] =
                    !consultantDocumentFactory.currentProjectConsultantDocuments[consultantId] || angular.equals(consultantDocumentFactory.currentProjectConsultantDocuments[consultantId], []) ?
                    {} : consultantDocumentFactory.currentProjectConsultantDocuments[consultantId];
                consultantDocumentFactory.currentProjectConsultantDocuments[consultantId][data.consultant_document.template.id] = data.consultant_document;
                console.log(data);
            }).error(function (error) {
                console.log(error);
            });
        };

        // PUT
        consultantDocumentFactory.putConsultantDocument = function (document, consultantId) {
            return Upload.upload({url: server + urlBase + "/" + document.id, data: document}).success(function (data) {
                consultantDocumentFactory.currentProjectConsultantDocuments = angular.equals(consultantDocumentFactory.currentProjectConsultantDocuments, []) ?
                    {} : consultantDocumentFactory.currentProjectConsultantDocuments;
                consultantDocumentFactory.currentProjectConsultantDocuments[consultantId] =
                    !consultantDocumentFactory.currentProjectConsultantDocuments[consultantId] || angular.equals(consultantDocumentFactory.currentProjectConsultantDocuments[consultantId], []) ?
                        {} : consultantDocumentFactory.currentProjectConsultantDocuments[consultantId];
                consultantDocumentFactory.currentProjectConsultantDocuments[consultantId][data.consultant_document.template.id] = data.consultant_document;
            }).error(function (error) {
                console.log(error);
            });
        };

        return consultantDocumentFactory;
    }

})();