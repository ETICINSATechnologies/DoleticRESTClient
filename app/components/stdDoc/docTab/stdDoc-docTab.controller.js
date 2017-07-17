(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('stdDocDocTabController', stdDocDocTabController);

    stdDocDocTabController.$inject = ['$scope', 'KernelService', 'ModalService', 'DocumentTemplateService'];

    function stdDocDocTabController($scope, KernelService, ModalService, DocumentTemplateService) {
        $scope.kernelService = KernelService;
        $scope.documentTemplateService = DocumentTemplateService;

        $scope.showDocForm = function() {
            ModalService.showModal({
                templateUrl: "app/components/stdDoc/docTab/doc-form/doc-form.template.html",
                controller: "stdDocFormController",
                inputs: {
                    editMode: false,
                    user: {}
                }
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };
    }
})();