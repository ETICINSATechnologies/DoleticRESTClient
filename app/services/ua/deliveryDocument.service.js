(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('DeliveryDocumentService', DeliveryDocumentService);

    DeliveryDocumentService.$inject = ['$http', 'SERVER_CONFIG', 'Upload'];

    function DeliveryDocumentService($http, SERVER_CONFIG, Upload) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/delivery_document';
        var deliveryDocumentFactory = {};

        deliveryDocumentFactory.downloadDeliveryDocument = function (id, label, number, deliveryNumber) {
            // ResponseType is mandatory, or else the downloaded PDF will be blank
            return $http.get(server + urlBase + "/" + id + "/download", {responseType: "arraybuffer"}).success(function (data) {
                var blob = new Blob([data], {
                    type: 'application/pdf'
                });
                saveAs(blob, number + "-" + label + deliveryNumber);
            }).error = function (error) {
                console.log(error);
            };
        };

        // POST
        deliveryDocumentFactory.postDeliveryDocument = function (document, deliveryId) {
            return Upload.upload({url: server + urlBase, data: document}).success(function (data) {
                deliveryDocumentFactory.currentProjectDeliveryDocuments = angular.equals(deliveryDocumentFactory.currentProjectDeliveryDocuments, []) ?
                    {} : deliveryDocumentFactory.currentProjectDeliveryDocuments;
                deliveryDocumentFactory.currentProjectDeliveryDocuments[deliveryId] =
                    !deliveryDocumentFactory.currentProjectDeliveryDocuments[deliveryId] || angular.equals(deliveryDocumentFactory.currentProjectDeliveryDocuments[deliveryId], []) ?
                        {} : deliveryDocumentFactory.currentProjectDeliveryDocuments[deliveryId];
                deliveryDocumentFactory.currentProjectDeliveryDocuments[deliveryId][data.delivery_document.template.id] = data.delivery_document;
                console.log(data);
            }).error(function (error) {
                console.log(error);
            });
        };

        // PUT
        deliveryDocumentFactory.putDeliveryDocument = function (document, deliveryId) {
            return Upload.upload({url: server + urlBase + "/" + document.id, data: document}).success(function (data) {
                deliveryDocumentFactory.currentProjectDeliveryDocuments = angular.equals(deliveryDocumentFactory.currentProjectDeliveryDocuments, []) ?
                    {} : deliveryDocumentFactory.currentProjectDeliveryDocuments;
                deliveryDocumentFactory.currentProjectDeliveryDocuments[deliveryId] =
                    !deliveryDocumentFactory.currentProjectDeliveryDocuments[deliveryId] || angular.equals(deliveryDocumentFactory.currentProjectDeliveryDocuments[deliveryId], []) ?
                        {} : deliveryDocumentFactory.currentProjectDeliveryDocuments[deliveryId];
                deliveryDocumentFactory.currentProjectDeliveryDocuments[deliveryId][data.delivery_document.template.id] = data.delivery_document;
            }).error(function (error) {
                console.log(error);
            });
        };

        return deliveryDocumentFactory;
    }

})();