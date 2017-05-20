(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('AdministratorMembershipService', AdministratorMembershipService);

    AdministratorMembershipService.$inject = ['$http', 'SERVER_CONFIG'];

    function AdministratorMembershipService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/rh/administrator_membership';
        var administratorMembershipService = {};

        administratorMembershipService.getAllAdministratorMemberships = function () {
            return $http.get(server + urlBase + 's');
        };

        administratorMembershipService.getAdministratorMembership = function (id) {
            return $http.get(server + urlBase + "/" + id);
        };

        return administratorMembershipService;
    }

})();