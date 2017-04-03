(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('ConsultantDocumentTemplateService', ConsultantDocumentTemplateService);

    ConsultantDocumentTemplateService.$inject = ['$http', 'SERVER_CONFIG'];

    function ConsultantDocumentTemplateService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/consultant_document_template';
        var consultantDocumentTemplateFactory = {};

        consultantDocumentTemplateFactory.getAllConsultantDocumentTemplates = function (cache) {
            if (!cache) {
                delete consultantDocumentTemplateFactory.consultantDocumentTemplates;
            } else if (consultantDocumentTemplateFactory.consultantDocumentTemplates) {
                return;
            }
            return $http.get(server + urlBase + 's').success(function (data) {
                consultantDocumentTemplateFactory.consultantDocumentTemplates = data.consultant_document_templates;
            }).error(function (error) {
                console.log(error);
            });
        };

        return consultantDocumentTemplateFactory;
    }

})();