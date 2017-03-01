(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('AmendmentService', AmendmentService);

    AmendmentService.$inject = ['$http', 'SERVER_CONFIG'];

    function AmendmentService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/amendment';
        var amendmentFactory = {};

        amendmentFactory.getAmendment = function (id) {
            return $http.get(server + urlBase + '/' + id);
        };

        amendmentFactory.getAllAmendments = function () {
            return $http.get(server + urlBase + 's');
        };

        amendmentFactory.getAllAmendmentsByProject = function (id, cache) {
            if (!cache) {
                delete amendmentFactory.currentProjectAmendments;
            } else if (
                amendmentFactory.currentProjectAmendments &&
                amendmentFactory.currentProjectId == id
            ) {
                return;
            }
            return $http.get(server + urlBase + "s/project/" + id).success(function (data) {
                amendmentFactory.currentProjectAmendments = data.amendments;
                amendmentFactory.currentProjectId = id;
            }).error(function (error) {
                console.log(error);
            });
        };

        amendmentFactory.getAllAmendmentsByType = function (id) {
            return $http.get(server + urlBase + 's/type/' + id);
        };

        return amendmentFactory;
    }

})();