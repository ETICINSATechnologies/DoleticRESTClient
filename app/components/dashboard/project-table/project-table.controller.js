(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('ProjectTableController', ProjectTableController);

    ProjectTableController.$inject = ['$scope', '$state'];

    function ProjectTableController($scope, $state) {
        $scope.projects = {};

        function getAllProjects() {

        }

        getAllProjects();
    }
})();