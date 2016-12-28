(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('SharedVariables', SharedVariables);

    SharedVariables.$inject = [];

    function SharedVariables() {

        return {
            session: {
                isLogged: false,
                accessToken: null,
                tokenType: "Bearer",
                currentUser: null
            },
            rh: {
                selectedUser: null
            }
        }
    }
})();

