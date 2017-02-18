(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('ContactActionTypeService', ContactActionTypeService);

    ContactActionTypeService.$inject = ['$http', 'SERVER_CONFIG'];

    function ContactActionTypeService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/grc/contact_action_type';
        var contactActionTypeFactory = {};

        contactActionTypeFactory.getAllContactActionTypes = function (cache) {
            if (!cache) {
                delete contactActionTypeFactory.contactActionTypes;
            } else if (contactActionTypeFactory.contactActionTypes) {
                return;
            }
            return $http.get(server + urlBase + "s").success(function (data) {
                contactActionTypeFactory.contactActionTypes = data.contact_action_types;
            }).error(function (data) {
                console.log(data);
            });
        };

        return contactActionTypeFactory;
    }

})();