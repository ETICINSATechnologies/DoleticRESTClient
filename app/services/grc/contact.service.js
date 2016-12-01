(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('ContactService', ContactService);

    ContactService.$inject = ['$http', 'SERVER_CONFIG'];

    function ContactService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/grc/contacts';
        var projectFactory = {};

        projectFactory.getCurrentUserContacts = function () {
            return $http.get(server + urlBase + "/current");
        };

        return projectFactory;
    }

})();