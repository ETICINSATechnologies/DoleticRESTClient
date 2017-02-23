(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('SupportService', SupportService);

    SupportService.$inject = ['$http', 'SERVER_CONFIG'];

    function SupportService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/support/';
        var supportFactory = {};

        supportFactory.getUserRights = function (cache) {
            if (!cache) {
                delete supportFactory.rightLevel;
            } else if (supportFactory.rightLevel) {
                return;
            }
            return $http.get(server + urlBase + "rights").success(function (data) {
                supportFactory.rightLevel = data.right;
            }).error(function (error) {
                console.log(error);
            });
        };

        return supportFactory;
    }

})();