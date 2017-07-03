(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('stdDocTabController', stdDocTabController);

    stdDocTabController.$inject = ['$scope', 'UserService', 'KernelService', 'ModalService'];

    function stdDocTabController($scope, UserService, KernelService, ModalService) {
        $scope.userService = UserService;
        $scope.kernelService = KernelService;

        $scope.showUserForm = function() {
            ModalService.showModal({
                templateUrl: "app/components/stdDoc/membersTab/doc-form/doc-form.template.html",
                controller: "stdDocUserFormController",
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