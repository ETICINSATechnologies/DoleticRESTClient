(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('ProjectService', ProjectService);

    ProjectService.$inject = ['$http', 'SERVER_CONFIG'];

    function ProjectService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/project';
        var projectFactory = {};

        projectFactory.getProjectByManagerId = function (id) {
            return $http.get(server + urlBase + "s/manager/" + id);
        };

        projectFactory.getProjectByAuditorId = function (id) {
            return $http.get(server + urlBase + "s/auditor/" + id);
        };

        return projectFactory;
    }

})();