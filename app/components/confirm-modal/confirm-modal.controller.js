(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('ConfirmModalController', ConfirmModalController);

    ConfirmModalController.$inject = ['$scope', 'ConfirmModalService'];

    function ConfirmModalController($scope, ConfirmModalService) {
        $scope.confirmModalService = ConfirmModalService;

        $scope.hideConfirmModal = hideConfirmModal;
        $scope.confirm = confirm;

        function hideConfirmModal() {
            $('#confirm_modal').modal('hide');
        }

        function confirm() {
            ConfirmModalService.callback();
            hideConfirmModal();
        }
    }
})();