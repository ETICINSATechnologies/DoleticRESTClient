(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaCurrentTabController', uaCurrentTabController);

    uaCurrentTabController.$inject = ['$scope', 'ProjectService'];

    function uaCurrentTabController($scope, ProjectService) {
        $scope.projectService = ProjectService;
    }
})();