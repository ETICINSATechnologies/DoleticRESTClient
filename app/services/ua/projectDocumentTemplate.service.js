(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('ProjectDocumentTemplateService', ProjectDocumentTemplateService);

    ProjectDocumentTemplateService.$inject = ['$http', 'SERVER_CONFIG'];

    function ProjectDocumentTemplateService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/project_document_template';
        var projectDocumentTemplateFactory = {};

        projectDocumentTemplateFactory.getAllProjectDocumentTemplates = function (cache) {
            if (!cache) {
                delete projectDocumentTemplateFactory.projectDocumentTemplates;
            } else if (projectDocumentTemplateFactory.projectDocumentTemplates) {
                return;
            }
            return $http.get(server + urlBase + 's').success(function (data) {
                projectDocumentTemplateFactory.projectDocumentTemplates = data.project_document_templates;
            }).error(function (error) {
                console.log(error);
            });
        };

        return projectDocumentTemplateFactory;
    }

})();