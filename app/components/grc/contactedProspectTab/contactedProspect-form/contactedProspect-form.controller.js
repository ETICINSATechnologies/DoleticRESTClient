(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcContactedProspectFormController', grcContactedProspectFormController);

    grcContactedProspectFormController.$inject = ['$scope', 'ContactService', 'GenderService', 'FirmService', 'MessageBoxService'];

    function grcContactedProspectFormController($scope, ContactService, GenderService, FirmService, MessageBoxService) {

        $scope.contactedProspect = {};
        $scope.genderService = GenderService;
        $scope.firmService = FirmService;

        $scope.addContactedContactedProspect = function () {
            ContactService.postContactedProspect($scope.contactedProspect)
                .success(
                    function (data) {
                        MessageBoxService.showSuccess("Opération réussie !", "Le prospect a été ajouté.");
                    }
                )
                .error(
                    function (data) {
                        console.log(data);
                    }
                )
        };

        GenderService.getAllGenders(true);
        FirmService.getAllFirms(true);
    }

})();
