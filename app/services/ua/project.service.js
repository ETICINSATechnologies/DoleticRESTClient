(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('ProjectService', ProjectService);

    ProjectService.$inject = ['$http', 'SERVER_CONFIG'];

    function ProjectService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/projects';
        var projectFactory = {};

        projectFactory.getProjectByManagerId = function (id) {
            return $http.get(server + urlBase + "/manager/" + id);
        };

        return projectFactory;
    }

})();