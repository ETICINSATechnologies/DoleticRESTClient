(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcProspectFormController', grcProspectFormController);

    grcProspectFormController.$inject = ['$scope', '$filter', 'ContactService', 'GenderService', 'FirmService', 'MessageBoxService', 'UserService', 'editMode', 'prospect'];

    function grcProspectFormController($scope, $filter, ContactService, GenderService, FirmService, MessageBoxService, UserService, editMode, prospect) {

        if (prospect != {}) formatProspect();
        $scope.prospect = prospect;
        $scope.editMode = editMode ? editMode : false;
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

        $scope.editProspect = function () {
            var name = $scope.prospect.fullName;
            ContactService.putProspect($scope.prospect)
                .success(function (data) {
                    $('#prospect_form_modal').modal('hide');
                    $scope.resetForm();
                    MessageBoxService.showSuccess(
                        "Opération réussie !",
                        "Le prospect " + name + " a été modifié !"
                    );
                }).error(function (data) {
                    $('#prospect_form_modal').modal('hide');
                    MessageBoxService.showError(
                        "Echec de la modification...",
                        "Le prospect n'a pas pu être modifié.");
                }
            );
        };

        function formatProspect() {
            if (prospect.gender) prospect.gender = prospect.gender.id;
            if (prospect.prospector) prospect.prospector = prospect.prospector.id;
            if (prospect.firm) prospect.firm = prospect.firm.id;
            if (prospect.type) prospect.type = prospect.type.id;
            if (prospect.nextProspecting) prospect.nextProspecting = $filter('date')(prospect.nextProspecting, "dd/MM/y");
        }

        GenderService.getAllGenders(true);
        FirmService.getAllFirms(true);
        UserService.getAllUsers(true);
    }

})();
