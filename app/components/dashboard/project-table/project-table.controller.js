(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('ProjectTableController', ProjectTableController);

    ProjectTableController.$inject = ['$scope', '$state', 'UserService', 'ProjectService'];

    function ProjectTableController($scope, $state, UserService, ProjectService) {
        $scope.currentUser = UserService.getCurrentUser();
        $scope.projectService = ProjectService;

        ProjectService.getCurrentUserProjects();
    }
})();