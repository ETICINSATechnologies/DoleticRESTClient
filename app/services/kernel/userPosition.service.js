(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('UserPositionService', UserPositionService);

    UserPositionService.$inject = ['$http', 'SERVER_CONFIG'];

    function UserPositionService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/kernel/user_position';
        var userPositionFactory = {};

        userPositionFactory.getAllUserPositions = function (cache) {
            if (!cache) {
                delete userPositionFactory.userPositions;
            } else if (userPositionFactory.userPositions) {
                return;
            }
            return $http.get(server + urlBase + "s").success(function (data) {
                userPositionFactory.userPositions = data.user_positions;
            }).error(function (data) {
                console.log(data);
            });
        };

        return userPositionFactory;
    }

})();