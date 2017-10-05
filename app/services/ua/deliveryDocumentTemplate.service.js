(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('DeliveryDocumentTemplateService', DeliveryDocumentTemplateService);

    DeliveryDocumentTemplateService.$inject = ['$http', 'SERVER_CONFIG'];

    function DeliveryDocumentTemplateService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/delivery_document_template';
        var deliveryDocumentTemplateFactory = {};

        deliveryDocumentTemplateFactory.getAllDeliveryDocumentTemplates = function (cache) {
            if (!cache) {
                delete deliveryDocumentTemplateFactory.deliveryDocumentTemplates;
            } else if (deliveryDocumentTemplateFactory.deliveryDocumentTemplates) {
                return;
            }
            return $http.get(server + urlBase + 's').success(function (data) {
                deliveryDocumentTemplateFactory.deliveryDocumentTemplates = data.delivery_document_templates;
            }).error(function (error) {
                console.log(error);
            });
        };

        return deliveryDocumentTemplateFactory;
    }

})();