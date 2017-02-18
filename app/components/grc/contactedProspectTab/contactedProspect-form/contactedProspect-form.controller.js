(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcContactedProspectFormController', grcContactedProspectFormController);

    grcContactedProspectFormController.$inject = ['$scope', '$filter', 'ContactService', 'GenderService', 'FirmService', 'MessageBoxService', 'UserService', 'editMode', 'contactedProspect'];

    function grcContactedProspectFormController($scope, $filter, ContactService, GenderService, FirmService, MessageBoxService, UserService, editMode, contactedProspect) {

        if (contactedProspect != {}) formatContactedProspect();
        $scope.contactedProspect = contactedProspect;
        $scope.editMode = editMode ? editMode : false;
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

        $scope.editContactedProspect = function () {
            var name = $scope.contactedProspect.fullName;
            ContactService.putContactedProspect($scope.contactedProspect)
                .success(function (data) {
                    $('#contacted_prospect_form_modal').modal('hide');
                    $scope.resetForm();
                    MessageBoxService.showSuccess(
                        "Opération réussie !",
                        "Le prospect " + name + " a été modifié !"
                    );
                }).error(function (data) {
                    $('#contacted_prospect_form_modal').modal('hide');
                    MessageBoxService.showError(
                        "Echec de la modification...",
                        "Le prospect n'a pas pu être modifié.");
                }
            );
        };

        function formatContactedProspect() {
            if (contactedProspect.gender) contactedProspect.gender = contactedProspect.gender.id;
            if (contactedProspect.prospector) contactedProspect.prospector = contactedProspect.prospector.id;
            if (contactedProspect.firm) contactedProspect.firm = contactedProspect.firm.id;
            if (contactedProspect.type) contactedProspect.type = contactedProspect.type.id;
            if (contactedProspect.nextProspecting) contactedProspect.nextProspecting = $filter('date')(contactedProspect.nextProspecting, "dd/MM/y");
        }

        GenderService.getAllGenders(true);
        FirmService.getAllFirms(true);
        UserService.getAllUsers(true);
    }

})();
