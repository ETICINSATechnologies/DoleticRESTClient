(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcClientFormController', grcClientFormController);

    grcClientFormController.$inject = ['$scope', 'ContactService', 'GenderService', 'FirmService', 'MessageBoxService', 'UserService'];

    function grcClientFormController($scope, ContactService, GenderService, FirmService, MessageBoxService, UserService) {

        $scope.client = {};
        $scope.genderService = GenderService;
        $scope.firmService = FirmService;

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

        GenderService.getAllGenders(true);
        FirmService.getAllFirms(true);
        UserService.getAllUsers(true);
    }

})();
