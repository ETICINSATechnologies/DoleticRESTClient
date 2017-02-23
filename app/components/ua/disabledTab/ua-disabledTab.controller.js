(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('uaDisabledTabController', uaDisabledTabController);

    uaDisabledTabController.$inject = ['$scope', 'ProjectService'];

    function uaDisabledTabController($scope, ProjectService) {
        $scope.projectService = ProjectService;
    }
})();