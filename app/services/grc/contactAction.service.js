(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('ContactActionService', ContactActionService);

    ContactActionService.$inject = ['$http', 'SERVER_CONFIG', 'ContactService'];

    function ContactActionService($http, SERVER_CONFIG, ContactService) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/grc/contact_action';
        var contactActionFactory = {};

        contactActionFactory.deleteContactAction = function(id) {
            return $http.delete(server + urlBase + "/" + id).success(function(data) {

            }).error(function(data) {
                console.log(data);
            });
        };

        return contactActionFactory;
    }

})();