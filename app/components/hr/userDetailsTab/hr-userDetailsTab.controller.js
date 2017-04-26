(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrUserDetailsTabController', hrUserDetailsTabController);

    hrUserDetailsTabController.$inject = ['$scope', '$state', 'UserService', 'KernelService'];

    function hrUserDetailsTabController($scope, $state, UserService, KernelService) {
        $scope.userService = UserService;
        $scope.kernelService = KernelService;

        $scope.loadUser = function (cache) {
            UserService.getUserDetails($state.params.id, cache).success(function (data) {

            }).error(function (data) {
                MessageBoxService.showError(
                    "Echec du chargement",
                    "L'utilisateur n'a pas pu être chargé. Il est possible qu'un autre utilisateur vienne de le supprimer."
                );
            });
        };
    }
})();