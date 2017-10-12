(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('ContactTypeService', ContactTypeService);

    ContactTypeService.$inject = ['$http', 'SERVER_CONFIG'];

    function ContactTypeService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/grc/contact_type';
        var contactTypeFactory = {};

        contactTypeFactory.getAllContactTypes = function (cache) {
            if (!cache) {
                delete contactTypeFactory.currentContactTypes;
            } else if (contactTypeFactory.currentContactTypes) {
                return;
            }
            return $http.get(server + urlBase + "s", {cache: cache}).success(function(data) {
                contactTypeFactory.currentContactTypes = data.contact_types;
            }).error(function(data) {
                console.log(data);
            });
        };

        return contactTypeFactory;
    }

})();