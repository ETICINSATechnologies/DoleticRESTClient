(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcProspectFormController', grcProspectFormController);

    grcProspectFormController.$inject = ['$scope', 'ContactService', 'GenderService', 'FirmService', 'MessageBoxService'];

    function grcProspectFormController($scope, ContactService, GenderService, FirmService, MessageBoxService) {

        $scope.prospect = {};
        $scope.genderService = GenderService;
        $scope.firmService = FirmService;

        $scope.addProspect = function () {
            ContactService.postProspect($scope.prospect)
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
