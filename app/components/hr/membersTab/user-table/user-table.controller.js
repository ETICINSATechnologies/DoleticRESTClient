(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrUserTableController', hrUserTableController);

    hrUserTableController.$inject = ['$scope', '$state', 'UserService', 'SharedVariables', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'ConfirmModalService', 'MessageBoxService', 'ModalService'];

    function hrUserTableController($scope, $state, UserService, SharedVariables, DTOptionsBuilder, DTColumnDefBuilder, ConfirmModalService, MessageBoxService, ModalService) {
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
                    UserService.disableCurrentUser(user).success(function (data) {
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

        $scope.isUserAdministrator = function(user) {
            if(user.administrator == 2) {
                return "Oui";
            } else if(user.administrator == 1) {
                return "Invalide";
            }
            return "Non";
        };

        $scope.isUserConsultant = function(user) {
            if(user.consultant == 2) {
                return "Oui";
            } else if(user.consultant == 1) {
                return "Invalide";
            }
            return "Non";
        };

        $scope.isUserInvalid = function(user) {
            return user.consultant == 1 || user.administrator == 1;
        };

        UserService.getAllCurrentUsers(true);
    }
})();
