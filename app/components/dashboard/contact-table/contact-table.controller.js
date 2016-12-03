(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('ContactTableController', ContactTableController);

    ContactTableController.$inject = ['$scope', '$state', 'ContactService'];

    function ContactTableController($scope, $state, ContactService) {
        $scope.contacts = {};

        function getCurrentUserContacts() {
            ContactService.getCurrentUserContacts()
                .then(
                    function (data) {
                        $scope.contacts = data.data.contacts;
                    },function (data) {
                        console.error(data);
                    }
                )
        }

        getCurrentUserContacts();
    }
})();
