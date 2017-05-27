(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('ConsultantMembershipService', ConsultantMembershipService);

    ConsultantMembershipService.$inject = ['$http', 'SERVER_CONFIG'];

    function ConsultantMembershipService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/rh/consultant_membership';
        var consultantMembershipFactory = {};

        // POST
        consultantMembershipFactory.postMembership = function (consultantMembership) {
            return $http.post(server + urlBase, consultantMembership).success(function (data) {
                consultantMembershipFactory.currentUserMembership = data.consultant_membership;
            }).error(function (error) {
                console.log(error);
            });
        };

        // PUT
        consultantMembershipFactory.putMembership = function (consultantMembership) {
            return $http.post(server + urlBase + "/" + consultantMembership.id, consultantMembership).success(function (data) {
                consultantMembershipFactory.currentUserMembership = data.consultant_membership;
            }).error(function (error) {
                console.log(error);
            });
        };

        // DELETE
        consultantMembershipFactory.deleteMembership = function (consultantMembership) {
            return $http.delete(server + urlBase + "/" + consultantMembership.id).success(function (data) {
                delete consultantMembershipFactory.currentUserMembership;
            }).error(function (error) {
                console.log(error);
            });
        };

        return consultantMembershipFactory;
    }

})();