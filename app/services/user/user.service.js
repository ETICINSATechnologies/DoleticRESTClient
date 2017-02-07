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

        userFactory.updatePassword = function (oldpass, newpass, confirmpass, successhandler) {
            $http.post(server + urlBase + "/current/password",
                {
                    "old" : oldpass,
                    "new[first]" : newpass,
                    "new[second]" : confirmpass
                }
            );
        }

        userFactory.updateProfile = function (gender, firstName, lastName, mail, birthDate, department,
                                              shoolYear, recruitmentEvent, tel, address, city, postalCode,
                                              country, successhandler){
            $http.post(server + urlBase + "/current",
                {
                    "gender" : gender,
                    "firstName" : firstName,
                    "lastName" : lastName,
                    "email" : mail,
                    "birthDate" : birthDate,
                    "department" : department,
                    "schoolYear" : shoolYear,
                    "recruitmentEvent" : recruitmentEvent,
                    "tel" : tel,
                    "address" : address,
                    "city" : city,
                    "postalCode" : postalCode,
                    "country" : country
                }
            );
        }


        userFactory.getCurrentUser = function () {
            if (!currentUser) {
                currentUser = store.get('user');
            }
            return currentUser;
        };

        userFactory.getServerCurrentUser = function (s) {
            return $http.get(server + urlBase + "/current");
        };

        userFactory.getAllUsers = function () {
            return $http.get(server + urlBase + 's');
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