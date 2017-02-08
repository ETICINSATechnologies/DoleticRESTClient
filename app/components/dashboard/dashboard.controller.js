(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope', '$state', 'SharedVariables', 'MessageBoxService', 'UserService'];

    function DashboardController($scope, $state, SharedVariables, MessageBoxService, UserService) {

        $scope.$state = $state;
        $scope.sharedVariables = SharedVariables;
        $scope.currentUser = UserService.getCurrentUser();
        $scope.currentUser.activePosition = _.find($scope.currentUser.positions, 'active');
        $scope.editState = false;
        $scope.editProfile = false;
        $scope.showEditPassForm = showEditPassForm;
        $scope.showEditProfileForm = showEditProfileForm;
        $scope.cancelPassForm = cancelPassForm();
        $scope.cancelProfileForm = cancelProfileForm;

        function cancelPassForm() {
            $scope.editState = false;
        }

        function cancelProfileForm(){
            $scope.editProfile = false;
        }

        function showEditProfileForm() {
            $scope.editProfile =true;
        }

        function showEditPassForm() {
            $scope.editState = true;
        }


    }
})();