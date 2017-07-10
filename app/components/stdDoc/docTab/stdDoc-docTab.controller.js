(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('stdDocDocTabController', stdDocDocTabController);

    stdDocDocTabController.$inject = ['$scope', 'UserService', 'KernelService', 'ModalService'];

    function stdDocDocTabController($scope, UserService, KernelService, ModalService) {
        $scope.userService = UserService;
        $scope.kernelService = KernelService;

        $scope.showUserForm = function() {
            ModalService.showModal({
                templateUrl: "app/components/stdDoc/docTab/doc-form/doc-form.template.html",
                controller: "stdDocDocFormController",
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