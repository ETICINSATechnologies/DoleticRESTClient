(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('DeliveryDocumentService', DeliveryDocumentService);

    DeliveryDocumentService.$inject = ['$http', 'SERVER_CONFIG'];

    function DeliveryDocumentService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/delivery_document';
        var deliveryDocumentService = {};

        deliveryDocumentService.getDeliveryDocument = function (id) {
            return $http.get(server + urlBase + '/' + id);
        };

        deliveryDocumentService.getDeliveryDocuments = function () {
            return $http.get(server + urlBase + 's');
        };

        deliveryDocumentService.getDeliveryDocumentsValidatedByCurrentUser = function () {
            return $http.get(server + urlBase + 's/auditor/current');
        };

        deliveryDocumentService.getDeliveryDocumentsValidatedByUser = function (id) {
            return $http.get(server + urlBase + 's/auditor/' + id);
        };

        deliveryDocumentService.getDeliveryDocumentsByDelivery = function (id) {
            return $http.get(server + urlBase + 's/delivery/' + id);
        };

        deliveryDocumentService.getDeliveryDocumentsFromTemplate = function (id) {
            return $http.get(server + urlBase + 's/template/' + id);
        };

        return deliveryDocumentService;
    }

})();