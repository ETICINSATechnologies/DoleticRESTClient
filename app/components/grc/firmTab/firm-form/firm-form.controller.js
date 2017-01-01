(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcFirmFormController', grcFirmFormController);

    grcFirmFormController.$inject = ['$scope', 'FirmService', 'FirmTypeService', 'CountryService', 'MessageBoxService'];

    function grcFirmFormController($scope, FirmService, FirmTypeService, CountryService, MessageBoxService) {

        $scope.firm = {};
        $scope.firmTypes = [];
        $scope.countries = [];

        $scope.setCountry = function (country) {
            $scope.firm.country = country;
        };

        $scope.setType = function (type) {
            $scope.firm.type = type;
        };

        $scope.addFirm = function () {
            FirmService.postFirm($scope.firm)
                .success(
                    function (data) {
                        MessageBoxService.showSuccess("Opération réussie !", "La société a été ajoutée.");
                    }
                )
                .error(
                    function (data) {
                        console.log(data);
                    }
                )
        };

        function getAllFirmTypes() {
            FirmTypeService.getAllFirmTypes()
                .success(
                    function (data) {
                        $scope.firmTypes = data.firm_types;
                        $('#firm_type_dropdown').dropdown();
                    }
                ).error(
                function (data) {
                    console.log(data);
                }
            );
        }

        function getAllCountries() {
            CountryService.getAllCountries()
                .success(
                    function (data) {
                        $scope.countries = data.countries;
                        $('#firm_country_dropdown').dropdown();
                    }
                ).error(
                function (data) {
                    console.log(data);
                }
            );
        }

        getAllFirmTypes();
        getAllCountries();
    }

})();
