(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcContactedProspectTabController', grcContactedProspectTabController);

    grcContactedProspectTabController.$inject = ['$scope', 'ContactService', 'ModalService'];

    function grcContactedProspectTabController($scope, ContactService, ModalService) {
        $scope.contactService = ContactService;

        $scope.showContactedProspectForm = function () {
            ModalService.showModal({
                templateUrl: "app/components/grc/contactedProspectTab/contactedProspect-form/contactedProspect-form.template.html",
                controller: "grcContactedProspectFormController"
            }).then(function (modal) {
                console.log(modal);
                $('#contacted_prospect_form_modal').modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };
    }
})();