(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrOldDocTabController', hrOldDocTabController);

    hrOldDocTabController.$inject = ['$scope', 'DocService', 'KernelService'];

    function hrOldDocTabController($scope, DocService, KernelService) {
        $scope.docService = DocService;
        $scope.kernelService = KernelService;

        KernelService.getDocRights(true);
    }
})();