(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcClientFormController', grcClientFormController);

    grcClientFormController.$inject = ['$scope', 'close', '$filter', 'ContactService', 'GenderService', 'FirmService', 'MessageBoxService', 'UserService', 'editMode', 'client'];

    function grcClientFormController($scope, close, $filter, ContactService, GenderService, FirmService, MessageBoxService, UserService, editMode, client) {

        if (client != {}) formatClient();
        $scope.client = client;
        $scope.editMode = editMode ? editMode : false;
        $scope.genderService = GenderService;
        $scope.firmService = FirmService;
        $scope.userService = UserService;

        $scope.resetForm = function () {
            $scope.client = {};
            $scope.clientForm.$setPristine();
            $scope.editMode = false;
        };

        $scope.addClient = function () {
            ContactService.postClient($scope.client)
                .success(
                    function (data) {
                        $('#client_form_modal').modal('hide');
                        $scope.resetForm();
                        MessageBoxService.showSuccess(
                            "Opération réussie !",
                            "Le client a été ajouté."
                        );
                        close();
                    }
                )
                .error(
                    function (data) {
                        $('#client_form_modal').modal('hide');
                        MessageBoxService.showError(
                            "Echec de l'ajout...",
                            "Le client n'a pas pu être ajouté."
                        );
                    }
                )
        };

        $scope.editClient = function () {
            var name = $scope.client.fullName;
            ContactService.putClient($scope.client)
                .success(function (data) {
                    $('#client_form_modal').modal('hide');
                    $scope.resetForm();
                    MessageBoxService.showSuccess(
                        "Opération réussie !",
                        "Le client " + name + " a été modifié !"
                    );
                    close();
                }).error(function (data) {
                    $('#client_form_modal').modal('hide');
                    MessageBoxService.showError(
                        "Echec de la modification...",
                        "Le client n'a pas pu être modifié.");
                }
            );
        };

        function formatClient() {
            if (client.gender) client.gender = client.gender.id;
            if (client.prospector) client.prospector = client.prospector.id;
            if (client.firm) client.firm = client.firm.id;
            if (client.type) client.type = client.type.id;
            if (client.nextProspecting) client.nextProspecting = $filter('date')(client.nextProspecting, "dd/MM/y");
        }

        GenderService.getAllGenders(true);
        FirmService.getAllFirms(true);
        UserService.getAllUsers(true);
    }

})();
