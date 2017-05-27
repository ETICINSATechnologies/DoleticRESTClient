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

        userPositionFactory.getAllCurrentUserPositions = function (cache) {
            if (!cache) {
                delete userPositionFactory.currentUserPositions;
            } else if (userPositionFactory.currentUserPositions) {
                return;
            }
            return $http.get(server + urlBase + "/user/" + userPositionFactory.currentUserId).success(function (data) {
                userPositionFactory.currentUserPositions = data.user_positions;
            }).error(function (data) {
                console.log(data);
            });
        };

        // POST
        userPositionFactory.postUserPosition = function (userPosition) {
            return $http.post(server + urlBase, userPosition).success(function (data) {
                return userPositionFactory.getAllCurrentUserPositions(false);
            }).error(function (error) {
                console.log(error);
            });
        };

        // PUT
        userPositionFactory.disableUserPosition = function (userPosition) {
            return $http.post(server + urlBase + "/" + userPosition.id +"/disable").success(function (data) {
                return userPositionFactory.getAllCurrentUserPositions(false);
            }).error(function (error) {
                console.log(error);
            });
        };

        userPositionFactory.setUserPositionAsMain = function (userPosition) {
            return $http.post(server + urlBase + "/" + userPosition.id +"/main").success(function (data) {
                return userPositionFactory.getAllCurrentUserPositions(false);
            }).error(function (error) {
                console.log(error);
            });
        };

        return userPositionFactory;
    }

})();