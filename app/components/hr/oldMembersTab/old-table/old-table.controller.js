(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrOldTableController', hrOldTableController);

    hrOldTableController.$inject = ['$scope', '$state', 'UserService', 'SharedVariables', 'DTOptionsBuilder', 'DTColumnDefBuilder'];

    function hrOldTableController($scope, $state, UserService, SharedVariables, DTOptionsBuilder, DTColumnDefBuilder) {
        $scope.userService = UserService;
        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(20);
        $scope.dtColumnDefs = [];

        $scope.disableUser = function (user) {
            var name = user.fullName;
            ConfirmModalService.showConfirmModal(
                "Confirmer la désactivation",
                "Voulez-vous vraiment désactiver l'utilisateur " + name + " ?",
                "delete user",
                function () {
                    UserService.disableUser(user).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Désactivation réussie !",
                            "L'utilisateur " + name + " a été désactivé."
                        );
                    }).error(function (data) {
                        MessageBoxService.showError(
                            "Echec de la désactivation...",
                            "L'utilisateur " + name + " n'a pas pu être désactivé."
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

        UserService.getAllOldUsers(true);
    }
})();
