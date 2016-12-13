(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('UserService', userService);

    userService.$inject = ['store', 'SERVER_CONFIG', '$http'];

    function userService(store, SERVER_CONFIG, $http) {
        var userFactory = {};

        var server = SERVER_CONFIG.url;
        var currentUser = {};

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
            var urlBase = '/api/kernel/user/current';
            return $http.get(server + urlBase);
        };

        return userFactory;
    }

})();