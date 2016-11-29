(function () {
    'use strict';

    angular
        .module('doleticApp')
        .service('UserService', userService);

    userService.$inject = ['store'];

    function userService(store) {
        var service = this,
            currentUser = {};
        service.setCurrentUser = function (user) {
            currentUser = user;
            store.set('user', user);
            return currentUser;
        };
        service.getCurrentUser = function () {
            if (!currentUser) {
                currentUser = store.get('user');
            }
            return currentUser;
        };
    }

})();