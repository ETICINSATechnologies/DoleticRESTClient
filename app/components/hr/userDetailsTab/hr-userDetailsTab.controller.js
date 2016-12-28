(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrUserDetailsTabController', hrUserDetailsTabController);

    hrUserDetailsTabController.$inject = ['$scope', 'SharedVariables'];

    function hrUserDetailsTabController($scope, SharedVariables) {
        $scope.user = SharedVariables.rh.selectedUser;
        console.log($scope.user)
    }
})();