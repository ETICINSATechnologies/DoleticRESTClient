(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrDisabledTableController', hrDisabledTableController);

    hrDisabledTableController.$inject = ['$scope', '$state', 'UserService', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'ConfirmModalService', 'MessageBoxService'];

    function hrDisabledTableController($scope, $state, UserService, DTOptionsBuilder, DTColumnDefBuilder, ConfirmModalService, MessageBoxService) {
        $scope.userService = UserService;
        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(20);
        $scope.dtColumnDefs = [];

        $scope.enableUser = function (user) {
            var name = user.fullName;
            ConfirmModalService.showConfirmModal(
                "Confirmer la réactivation",
                "Voulez-vous vraiment réactiver l'utilisateur " + name + " ?",
                "reply",
                function () {
                    UserService.enableUser(user).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Réactivation réussie !",
                            "L'utilisateur " + name + " a été réactivé."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la réactivation...",
                            "L'utilisateur " + name + " n'a pas pu être réactivé."
                        );
                    });
                }
            )
        };

        $scope.showUserForm = function(user) {
            ModalService.showModal({
                templateUrl: "app/components/hr/membersTab/user-form/user-form.template.html",
                controller: "hrUserFormController",
                inputs: {
                    editMode: true,
                    user: angular.copy(user)
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };

        UserService.getAllDisabledUsers(true);
    }
})();
