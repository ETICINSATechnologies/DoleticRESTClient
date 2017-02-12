(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcFirmFormController', grcFirmFormController);

    grcFirmFormController.$inject = ['$scope', 'FirmService', 'FirmTypeService', 'CountryService', 'MessageBoxService'];

    function grcFirmFormController($scope, FirmService, FirmTypeService, CountryService, MessageBoxService) {

        $scope.firm = {};
        $scope.editMode = false;
        $scope.firmTypeService = FirmTypeService;
        $scope.countryService = CountryService;

        $scope.resetForm = function() {
            $scope.firm = {};
            $scope.firmForm.$setPristine();
            $scope.editMode = false;
        };

        $scope.addFirm = function () {
            FirmService.postFirm($scope.firm)
                .success(function (data) {
                    $('#firm_form_modal').modal('hide');
                    $scope.resetForm();
                    MessageBoxService.showSuccess(
                        "Opération réussie !",
                        "La société a été ajoutée."
                    );
                }).error(function (data) {
                    $('#firm_form_modal').modal('hide');
                    MessageBoxService.showError(
                        "Echec de l'ajout...",
                        "La société n'a pas pu être ajoutée. Vérifiez que le nom n'est pas déjà utilisé.");
                }
            );
        };

        $scope.editFirm = function () {
            FirmService.putFirm($scope.firm)
                .success(function (data) {
                    $('#firm_form_modal').modal('hide');
                    $scope.resetForm();
                    MessageBoxService.showSuccess(
                        "Opération réussie !",
                        "La société " + $scope.firm.name + " a été modifiée !"
                    );
                }).error(function (data) {
                    $('#firm_form_modal').modal('hide');
                    MessageBoxService.showError(
                        "Echec de la modification...",
                        "La société n'a pas pu être modifiée. Vérifiez que le nom n'est pas déjà utilisé.");
                }
            );
        };

        FirmTypeService.getAllFirmTypes(true);
        CountryService.getAllCountries(true);
    }

})();
