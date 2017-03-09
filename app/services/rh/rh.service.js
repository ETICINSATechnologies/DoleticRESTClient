(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('RHService', RHService);

    RHService.$inject = ['$http', 'SERVER_CONFIG'];

    function RHService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/rh/';
        var rhFactory = {};

        rhFactory.getUserRights = function (cache) {
            if (!cache) {
                delete rhFactory.rightLevel;
            } else if (rhFactory.rightLevel) {
                return;
            }
            return $http.get(server + urlBase + "rights").success(function (data) {
                rhFactory.rightLevel = data.right;
            }).error(function (error) {
                console.log(error);
            });
        };

        return rhFactory;
    }

})();