(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('ContactService', ContactService);

    ContactService.$inject = ['$http', 'SERVER_CONFIG'];

    function ContactService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/grc/contact';
        var projectFactory = {};

        projectFactory.getCurrentUserContacts = function (cache) {
            return $http.get(server + urlBase + "s/current", {cache: cache});
        };

        projectFactory.getAllContacts = function (cache) {
            return $http.get(server + urlBase + "s", {cache: cache});
        };

        projectFactory.getAllContactsByType = function (type, cache) {
            return $http.get(server + urlBase + "s/type/" + type, {cache: cache});
        };

        return projectFactory;
    }

})();