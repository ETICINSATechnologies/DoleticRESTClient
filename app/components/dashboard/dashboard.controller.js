(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope', '$state', 'SharedVariables', 'MessageBoxService', 'ProjectService'];

    function DashboardController($scope, $state, SharedVariables, MessageBoxService, ProjectService) {
        $scope.currentUser = SharedVariables.session.currentUser;

        $scope.getCurrentUserProjects = getCurrentUserProjects;

        function getCurrentUserProjects() {
            ProjectService.getProjectByManagerId($scope.currentUser.id)
                .then(
                    function (data) {
                        console.log(data);
                    },function (data) {
                        console.error(data);
                    }
                )
        }


    }
})();