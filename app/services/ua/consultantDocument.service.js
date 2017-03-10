(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('ConsultantDocumentService', ConsultantDocumentService);

    ConsultantDocumentService.$inject = ['$http', 'SERVER_CONFIG'];

    function ConsultantDocumentService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/consultant_document';
        var consultantDocumentService = {};

        consultantDocumentService.getConsultantDocument = function (id) {
            return $http.get(server + urlBase + '/' + id);
        };

        consultantDocumentService.getConsultantDocuments = function () {
            return $http.get(server + urlBase + 's');
        };

        consultantDocumentService.getConsultantDocumentsValidatedByCurrentUser = function () {
            return $http.get(server + urlBase + 's/auditor/current');
        };

        consultantDocumentService.getConsultantDocumentsValidatedByUser = function (id) {
            return $http.get(server + urlBase + 's/auditor/' + id);
        };

        consultantDocumentService.getConsultantDocumentsByConsultant = function (id) {
            return $http.get(server + urlBase + 's/consultant/' + id);
        };

        consultantDocumentService.getConsultantDocumentsFromTemplate = function (id) {
            return $http.get(server + urlBase + 's/template/' + id);
        };

        return consultantDocumentService;
    }

})();