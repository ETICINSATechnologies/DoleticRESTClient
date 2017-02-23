(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaArchivedTabController', uaArchivedTabController);

    uaArchivedTabController.$inject = ['$scope', 'ProjectService'];

    function uaArchivedTabController($scope, ProjectService) {
        $scope.projectService = ProjectService;
    }
})();