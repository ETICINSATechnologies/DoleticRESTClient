(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('GRCService', GRCService);

    GRCService.$inject = ['$http', 'SERVER_CONFIG'];

    function GRCService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/grc/';
        var grcFactory = {};

        grcFactory.getUserRights = function (cache) {
            if (!cache) {
                delete grcFactory.rightLevel;
            } else if (grcFactory.rightLevel) {
                return;
            }
            return $http.get(server + urlBase + "rights").success(function (data) {
                grcFactory.rightLevel = data.right;
            }).error(function (error) {
                console.log(error);
            });
        };

        return grcFactory;
    }

})();