(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcController', grcController);

    grcController.$inject = ['$scope', '$state', 'ContactService'];

    function grcController($scope, $state, ContactService) {
        $scope.$state = $state;
        $scope.contactService = ContactService;
    }
})();