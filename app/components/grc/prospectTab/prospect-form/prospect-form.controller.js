(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcProspectFormController', grcProspectFormController);

    grcProspectFormController.$inject = ['$scope', 'ContactService', 'GenderService', 'FirmService', 'MessageBoxService', 'UserService'];

    function grcProspectFormController($scope, ContactService, GenderService, FirmService, MessageBoxService, UserService) {

        $scope.prospect = {};
        $scope.genderService = GenderService;
        $scope.firmService = FirmService;
        $scope.userService = UserService;

        $scope.resetForm = function () {
            $scope.prospect = {};
            $scope.prospectForm.$setPristine();
            $scope.editMode = false;
        };

        $scope.addProspect = function () {
            ContactService.postProspect($scope.prospect)
                .success(
                    function (data) {
                        $('#prospect_form_modal').modal('hide');
                        $scope.resetForm();
                        MessageBoxService.showSuccess(
                            "Opération réussie !",
                            "Le prospect a été ajouté."
                        );
                    }
                )
                .error(
                    function (data) {
                        $('#prospect_form_modal').modal('hide');
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
