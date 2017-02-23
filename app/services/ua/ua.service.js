(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('UAService', UAService);

    UAService.$inject = ['$http', 'SERVER_CONFIG'];

    function UAService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/';
        var uaFactory = {};

        uaFactory.getUserRights = function (cache) {
            if (!cache) {
                delete uaFactory.rightLevel;
            } else if (uaFactory.rightLevel) {
                return;
            }
            return $http.get(server + urlBase + "rights").success(function (data) {
                uaFactory.rightLevel = data.right;
            }).error(function (error) {
                console.log(error);
            });
        };

        return uaFactory;
    }

})();