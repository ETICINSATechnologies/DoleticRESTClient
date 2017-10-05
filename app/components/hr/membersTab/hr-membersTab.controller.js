(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('hrMembersTabController', hrMembersTabController);

    hrMembersTabController.$inject = ['$scope', 'UserService', 'KernelService', 'ModalService'];

    function hrMembersTabController($scope, UserService, KernelService, ModalService) {
        $scope.userService = UserService;
        $scope.kernelService = KernelService;

        $scope.showUserForm = function() {
            ModalService.showModal({
                templateUrl: "app/components/hr/membersTab/user-form/user-form.template.html",
                controller: "hrUserFormController",
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