(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('AdministratorMembershipService', AdministratorMembershipService);

    AdministratorMembershipService.$inject = ['$http', 'SERVER_CONFIG'];

    function AdministratorMembershipService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/rh/administrator_membership';
        var administratorMembershipFactory = {};

        // POST
        administratorMembershipFactory.postMembership = function (administratorMembership) {
            return $http.post(server + urlBase, administratorMembership).success(function (data) {
                administratorMembershipFactory.currentUserMemberships = angular.equals(administratorMembershipFactory.currentUserMemberships, []) ?
                    {} : administratorMembershipFactory.currentUserMemberships;
                administratorMembershipFactory.currentUserMemberships[data.administrator_membership.id] = data.administrator_membership;
            }).error(function (error) {
                console.log(error);
            });
        };

        // PUT
        administratorMembershipFactory.putMembership = function (administratorMembership) {
            return $http.post(server + urlBase + "/" + administratorMembership.id, administratorMembership).success(function (data) {
                administratorMembershipFactory.currentUserMemberships = angular.equals(administratorMembershipFactory.currentUserMemberships, []) ?
                    {} : administratorMembershipFactory.currentUserMemberships;
                administratorMembershipFactory.currentUserMemberships[data.administrator_membership.id] = data.administrator_membership;
            }).error(function (error) {
                console.log(error);
            });
        };

        // DELETE
        administratorMembershipFactory.deleteMembership = function (administratorMembership) {
            return $http.delete(server + urlBase + "/" + administratorMembership.id).success(function (data) {
                delete administratorMembershipFactory.currentUserMemberships[administratorMembership.id];
            }).error(function (error) {
                console.log(error);
            });
        };

        return administratorMembershipFactory;
    }

})();