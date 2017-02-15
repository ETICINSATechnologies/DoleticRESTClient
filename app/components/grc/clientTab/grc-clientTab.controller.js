(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcClientTabController', grcClientTabController);

    grcClientTabController.$inject = ['$scope', 'ContactService', 'ModalService'];

    function grcClientTabController($scope, ContactService, ModalService) {
        $scope.contactService = ContactService;

        $scope.showClientForm = function () {
            ModalService.showModal({
                templateUrl: "app/components/grc/clientTab/client-form/client-form.template.html",
                controller: "grcClientFormController"
            }).then(function (modal) {
                modal.element.modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };
    }
})();