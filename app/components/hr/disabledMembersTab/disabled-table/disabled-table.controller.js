(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrDisabledUserTableController', hrDisabledUserTableController);

    hrDisabledUserTableController.$inject = ['$scope', '$state'];

    function hrDisabledUserTableController($scope, $state) {
        $scope.disabledUsers = {};

    }
})();
