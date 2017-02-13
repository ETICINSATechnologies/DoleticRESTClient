(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcClientFormController', grcClientFormController);

    grcClientFormController.$inject = ['$scope', 'ContactService', 'GenderService', 'FirmService', 'MessageBoxService'];

    function grcClientFormController($scope, ContactService, GenderService, FirmService, MessageBoxService) {

        $scope.client = {};
        $scope.genderService = GenderService;
        $scope.firmService = FirmService;

        $scope.addClient = function () {
            ContactService.postClient($scope.client)
                .success(
                    function (data) {
                        MessageBoxService.showSuccess("Opération réussie !", "Le client a été ajouté.");
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
