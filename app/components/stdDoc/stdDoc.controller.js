(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('stdDocController', stdDocController);

    stdDocController.$inject = ['$scope', '$state', 'RHService', 'KernelService', 'DocumentTemplateService'];

    function stdDocController($scope, $state, RHService, KernelService, DocumentTemplateService) {
        $scope.$state = $state;
        $scope.rhService = RHService;
        $scope.kernelService = KernelService;
        $scope.documentTemplateService = DocumentTemplateService;

        RHService.getUserRights(true);
        KernelService.getUserRights(true);
    }
})();