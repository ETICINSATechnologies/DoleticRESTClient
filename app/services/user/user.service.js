(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('UserService', userService);

    userService.$inject = ['store', 'SERVER_CONFIG', '$http'];

    function userService(store, SERVER_CONFIG, $http) {
        var userFactory = {};

        var server = SERVER_CONFIG.url;
        var urlBase = "/api/kernel/user";
        var currentUser = null;

        userFactory.setCurrentUser = function (user) {
            currentUser = user;
            store.set('user', user);
            return currentUser;
        };

        userFactory.getCurrentUser = function () {
            if (!currentUser) {
                currentUser = store.get('user');
            }
            return currentUser;
        };

        userFactory.getServerCurrentUser = function (s) {
            return $http.get(server + urlBase + "/current");
        };

        userFactory.getAllUsers = function (cache) {
            if (!cache) {
                delete userFactory.users;
            } else if (userFactory.users) {
                return;
            }
            return $http.get(server + urlBase + 's').success(function (data) {
                userFactory.users = data.users;
            }).error(function (data) {
                console.log(data);
            });
        };

        return userFactory;
    }

})();