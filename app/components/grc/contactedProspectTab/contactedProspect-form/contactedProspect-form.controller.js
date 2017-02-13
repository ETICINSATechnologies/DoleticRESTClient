(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcContactedProspectFormController', grcContactedProspectFormController);

    grcContactedProspectFormController.$inject = ['$scope', 'ContactService', 'GenderService', 'FirmService', 'MessageBoxService', 'UserService'];

    function grcContactedProspectFormController($scope, ContactService, GenderService, FirmService, MessageBoxService, UserService) {

        $scope.contactedProspect = {};
        $scope.genderService = GenderService;
        $scope.firmService = FirmService;
        $scope.userService = UserService;

        $scope.resetForm = function () {
            $scope.contactedProspect = {};
            $scope.contactedProspectForm.$setPristine();
            $scope.editMode = false;
        };

        $scope.addContactedProspect = function () {
            ContactService.postContactedProspect($scope.contactedProspect)
                .success(
                    function (data) {
                        $('#contacted_prospect_form_modal').modal('hide');
                        $scope.resetForm();
                        MessageBoxService.showSuccess(
                            "Opération réussie !",
                            "Le prospect a été ajouté."
                        );
                    }
                )
                .error(
                    function (data) {
                        $('#contacted_prospect_form_modal').modal('hide');
                        MessageBoxService.showError(
                            "Echec de l'ajout...",
                            "Le prospect n'a pas pu être ajouté."
                        );
                    }
                )
        };

        GenderService.getAllGenders(true);
        FirmService.getAllFirms(true);
        UserService.getAllUsers(true);
    }

})();
