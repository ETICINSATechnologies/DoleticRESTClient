(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('DocumentTemplateService', documentTemplateService);

    documentTemplateService.$inject = ['$http', 'SERVER_CONFIG'];

    function documentTemplateService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua';
        var documentTemplateFactory = {};

        documentTemplateFactory.getAllDocumentTemplates = function (cache) {
            if (!cache) {
                delete documentTemplateFactory.documentTemplates;
            } else if (documentTemplateFactory.documentTemplates) {
                return;
            }
            return $http.get(server + urlBase + 's').success(function (data) {
                documentTemplateFactory.documentTemplates = data.document_templates;
            }).error(function (error) {
                console.log(error);
            });
        };

        documentTemplateFactory.uploadTemplateDocument = function (document) {
            console.log("document : "+document);
            return $http.post(server + urlBase + '/standard_document_template', document).success(function (data) {
                alert("success : "+data);
            }).error(function (error) {
                console.log(error);
            });
        };



        return documentTemplateFactory;
    }

})();