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

        projectFieldFactory.getTask = function (id) {
            return $http.get(server + urlBase + '/' + id);
        };

        projectFieldFactory.getAllTasks = function () {
            return $http.get(server + urlBase + 's');
        };

        projectFieldFactory.getTaskByLabel = function (label) {
            return $http.get(server + urlBase + '/' + label);
        };

        return projectFieldFactory;
    }

})();