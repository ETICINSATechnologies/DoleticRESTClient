(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrOldTableController', hrOldTableController);

    hrOldTableController.$inject = ['$scope', 'UserService', 'DTOptionsBuilder', 'ConfirmModalService', 'MessageBoxService'];

    function hrOldTableController($scope, UserService, DTOptionsBuilder, ConfirmModalService, MessageBoxService) {
        $scope.userService = UserService;
        $scope.dtOptions = DTOptionsBuilder
            .newOptions()
            .withPaginationType('full_numbers')
            .withDisplayLength(25)
            .withColumnFilter({
                aoColumns:[
                    {type: "text"},
                    {type: "text"},
                    {type: "text"},
                    {type: "text"},
                    {type: "text"},
                    {type: "text"},
                    {type: "reset-button"}
                ]
            });
        $scope.dtColumnDefs = [];

        $scope.disableUser = function (user) {
            var name = user.fullName;
            ConfirmModalService.showConfirmModal(
                "Confirmer la désactivation",
                "Voulez-vous vraiment désactiver l'utilisateur " + name + " ?",
                "delete user",
                function () {
                    UserService.disableOldUser(user).success(function (data) {
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
                templateUrl: "app/components/hr/membersTab/doc-form/doc-form.template.html",
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
