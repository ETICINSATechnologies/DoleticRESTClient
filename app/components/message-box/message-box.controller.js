(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('MessageBoxController', MessageBoxController);

    MessageBoxController.$inject = ['$scope', 'MessageBoxService'];

    function MessageBoxController($scope, MessageBoxService) {
        $scope.messageBoxService = MessageBoxService;
    }
})();