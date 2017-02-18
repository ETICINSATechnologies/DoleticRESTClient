(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('toolsSignatureTabController', toolsSignatureTabController);

    toolsSignatureTabController.$inject = ['$scope', 'UserService'];

    function toolsSignatureTabController($scope, UserService) {
        $scope.user = UserService.getCurrentUser();
    }
})();