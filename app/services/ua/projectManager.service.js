(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('ProjectManagerService', ProjectManagerService);

    ProjectManagerService.$inject = ['$http', 'SERVER_CONFIG'];

    function ProjectManagerService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/project_manager';
        var projectManagerFactory = {};

        projectManagerFactory.getAllManagersByProject = function (id, cache) {
            if (!cache) {
                delete projectManagerFactory.currentProjectManagers;
            } else if (
                projectManagerFactory.currentProjectManagers &&
                projectManagerFactory.currentProjectId == id
            ) {
                return;
            }
            return $http.get(server + urlBase + "s/" + id).success(function (data) {
                projectManagerFactory.currentProjectManagers = data.project_managers;
                projectManagerFactory.currentProjectId = id;
            }).error(function (error) {
                console.log(error);
            });
        };

        projectManagerFactory.getAllProjectManagersById = function (id) {
            return $http.get(server + urlBase + 's/' + id);
        };

        // POST
        projectManagerFactory.postProjectManager = function (id, projectManager) {
            return $http.post(server + urlBase + "/" + id, projectManager).success(function (data) {
                projectManagerFactory.currentProjectManagers = angular.equals(projectManagerFactory.currentProjectManagers, []) ?
                    {} : projectManagerFactory.currentProjectManagers;
                projectManagerFactory.currentProjectManagers[data.project_manager.id] = data.project_manager;
            }).error(function (error) {
                console.log(error);
            });
        };

        // DELETE
        projectManagerFactory.deleteProjectManager = function (id) {
            return $http.delete(server + urlBase + "/" + id).success(function (data) {
                delete projectManagerFactory.currentProjectManagers[id];
            }).error(function (error) {
                console.log(error);
            });
        };

        return projectManagerFactory;
    }

})();
