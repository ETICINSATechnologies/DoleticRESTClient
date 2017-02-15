(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcOldClientTabController', grcOldClientTabController);

    grcOldClientTabController.$inject = ['$scope', 'ContactService', 'ModalService'];

    function grcOldClientTabController($scope, ContactService, ModalService) {
        $scope.contactService = ContactService;

        $scope.showOldClientForm = function () {
            ModalService.showModal({
                templateUrl: "app/components/grc/oldClientTab/oldClient-form/oldClient-form.template.html",
                controller: "grcOldClientFormController"
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };
    }
})();