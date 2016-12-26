(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope', '$state', 'SharedVariables', 'MessageBoxService', 'UserService'];

    function DashboardController($scope, $state, SharedVariables, MessageBoxService, UserService) {

        $scope.currentUser = UserService.getCurrentUser();
        $scope.currentUser.activePosition = _.find($scope.currentUser.positions, 'active');
        $scope.showEditProfileForm = showEditProfileForm;
        $scope.showEditPassForm = showEditPassForm;
        console.log($scope.currentUser)

        function showEditProfileForm() {
            
        }
        
        function showEditPassForm() {
            
        }
    }
})();