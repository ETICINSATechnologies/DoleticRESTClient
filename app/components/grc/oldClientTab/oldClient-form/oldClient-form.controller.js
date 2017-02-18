(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcOldClientFormController', grcOldClientFormController);

    grcOldClientFormController.$inject = ['$scope', 'ContactService', 'GenderService', 'FirmService', 'MessageBoxService', 'UserService', 'editMode', 'oldClient'];

    function grcOldClientFormController($scope, ContactService, GenderService, FirmService, MessageBoxService, UserService, editMode, oldClient) {

        if (oldClient != {}) formatOldClient();
        $scope.oldClient = oldClient;
        $scope.editMode = editMode ? editMode : false;
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

        $scope.editOldClient = function () {
            var name = $scope.oldClient.fullName;
            ContactService.putOldClient($scope.oldClient)
                .success(function (data) {
                    $('#old_client_form_modal').modal('hide');
                    $scope.resetForm();
                    MessageBoxService.showSuccess(
                        "Opération réussie !",
                        "L'ancien client " + name + " a été modifié !"
                    );
                }).error(function (data) {
                    $('#old_client_form_modal').modal('hide');
                    MessageBoxService.showError(
                        "Echec de la modification...",
                        "L'ancien client n'a pas pu être modifié.");
                }
            );
        };

        function formatOldClient() {
            if (oldClient.gender) oldClient.gender = oldClient.gender.id;
            if (oldClient.prospector) oldClient.prospector = oldClient.prospector.id;
            if (oldClient.firm) oldClient.firm = oldClient.firm.id;
            if (oldClient.type) oldClient.type = oldClient.type.id;
        }

        GenderService.getAllGenders(true);
        FirmService.getAllFirms(true);
        UserService.getAllUsers(true);
    }

})();
