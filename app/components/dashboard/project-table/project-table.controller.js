(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('ProjectTableController', ProjectTableController);

    ProjectTableController.$inject = ['$scope', '$state', 'SharedVariables', 'ProjectService'];

    function ProjectTableController($scope, $state, SharedVariables, ProjectService) {
        $scope.currentUser = SharedVariables.session.currentUser;
        $scope.projects = [];

        function getCurrentUserProjects() {
            ProjectService.getProjectByManagerId($scope.currentUser.id)
                .then(
                    function (responseManager) {
                        $scope.projects = responseManager.data.projects;
                        ProjectService.getProjectByAuditorId($scope.currentUser.id)
                            .success(function (responseAuditor) {
                                $scope.projects.concat(responseAuditor.projects);
                            })
                            .error(function (responseAuditor) {
                                console.log(responseAuditor);
                            });
                    },function (responseManager) {
                        console.error(data);
                    }
                )
        }

        getCurrentUserProjects();
    }
})();