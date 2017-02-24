(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('supportController', supportController);

    supportController.$inject = ['$scope', '$state', 'SupportService'];

    function supportController($scope, $state, SupportService) {
        $scope.$state = $state;
        $scope.supportService = SupportService;

        SupportService.getUserRights();
    }
})();