(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcContactDetailsTabController', grcContactDetailsTabController);

    grcContactDetailsTabController.$inject = ['$scope', 'SharedVariables'];

    function grcContactDetailsTabController($scope, SharedVariables) {
        $scope.user = SharedVariables.grc.selectedContact;
        console.log($scope.user)
    }
})();