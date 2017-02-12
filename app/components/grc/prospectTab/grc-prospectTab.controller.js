(function () {
    'use strict';

    angular
        .module('doleticApp')
        .controller('grcProspectTabController', grcProspectTabController);

    grcProspectTabController.$inject = ['$scope', 'ContactService', 'ModalService'];

    function grcProspectTabController($scope, ContactService, ModalService) {
        $scope.contactService = ContactService;

        $scope.showProspectForm = function () {
            ModalService.showModal({
                templateUrl: "app/components/grc/prospectTab/prospect-form/prospect-form.template.html",
                controller: "grcProspectFormController"
            }).then(function (modal) {
                console.log(modal);
                $('#prospect_form_modal').modal('show');
            }).catch(function (error) {
                // error contains a detailed error message.
                console.log(error);
            });
        };
    }
})();