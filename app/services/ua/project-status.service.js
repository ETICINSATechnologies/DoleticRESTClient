(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('ProjectStatusService', ProjectStatusService);

    ProjectStatusService.$inject = ['$http', 'SERVER_CONFIG'];

    function ProjectStatusService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/project_status';
        var projectStatusFactory = {};

        projectStatusFactory.getProjectStatus = function (id) {
            return $http.get(server + urlBase + '/' + id);
        };

        projectStatusFactory.getAllProjectStatuses = function () {
            return $http.get(server + urlBase + 'es');
        };

        projectStatusFactory.getProjectStatusByLabel = function (label) {
            return $http.get(server + urlBase + '/' + label);
        };

        return projectStatusFactory;
    }

})();
