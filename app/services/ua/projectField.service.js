(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('ProjectFieldService', ProjectFieldService);

    ProjectFieldService.$inject = ['$http', 'SERVER_CONFIG'];

    function ProjectFieldService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/project_field';
        var projectFieldFactory = {};

        projectFieldFactory.getAllProjectFields = function (cache) {
            if (!cache) {
                delete projectFieldFactory.projectFields;
            } else if (projectFieldFactory.projectFields) {
                return;
            }
            return $http.get(server + urlBase + "s").success(function (data) {
                projectFieldFactory.projectFields = data.project_fields;
            }).error(function (data) {
                console.log(data);
            });
        };

        projectFieldFactory.getProjectFieldByLabel = function (label) {
            return $http.get(server + urlBase + '/' + label);
        };

        return projectFieldFactory;
    }

})();