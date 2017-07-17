(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('stdDocDetailsTabController', stdDocDetailsTabController);

    stdDocDetailsTabController.$inject = ['$scope', '$state', 'UserService', 'KernelService', 'ConfirmModalService', 'ModalService', 'MessageBoxService'];

    function stdDocDetailsTabController($scope, $state, UserService, KernelService, ConfirmModalService, ModalService, MessageBoxService) {
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

        $scope.showDocForm = function () {
            ModalService.showModal({
                templateUrl: "app/components/stdDoc/docTab/doc-form/doc-form.template.html",
                controller: "stdDocFormController",
                inputs: {
                    editMode: true,
                    user: DocService.selectedDoc
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };

        $scope.disableUser = function () {
            var name = UserService.selectedUser.fullName;
            var service = UserService.selectedUser.mainPosition.old ? 'disableOldUser' : 'disableCurrentUser';
            ConfirmModalService.showConfirmModal(
                "Confirmer la désactivation",
                "Voulez-vous vraiment désactiver l'utilisateur " + name + " ?",
                "delete user",
                function () {
                    UserService[service](angular.copy(UserService.selectedUser)).success(function (data) {
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

        $scope.enableUser = function () {
            var name = UserService.selectedUser.fullName;
            ConfirmModalService.showConfirmModal(
                "Confirmer la réactivation",
                "Voulez-vous vraiment réactiver l'utilisateur " + name + " ?",
                "reply",
                function () {
                    UserService.enableUser(angular.copy(UserService.selectedUser)).success(function (data) {
                        MessageBoxService.showSuccess(
                            "Réactivé réussie !",
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
    }
})();