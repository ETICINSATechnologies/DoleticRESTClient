(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('ConsultantMembershipService', ConsultantMembershipService);

    ConsultantMembershipService.$inject = ['$http', 'SERVER_CONFIG'];

    function ConsultantMembershipService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/rh/administrator_membership';
        var administratorMembershipService = {};

        administratorMembershipService.getAllConsultantMemberships = function () {
            return $http.get(server + urlBase + 's');
        };

        administratorMembershipService.getConsultantMembership = function (id) {
            return $http.get(server + urlBase + "/" + id);
        };

        return administratorMembershipService;
    }

})();