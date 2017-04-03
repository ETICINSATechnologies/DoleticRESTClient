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

        userFactory.updatePassword = function (pass) {
            return $http.post(server + urlBase + "/current/password", pass).success()
                .error(function (error) {
                    console.log(error);
                });
        };

        userFactory.updateProfile = function (profile){
            return $http.post(server + urlBase + "/current", profile).success(function (data) {
                userFactory.currentUser = data.user;
            }).error(function (error) {
                console.log(error);
            });
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

        userFactory.getAllCurrentUsers = function (cache) {
            if (!cache) {
                delete userFactory.currentUsers;
            } else if (userFactory.currentUsers) {
                return;
            }
            return $http.get(server + urlBase + 's/current').success(function (data) {
                userFactory.currentUsers = data.users;
            }).error(function (data) {
                console.log(data);
            });
        };

        userFactory.getAllOldUsers = function (cache) {
            if (!cache) {
                delete userFactory.oldUsers;
            } else if (userFactory.oldUsers) {
                return;
            }
            return $http.get(server + urlBase + 's/old').success(function (data) {
                userFactory.oldUsers = data.users;
            }).error(function (data) {
                console.log(data);
            });
        };

        userFactory.getAllDisabledUsers = function (cache) {
            if (!cache) {
                delete userFactory.disabledUsers;
            } else if (userFactory.disabledUsers) {
                return;
            }
            return $http.get(server + urlBase + 's/disabled').success(function (data) {
                userFactory.disabledUsers = data.users;
            }).error(function (data) {
                console.log(data);
            });
        };

        userFactory.getUserByUsername = function(user){
            return $http.get(server + urlBase + "/" + user);
        };

        userFactory.getUserByMail = function(mail){
            return $http.get(server + urlBase + "/" + mail);
        };

        userFactory.getUserById = function (id) {
            return $http.get(server + urlBase + "/" + id);
        };

        return userFactory;
    }

})();