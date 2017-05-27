(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope', '$state', 'UserService', 'ModalService'];

    function DashboardController($scope, $state, UserService, ModalService) {

        $scope.$state = $state;
        $scope.currentUser = UserService.getCurrentUser();
        $scope.currentUser.activePosition = _.find($scope.currentUser.positions, 'active');
        $scope.showEditPassForm = showEditPassForm;
        $scope.showEditProfileForm = showEditProfileForm;

        function showEditProfileForm() {
            ModalService.showModal({
                templateUrl: "app/components/dashboard/profile-form-modal/profile-form-modal.template.html",
                controller: "ProfileFormController",
                inputs:{
                    profile: angular.copy($scope.currentUser)
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        }

        function showEditPassForm() {
            ModalService.showModal({
                templateUrl: "app/components/dashboard/pass-form-modal/pass-form-modal.template.html",
                controller: "PassFormController",
                inputs:{
                    pass:{}
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        }


    }
})();