(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcController', grcController);

    grcController.$inject = ['$scope', '$state', 'ContactService', 'GRCService'];

    function grcController($scope, $state, ContactService, GRCService) {
        $scope.$state = $state;
        $scope.contactService = ContactService;
        $scope.grcService = GRCService;

        GRCService.getUserRights();
    }
})();