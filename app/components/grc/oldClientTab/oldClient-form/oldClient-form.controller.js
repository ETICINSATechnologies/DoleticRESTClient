(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcOldClientFormController', grcOldClientFormController);

    grcOldClientFormController.$inject = ['$scope', 'ContactService', 'GenderService', 'FirmService', 'MessageBoxService', 'UserService'];

    function grcOldClientFormController($scope, ContactService, GenderService, FirmService, MessageBoxService, UserService) {

        $scope.oldClient = {};
        $scope.genderService = GenderService;
        $scope.firmService = FirmService;
        $scope.userService = UserService;

        $scope.resetForm = function () {
            $scope.oldClient = {};
            $scope.oldClientForm.$setPristine();
            $scope.editMode = false;
        };

        $scope.addOldClient = function () {
            ContactService.postOldClient($scope.oldClient)
                .success(
                    function (data) {
                        $('#old_client_form_modal').modal('hide');
                        $scope.resetForm();
                        MessageBoxService.showSuccess("Opération réussie !", "L'ancien client a été ajouté.");
                    }
                )
                .error(
                    function (data) {
                        $('#old_client_form_modal').modal('hide');
                        MessageBoxService.showError(
                            "Echec de l'ajout...",
                            "L'ancien client n'a pas pu être ajouté."
                        );
                    }
                )
        };

        GenderService.getAllGenders(true);
        FirmService.getAllFirms(true);
        UserService.getAllUsers(true);
    }

})();
