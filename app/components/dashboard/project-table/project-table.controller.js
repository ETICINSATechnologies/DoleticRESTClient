(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('ProjectTableController', ProjectTableController);

    ProjectTableController.$inject = ['$scope', 'UserService', 'ProjectService'];

    function ProjectTableController($scope, UserService, ProjectService) {
        $scope.currentUser = UserService.getCurrentUser();
        $scope.projectService = ProjectService;

        ProjectService.getCurrentUserProjects(true);
    }
})();