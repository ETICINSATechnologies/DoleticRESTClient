(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrTeamsTabController', hrTeamsTabController);

    hrTeamsTabController.$inject = ['$scope', 'RHService', 'TeamService'];

    function hrTeamsTabController($scope, RHService, TeamService) {
        $scope.rhService = RHService;
        $scope.teamService = TeamService;
    }
})();