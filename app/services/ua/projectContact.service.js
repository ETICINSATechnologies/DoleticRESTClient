(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('ProjectContactService', ProjectContactService);

    ProjectContactService.$inject = ['$http', 'SERVER_CONFIG'];

    function ProjectContactService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/project_contact';
        var projectContactFactory = {};

        projectContactFactory.getAllContactsByProject = function (id, cache) {
            if (!cache) {
                delete projectContactFactory.currentProjectContacts;
            } else if (
                projectContactFactory.currentProjectContacts &&
                projectContactFactory.currentProjectId == id
            ) {
                return;
            }
            return $http.get(server + urlBase + "s/" + id).success(function (data) {
                projectContactFactory.currentProjectContacts = data.project_contacts;
                projectContactFactory.currentProjectId = id;
            }).error(function (error) {
                console.log(error);
            });
        };

        projectContactFactory.getAllProjectContactsById = function (id) {
            return $http.get(server + urlBase + 's/' + id);
        };

        // POST
        projectContactFactory.postProjectContact = function (id, projectContact) {
            return $http.post(server + urlBase + "/" + id, projectContact).success(function (data) {
                projectContactFactory.currentProjectContacts = angular.equals(projectContactFactory.currentProjectContacts, []) ?
                    {} : projectContactFactory.currentProjectContacts;
                projectContactFactory.currentProjectContacts[data.project_contact.id] = data.project_contact;
            }).error(function (error) {
                console.log(error);
            });
        };

        // DELETE
        projectContactFactory.deleteProjectContact = function (id) {
            return $http.delete(server + urlBase + "/" + id).success(function (data) {
                delete projectContactFactory.currentProjectContacts[id];
            }).error(function (error) {
                console.log(error);
            });
        };

        return projectContactFactory;
    }

})();
