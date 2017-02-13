(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcOldClientFormController', grcOldClientFormController);

    grcOldClientFormController.$inject = ['$scope', 'ContactService', 'GenderService', 'FirmService', 'MessageBoxService'];

    function grcOldClientFormController($scope, ContactService, GenderService, FirmService, MessageBoxService) {

        $scope.oldClient = {};
        $scope.genderService = GenderService;
        $scope.firmService = FirmService;

        $scope.addOldClient = function () {
            ContactService.postOldClient($scope.oldClient)
                .success(
                    function (data) {
                        MessageBoxService.showSuccess("Opération réussie !", "L'ancien client a été ajouté.");
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
