(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcActionFormController', grcActionFormController);

    grcActionFormController.$inject = ['$scope', 'close', '$state', '$filter', 'ContactActionService', 'ContactActionTypeService', 'MessageBoxService', 'UserService', 'editMode', 'action'];

    function grcActionFormController($scope, close, $state, $filter, ContactActionService, ContactActionTypeService, MessageBoxService, UserService, editMode, action) {

        if (action != {}) formatAction();
        $scope.action = action;
        $scope.editMode = editMode ? editMode : false;
        $scope.contactActionTypeService = ContactActionTypeService;
        $scope.ContactActionService = ContactActionService;
        $scope.userService = UserService;

        $scope.resetForm = function () {
            $scope.action = {};
            $scope.actionForm.$setPristine();
            $scope.editMode = false;
        };

        $scope.addAction = function () {
            $scope.action.contact = $state.params.id;
            ContactActionService.postContactAction($scope.action)
                .success(
                    function (data) {
                        $('#action_form_modal').modal('hide');
                        $scope.resetForm();
                        MessageBoxService.showSuccess(
                            "Opération réussie !",
                            "La prise de contact a été ajoutée."
                        );
                        close();
                    }
                )
                .error(
                    function (data) {
                        $('#action_form_modal').modal('hide');
                        MessageBoxService.showError(
                            "Echec de l'ajout...",
                            "La prise de contact n'a pas pu être ajoutée."
                        );
                    }
                )
        };

        $scope.editAction = function () {
            ContactActionService.putContactAction($scope.action)
                .success(function (data) {
                    $('#action_form_modal').modal('hide');
                    $scope.resetForm();
                    MessageBoxService.showSuccess(
                        "Opération réussie !",
                        "L'action  a été modifiée !"
                    );
                    close();
                }).error(function (data) {
                    $('#action_form_modal').modal('hide');
                    MessageBoxService.showError(
                        "Echec de la modification...",
                        "L'action n'a pas pu être modifiée.");
                }
            );
        };

        function formatAction() {
            if (action.type) action.type = action.type.id;
            if (action.prospector) action.prospector = action.prospector.id;
            if (action.contact) action.contact = action.contact.id;
            if (action.date) action.date = $filter('date')(action.date, "dd/MM/y");
        }

        ContactActionTypeService.getAllContactActionTypes(true);
        UserService.getAllUsers(true);
    }

})();
