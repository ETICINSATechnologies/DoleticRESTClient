(function () {
    'use strict';

    angular
        .module('doleticApp')
        .component('confirmModalComponent', ConfirmModalComponent());

    function ConfirmModalComponent() {
        return {
            bindings: {},
            controller: "ConfirmModalController",
            templateUrl: "app/components/confirm-modal/confirm-modal.template.html"
        }
    }
})();