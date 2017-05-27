(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('ContactTableController', ContactTableController);

    ContactTableController.$inject = ['$scope', 'ContactService'];

    function ContactTableController($scope, ContactService) {
        $scope.contactService = ContactService;

        ContactService.getCurrentUserContacts(true);
    }
})();
